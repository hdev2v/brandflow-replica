
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { 
  initializeIcons, 
  applyMouseRepulsion, 
  applyCardTargeting, 
  updateIconPosition, 
  drawIcon,
  createIconsAtPosition
} from './helpers';

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
  getHoveredCard: () => ServiceCardRect | null;
  getServiceCards: () => ServiceCardRect[];
  getMouseClicked: () => boolean;
  getClickPos: () => { x: number, y: number };
  resetMouseClick: () => void;
  setIconsRef: (icons: SocialIcon[]) => void;
}

export const createSocialIconsSketch = ({
  containerRef,
  onLoadingChange,
  getMousePos,
  getHoveredCard,
  getServiceCards,
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
      const canvas = p.createCanvas(
        containerRef.current!.offsetWidth, 
        containerRef.current!.offsetHeight
      );
      canvas.style('position', 'absolute');
      canvas.style('z-index', '1');
      
      // Initialize icons with numerical parameter for count
      const initializedIcons = initializeIcons(p, p.width, p.height, 20);
      icons.push(...initializedIcons);
      
      // Store icons in ref for external access
      setIconsRef(icons);
    };
    
    p.draw = () => {
      p.clear();
      
      // Get current state from props
      const mousePos = getMousePos();
      const hoveredCard = getHoveredCard();
      const serviceCards = getServiceCards();
      const mouseClicked = getMouseClicked();
      const clickPos = getClickPos();
      
      // Get mouse position relative to canvas
      const mouseX = mousePos.x - containerRef.current!.getBoundingClientRect().left;
      const mouseY = mousePos.y - containerRef.current!.getBoundingClientRect().top;
      
      // Convert service cards to canvas coordinates
      const cardRects = serviceCards.map(card => {
        const canvasLeft = card.x - containerRef.current!.getBoundingClientRect().left;
        const canvasTop = card.y - containerRef.current!.getBoundingClientRect().top;
        return {
          ...card,
          x: canvasLeft,
          y: canvasTop
        };
      });
      
      // Handle mouse clicks - create new icons
      if (mouseClicked) {
        const canvasClickX = clickPos.x - containerRef.current!.getBoundingClientRect().left;
        const canvasClickY = clickPos.y - containerRef.current!.getBoundingClientRect().top;
        
        // Create 3-5 new icons at click position
        const randomCount = Math.floor(p.random(3, 6));
        const newIcons = createIconsAtPosition(p, canvasClickX, canvasClickY, randomCount, socialPlatforms);
        
        icons.push(...newIcons);
        
        // Reset mouse clicked state
        resetMouseClick();
      }
      
      // Update and display icons
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i];
        
        // Reset targeting
        icon.isTargeting = false;
        
        // Handle hovering over a service card - gather icons
        if (hoveredCard) {
          const canvasCardX = hoveredCard.x - containerRef.current!.getBoundingClientRect().left;
          const canvasCardY = hoveredCard.y - containerRef.current!.getBoundingClientRect().top;
          
          applyCardTargeting(
            p, 
            icon, 
            i, 
            icons.length,
            canvasCardX + hoveredCard.width / 2,
            canvasCardY + hoveredCard.height / 2,
            hoveredCard.width,
            hoveredCard.height
          );
        } 
        // If mouse is nearby and not targeting, run away
        else if (!icon.isTargeting) {
          applyMouseRepulsion(p, icon, mouseX, mouseY);
        }
        
        // Update position and handle bouncing
        updateIconPosition(p, icon, p.width, p.height);
        
        // Draw the icon
        drawIcon(p, icon, logoImages, loadedImages);
      }
    };
    
    p.windowResized = () => {
      if (containerRef.current) {
        p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      }
    };
  };
};
