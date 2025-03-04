
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from './socialIconsSketchConfig';

interface SketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onLoadingChange: (loading: boolean) => void;
  getMouseClicked: () => boolean;
  getClickPos: () => { x: number, y: number };
  resetMouseClick: () => void;
  setIconsRef: (icons: SocialIcon[]) => void;
}

export const createSocialIconsSketch = ({
  containerRef,
  onLoadingChange,
  getMouseClicked,
  getClickPos,
  resetMouseClick,
  setIconsRef
}: SketchProps) => {
  return (p: p5) => {
    const icons: SocialIcon[] = [];
    const logoImages: Record<string, p5.Image> = {};
    const loadedImages: Record<string, boolean> = {};
    let prevMouseClicked = false;
    
    // Preload images with error handling
    p.preload = () => {
      socialPlatforms.forEach(platform => {
        try {
          logoImages[platform.platform] = p.loadImage(
            `/social-icons/${platform.platform}.png`, 
            // Success callback
            () => {
              loadedImages[platform.platform] = true;
              console.log(`Loaded ${platform.platform} image`);
              // Check if all images are loaded
              if (Object.keys(loadedImages).length === socialPlatforms.length) {
                onLoadingChange(false);
              }
            },
            // Error callback
            () => {
              console.log(`Failed to load ${platform.platform} image, using fallback`);
              loadedImages[platform.platform] = false;
              // Even if image fails, we still want to continue
              if (Object.keys(loadedImages).length === socialPlatforms.length) {
                onLoadingChange(false);
              }
            }
          );
        } catch (error) {
          console.error(`Error loading ${platform.platform}:`, error);
          loadedImages[platform.platform] = false;
        }
      });
    };
    
    p.setup = () => {
      // Create canvas
      const canvas = p.createCanvas(
        containerRef.current!.offsetWidth, 
        containerRef.current!.offsetHeight
      );
      canvas.style('position', 'absolute');
      canvas.style('z-index', '1');
      
      // Initialize icons with initial count
      for (let i = 0; i < SKETCH_CONFIG.NUM_ICONS; i++) {
        addIcon(p.random(p.width), p.random(p.height), true);
      }
      
      // Store icons in ref for external access
      setIconsRef(icons);
    };
    
    // Function to add a new icon
    const addIcon = (x: number, y: number, randomizeVelocity: boolean = false) => {
      const platform = socialPlatforms[Math.floor(p.random(0, socialPlatforms.length))];
      const size = p.random(SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE);
      const speedMultiplier = p.map(size, SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE, 1.5, 0.5);
      
      let vx = p.random(-1, 1) * speedMultiplier;
      let vy = p.random(-1, 1) * speedMultiplier;
      
      // For icons created by clicks, make them explode outward
      if (!randomizeVelocity) {
        const angle = p.random(0, p.TWO_PI);
        const speed = p.random(2, 4);
        vx = p.cos(angle) * speed;
        vy = p.sin(angle) * speed;
      }
      
      const newIcon: SocialIcon = {
        x,
        y,
        size,
        speedX: vx,
        speedY: vy,
        vx,
        vy,
        opacity: p.random(70, 95),
        color: platform.color,
        platform: platform.platform,
        isTargeting: false,
        rotation: p.random(0, p.TWO_PI),
        rotationSpeed: p.random(-0.05, 0.05)
      };
      
      icons.push(newIcon);
      return newIcon;
    };
    
    p.draw = () => {
      p.clear();
      
      // Get mouse click state
      const mouseClicked = getMouseClicked();
      const clickPos = getClickPos();
      
      // Handle mouse clicks - create new icons
      if (mouseClicked && !prevMouseClicked) {
        prevMouseClicked = true;
        
        const canvasRect = containerRef.current?.getBoundingClientRect();
        if (!canvasRect) return;
        
        const canvasClickX = clickPos.x - canvasRect.left;
        const canvasClickY = clickPos.y - canvasRect.top;
        
        // Only create icons if the click was within the canvas bounds
        if (canvasClickX >= 0 && canvasClickX <= p.width && 
            canvasClickY >= 0 && canvasClickY <= p.height) {
          
          console.log('Creating new icons at', canvasClickX, canvasClickY);
          
          // Create new icons at click position
          for (let i = 0; i < SKETCH_CONFIG.CLICK_SPAWN_COUNT; i++) {
            addIcon(canvasClickX, canvasClickY, false);
          }
        }
        
        // Reset mouse clicked state
        resetMouseClick();
      } else if (!mouseClicked && prevMouseClicked) {
        prevMouseClicked = false;
      }
      
      // Update and display icons
      for (let i = icons.length - 1; i >= 0; i--) {
        const icon = icons[i];
        
        // Apply autonomous movement if enabled
        if (SKETCH_CONFIG.AUTONOMOUS_MOVEMENT) {
          // Randomly change direction occasionally
          if (p.random() < SKETCH_CONFIG.CHANGE_DIRECTION_CHANCE) {
            const angle = p.random(0, p.TWO_PI);
            const force = p.random(0.05, 0.2);
            icon.vx += p.cos(angle) * force;
            icon.vy += p.sin(angle) * force;
          }
        }
        
        // Update velocity with friction
        icon.vx *= SKETCH_CONFIG.FRICTION;
        icon.vy *= SKETCH_CONFIG.FRICTION;
        
        // Limit max speed
        const speed = p.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
        if (speed > SKETCH_CONFIG.MAX_SPEED) {
          icon.vx = (icon.vx / speed) * SKETCH_CONFIG.MAX_SPEED;
          icon.vy = (icon.vy / speed) * SKETCH_CONFIG.MAX_SPEED;
        }
        
        // Add a small amount of velocity if icon is moving too slow
        if (speed < 0.2) {
          const angle = p.random(0, p.TWO_PI);
          icon.vx += p.cos(angle) * 0.1;
          icon.vy += p.sin(angle) * 0.1;
        }
        
        // Update position
        icon.x += icon.vx;
        icon.y += icon.vy;
        
        // Update rotation
        if (icon.rotation !== undefined && icon.rotationSpeed !== undefined) {
          icon.rotation += icon.rotationSpeed;
        }
        
        // Bounce off edges with slight randomization for more organic movement
        if (icon.x < 0 || icon.x > p.width) {
          icon.vx *= -1;
          icon.vx += p.random(-0.2, 0.2); // Add slight randomness
          icon.x = p.constrain(icon.x, 0, p.width);
        }
        if (icon.y < 0 || icon.y > p.height) {
          icon.vy *= -1;
          icon.vy += p.random(-0.2, 0.2); // Add slight randomness
          icon.y = p.constrain(icon.y, 0, p.height);
        }
        
        // Draw the icon
        const imageLoaded = logoImages[icon.platform] && loadedImages[icon.platform];
  
        if (imageLoaded) {
          // Draw the actual logo image with rotation
          p.push();
          p.translate(icon.x, icon.y);
          if (icon.rotation !== undefined) {
            p.rotate(icon.rotation);
          }
          p.imageMode(p.CENTER);
          p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
          p.image(logoImages[icon.platform], 0, 0, icon.size, icon.size);
          p.pop();
        } else {
          // Fallback to circle with first letter if image not loaded
          const rgb = {
            r: parseInt(icon.color.slice(1, 3), 16),
            g: parseInt(icon.color.slice(3, 5), 16),
            b: parseInt(icon.color.slice(5, 7), 16)
          };
          
          p.fill(rgb.r, rgb.g, rgb.b, icon.opacity * 2.55);
          p.circle(icon.x, icon.y, icon.size);
          
          p.fill(255, 255, 255, icon.opacity * 2.55 + 25);
          p.textSize(icon.size * 0.45);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
        }
        
        // Remove icons if we have too many
        if (icons.length > SKETCH_CONFIG.NUM_ICONS * 3) {
          // Remove the oldest icons first
          icons.shift();
        }
      }
    };
    
    p.windowResized = () => {
      if (containerRef.current) {
        p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      }
    };
  };
};
