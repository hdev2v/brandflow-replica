
import { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { createSocialIconsSketch } from '@/p5/createSocialIconsSketch';

interface ServiceCardRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseP5SocialIconsSketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
  mousePos?: { x: number, y: number };
  hoveredCard?: ServiceCardRect | null;
  serviceCards?: ServiceCardRect[];
  mouseClicked?: boolean;
  clickPos?: { x: number, y: number };
  resetMouseClick?: () => void;
}

export const useP5SocialIconsSketch = ({ 
  containerRef, 
  mousePos = { x: 0, y: 0 }, 
  hoveredCard = null,
  serviceCards = [],
  mouseClicked = false,
  clickPos = { x: 0, y: 0 },
  resetMouseClick = () => {}
}: UseP5SocialIconsSketchProps) => {
  const sketchRef = useRef<p5 | null>(null);
  const [loading, setLoading] = useState(true);
  const iconListRef = useRef<SocialIcon[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the sketch with access to state values
    const sketch = createSocialIconsSketch({
      containerRef,
      onLoadingChange: setLoading,
      getMousePos: () => mousePos,
      getHoveredCard: () => hoveredCard,
      getServiceCards: () => serviceCards,
      getMouseClicked: () => mouseClicked,
      getClickPos: () => clickPos,
      resetMouseClick,
      setIconsRef: (icons) => {
        iconListRef.current = icons;
      }
    });

    // Create the p5 instance
    sketchRef.current = new p5(sketch, containerRef.current);

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [containerRef]); // Only recreate on container change

  return { loading };
};
