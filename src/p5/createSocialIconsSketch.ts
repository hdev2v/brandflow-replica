
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { initializeIcons, createIconsAtPosition } from './helpers/iconCreation';
import { updateIconAnimation, cleanupIcons, checkCollisions } from './helpers/iconAnimation';
import { renderIcon } from './helpers/iconRendering';
import { preloadImages } from './helpers/imageLoader';
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
    let icons: SocialIcon[] = [];
    let logoImages: Record<string, p5.Image> = {};
    let loadedImages: Record<string, boolean> = {};
    let previousMouseClicked = false;
    
    // Preload images with error handling
    p.preload = () => {
      const imageResult = preloadImages(p, onLoadingChange);
      logoImages = imageResult.logoImages;
      loadedImages = imageResult.loadedImages;
    };
    
    p.setup = () => {
      // Create canvas
      const canvas = p.createCanvas(
        containerRef.current!.offsetWidth, 
        containerRef.current!.offsetHeight
      );
      canvas.style('position', 'absolute');
      canvas.style('z-index', '1');
      
      // Initialize icons
      icons = initializeIcons(p, p.width, p.height);
      
      // Store icons in ref for external access
      setIconsRef(icons);
      console.log("P5 sketch setup completed with", icons.length, "icons");
    };
    
    p.draw = () => {
      p.clear();
      
      // Handle mouse clicks - create new icons
      const currentMouseClicked = getMouseClicked();
      
      if (currentMouseClicked && !previousMouseClicked) {
        const clickPos = getClickPos();
        
        console.log("P5 sketch detected click at:", clickPos);
        
        // Only create icons if the click was within the canvas bounds
        if (clickPos.x >= 0 && clickPos.x <= p.width && 
            clickPos.y >= 0 && clickPos.y <= p.height) {
          
          console.log("Creating new icons at position", clickPos);
          
          // Create burst of icons at click position
          const burstCount = SKETCH_CONFIG.CLICK_BURST_COUNT;
          for (let i = 0; i < burstCount; i++) {
            const newIcon = createIcon(p, clickPos.x, clickPos.y, false);
            icons.push(newIcon);
          }
        }
        
        // Reset mouse clicked state
        resetMouseClick();
      }
      
      previousMouseClicked = currentMouseClicked;
      
      // Check for collisions between icons
      checkCollisions(p, icons);
      
      // Update and render each icon
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        
        // Update icon animation (position, rotation, etc.)
        updateIconAnimation(p, icon);
        
        // Render the icon
        renderIcon(p, icon, logoImages, loadedImages);
      }
      
      // Clean up icons that have gone offscreen
      icons = cleanupIcons(p, icons);
      
      // Update the external reference to icons
      setIconsRef(icons);
    };
    
    p.windowResized = () => {
      if (containerRef.current) {
        p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      }
    };
    
    // Helper function to create a single icon - included here for direct access
    function createIcon(
      p: p5, 
      x: number, 
      y: number, 
      randomizeVelocity: boolean = false
    ): SocialIcon {
      const platforms = [
        { platform: 'facebook', name: 'Facebook', color: '#1877F2' },
        { platform: 'instagram', name: 'Instagram', color: '#E4405F' },
        { platform: 'youtube', name: 'YouTube', color: '#FF0000' },
        { platform: 'tiktok', name: 'TikTok', color: '#000000' },
        { platform: 'x', name: 'X', color: '#000000' },
        { platform: 'snapchat', name: 'Snapchat', color: '#FFFC00' },
        { platform: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
        { platform: 'meta', name: 'Meta', color: '#0668E1' },
        { platform: 'messenger', name: 'Messenger', color: '#00B2FF' }
      ];
      
      const platform = platforms[Math.floor(p.random(0, platforms.length))];
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
        // For icons created by clicks, make them explode outward with more energy
        const angle = p.random(0, p.TWO_PI);
        const speed = SKETCH_CONFIG.CLICK_BURST_SPEED; // Use the configured burst speed
        vx = p.cos(angle) * speed;
        vy = p.sin(angle) * speed;
      }
      
      return {
        x,
        y,
        size,
        speedX: 0, // Legacy field, kept for compatibility
        speedY: 0, // Legacy field, kept for compatibility
        opacity: p.random(70, 95),
        color: platform.color,
        platform: platform.platform,
        isTargeting: false,
        vx,
        vy,
        rotation: p.random(0, p.TWO_PI),
        rotationSpeed: p.random(-0.05, 0.05),
        scale: 0.1, // Start small for popup animation
        targetScale: 1.0, // Target normal size
        popAnimationActive: true // Flag to indicate this icon is animating in
      };
    }
  };
};
