
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from './socialIconsSketchConfig';

interface ServiceCardRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
  onLoadingChange: (loading: boolean) => void;
  getMousePos: () => { x: number, y: number };
  getMouseClicked: () => boolean;
  getClickPos: () => { x: number, y: number };
  resetMouseClick: () => void;
  setIconsRef: (icons: SocialIcon[]) => void;
}

export const createSocialIconsSketch = ({
  containerRef,
  onLoadingChange,
  getMousePos,
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
        speedX: vx * 0.1,
        speedY: vy * 0.1,
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
      
      // Get current state from props
      const mousePos = getMousePos();
      const mouseClicked = getMouseClicked();
      const clickPos = getClickPos();
      
      // Get mouse position relative to canvas
      const mouseX = mousePos.x - containerRef.current!.getBoundingClientRect().left;
      const mouseY = mousePos.y - containerRef.current!.getBoundingClientRect().top;
      
      // Handle mouse clicks - create new icons
      if (mouseClicked) {
        const canvasClickX = clickPos.x - containerRef.current!.getBoundingClientRect().left;
        const canvasClickY = clickPos.y - containerRef.current!.getBoundingClientRect().top;
        
        // Only create icons if the click was within the canvas bounds
        if (canvasClickX >= 0 && canvasClickX <= p.width && 
            canvasClickY >= 0 && canvasClickY <= p.height) {
          // Create 3-5 new icons at click position
          const randomCount = Math.floor(p.random(3, 6));
          for (let i = 0; i < randomCount; i++) {
            addIcon(canvasClickX, canvasClickY, false);
          }
        }
        
        // Reset mouse clicked state
        resetMouseClick();
      }
      
      // Update and display icons
      for (let i = icons.length - 1; i >= 0; i--) {
        const icon = icons[i];
        
        // Apply mouse repulsion
        const mouseRepelDistance = 120;
        const repelForce = 2;
        
        // Calculate distance between icon and mouse
        const d = p.dist(icon.x, icon.y, mouseX, mouseY);
        
        // Apply repulsion if mouse is close enough
        if (d < mouseRepelDistance) {
          const angle = p.atan2(icon.y - mouseY, icon.x - mouseX);
          const force = p.map(d, 0, mouseRepelDistance, repelForce, 0);
          icon.vx += p.cos(angle) * force;
          icon.vy += p.sin(angle) * force;
        }
        
        // Update position
        // Apply friction to gradually slow down
        icon.vx *= SKETCH_CONFIG.FRICTION;
        icon.vy *= SKETCH_CONFIG.FRICTION;
        
        // Limit max speed
        icon.vx = p.constrain(icon.vx, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
        icon.vy = p.constrain(icon.vy, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
        
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
        
        // Draw the icon
        const imageLoaded = logoImages[icon.platform] && loadedImages[icon.platform];
  
        if (imageLoaded) {
          // Draw the actual logo image
          p.push();
          p.imageMode(p.CENTER);
          p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
          p.image(logoImages[icon.platform], icon.x, icon.y, icon.size, icon.size);
          p.pop();
        } else {
          // Fallback to circle with first letter if image not loaded
          const rgb = {
            r: parseInt(icon.color.slice(1, 3), 16),
            g: parseInt(icon.color.slice(3, 5), 16),
            b: parseInt(icon.color.slice(5, 7), 16)
          };
          
          p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
          p.circle(icon.x, icon.y, icon.size);
          
          p.fill(255, 255, 255, icon.opacity + 10);
          p.textSize(icon.size * 0.45);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
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
