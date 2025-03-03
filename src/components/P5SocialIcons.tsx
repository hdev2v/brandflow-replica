
import React, { useRef, useState, useEffect } from 'react';
import { useP5SocialIconsSketch } from '@/hooks/useP5SocialIconsSketch';

interface ServiceCardRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<ServiceCardRect | null>(null);
  const [serviceCards, setServiceCards] = useState<ServiceCardRect[]>([]);
  const { loading } = useP5SocialIconsSketch({ 
    containerRef: canvasRef,
    mousePos,
    hoveredCard,
    serviceCards
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Find and track service cards - the issue was here!
  useEffect(() => {
    const updateServiceCards = () => {
      const cards = Array.from(document.querySelectorAll('.glass-card')).map((card, id) => {
        const rect = card.getBoundingClientRect();
        return {
          id,
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        };
      });
      setServiceCards(cards);
    };

    // Initial detection
    updateServiceCards();

    // Update on resize
    window.addEventListener('resize', updateServiceCards);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', updateServiceCards);
    };
  }, []); // Empty dependency array means this only runs once on mount

  // Separate effect for hover detection using the current serviceCards state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const hovered = serviceCards.find(card => 
        clientX >= card.x && 
        clientX <= card.x + card.width && 
        clientY >= card.y && 
        clientY <= card.y + card.height
      );
      
      setHoveredCard(hovered || null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [serviceCards]); // Only re-run when serviceCards changes

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute top-2 left-2 text-sm text-primary-foreground z-10 bg-black/20 px-2 py-1 rounded">
          Loading icons...
        </div>
      )}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};

export default P5SocialIcons;
