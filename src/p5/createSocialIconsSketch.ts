
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
      
      let vx, vy;
      
      if (randomizeVelocity) {
        // Random initial velocity for autonomous movement
        const angle = p.random(0, p.TWO_PI);
        const speed = p.random(SKETCH_CONFIG.MIN_VELOCITY, SKETCH_CONFIG.MAX_VELOCITY) * speedMultiplier;
        vx = p.cos(angle) * speed;
        vy = p.sin(angle) * speed;
      } else {
        // For icons created by clicks, make them explode outward
        const angle = p.random(0, p.TWO_PI);
        const speed = p.random(2, 4);
        vx = p.cos(angle) * speed;
        vy = p.sin(angle) * speed;
      }
      
      const newIcon: SocialIcon = {
        x,
        y,
        size,
        speedX: 0, // No longer used
        speedY: 0, // No longer used
        opacity: p.random(70, 95),
        color: platform.color,
        platform: platform.platform,
        isTargeting: false,
        vx,
        vy,
        rotation: p.random(0, p.TWO_PI),
        rotationSpeed: p.random(-0.05, 0.05)
      };
      
      icons.push(newIcon);
      return newIcon;
    };
    
    p.draw = () => {
      p.clear();
      
      // Handle mouse clicks - create new icons
      if (getMouseClicked()) {
        const clickPos = getClickPos();
        
        // Only create icons if the click was within the canvas bounds
        if (clickPos.x >= 0 && clickPos.x <= p.width && 
            clickPos.y >= 0 && clickPos.y <= p.height) {
          // Create 3-5 new icons at click position
          const randomCount = Math.floor(p.random(3, 6));
          for (let i = 0; i < randomCount; i++) {
            addIcon(clickPos.x, clickPos.y, false);
          }
        }
        
        // Reset mouse clicked state
        resetMouseClick();
      }
      
      // Update and display icons
      for (let i = icons.length - 1; i >= 0; i--) {
        const icon = icons[i];
        
        // Occasionally change direction randomly for more natural movement
        if (p.random() < SKETCH_CONFIG.DIRECTION_CHANGE_CHANCE) {
          const angle = p.random(0, p.TWO_PI);
          const speed = p.map(icon.size, SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE, 
                              SKETCH_CONFIG.MAX_VELOCITY, SKETCH_CONFIG.MIN_VELOCITY);
          
          icon.vx += p.cos(angle) * 0.1;
          icon.vy += p.sin(angle) * 0.1;
        }
        
        // Apply friction to gradually slow down
        icon.vx *= SKETCH_CONFIG.FRICTION;
        icon.vy *= SKETCH_CONFIG.FRICTION;
        
        // Ensure minimum speed so icons don't stop
        const currentSpeed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
        if (currentSpeed < SKETCH_CONFIG.MIN_VELOCITY) {
          const angle = Math.atan2(icon.vy, icon.vx);
          icon.vx = Math.cos(angle) * SKETCH_CONFIG.MIN_VELOCITY;
          icon.vy = Math.sin(angle) * SKETCH_CONFIG.MIN_VELOCITY;
        }
        
        // Limit max speed
        const maxSpeed = SKETCH_CONFIG.MAX_SPEED;
        icon.vx = p.constrain(icon.vx, -maxSpeed, maxSpeed);
        icon.vy = p.constrain(icon.vy, -maxSpeed, maxSpeed);
        
        // Update position
        icon.x += icon.vx;
        icon.y += icon.vy;
        
        // Bounce off edges with slight randomization for more organic movement
        if (icon.x < 0 || icon.x > p.width) {
          icon.vx *= -1;
          icon.vx += p.random(-0.1, 0.1); // Add slight randomness
        }
        if (icon.y < 0 || icon.y > p.height) {
          icon.vy *= -1;
          icon.vy += p.random(-0.1, 0.1); // Add slight randomness
        }
        
        // Update rotation
        if (icon.rotation !== undefined && icon.rotationSpeed !== undefined) {
          icon.rotation += icon.rotationSpeed;
        }
        
        // Draw the icon
        const imageLoaded = logoImages[icon.platform] && loadedImages[icon.platform];
  
        if (imageLoaded) {
          // Draw the actual logo image
          p.push();
          p.imageMode(p.CENTER);
          if (icon.rotation !== undefined) {
            p.translate(icon.x, icon.y);
            p.rotate(icon.rotation);
            p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
            p.image(logoImages[icon.platform], 0, 0, icon.size, icon.size);
          } else {
            p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
            p.image(logoImages[icon.platform], icon.x, icon.y, icon.size, icon.size);
          }
          p.pop();
        } else {
          // Fallback to circle with first letter if image not loaded
          const rgb = {
            r: parseInt(icon.color.slice(1, 3), 16),
            g: parseInt(icon.color.slice(3, 5), 16),
            b: parseInt(icon.color.slice(5, 7), 16)
          };
          
          p.push();
          if (icon.rotation !== undefined) {
            p.translate(icon.x, icon.y);
            p.rotate(icon.rotation);
            p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
            p.circle(0, 0, icon.size);
            p.fill(255, 255, 255, icon.opacity + 10);
            p.textSize(icon.size * 0.45);
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.text(icon.platform.charAt(0).toUpperCase(), 0, 0);
          } else {
            p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
            p.circle(icon.x, icon.y, icon.size);
            p.fill(255, 255, 255, icon.opacity + 10);
            p.textSize(icon.size * 0.45);
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
          }
          p.pop();
        }
        
        // Remove icons if they go too far outside the canvas (cleanup)
        const padding = 100;
        if (icon.x < -padding || icon.x > p.width + padding || 
            icon.y < -padding || icon.y > p.height + padding) {
          // Remove old icons once we have too many
          if (icons.length > SKETCH_CONFIG.NUM_ICONS * 2) {
            icons.splice(i, 1);
          }
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
