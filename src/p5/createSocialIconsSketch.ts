
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { initializeIcons, createIconsAtPosition } from './helpers/iconCreation';
import { updateIconAnimation, cleanupIcons, checkCollisions } from './helpers/iconAnimation';
import { renderIcon } from './helpers/iconRendering';
import { preloadImages } from './helpers/imageLoader';

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
    };
    
    p.draw = () => {
      p.clear();
      
      // Handle mouse clicks - create new icons
      if (getMouseClicked()) {
        const clickPos = getClickPos();
        
        // Only create icons if the click was within the canvas bounds
        if (clickPos.x >= 0 && clickPos.x <= p.width && 
            clickPos.y >= 0 && clickPos.y <= p.height) {
          icons = createIconsAtPosition(p, icons, clickPos.x, clickPos.y);
        }
        
        // Reset mouse clicked state
        resetMouseClick();
      }
      
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
  };
};
