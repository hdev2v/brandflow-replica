
import React, { useRef, useState, useEffect } from 'react';
import { useP5SocialIconsSketch } from '@/hooks/useP5SocialIconsSketch';

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [mouseClicked, setMouseClicked] = useState<boolean>(false);
  const [clickPos, setClickPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [isInSection, setIsInSection] = useState<boolean>(false);
  
  const { loading } = useP5SocialIconsSketch({ 
    containerRef: canvasRef,
    mousePos,
    mouseClicked,
    clickPos,
    resetMouseClick: () => setMouseClicked(false)
  });

  // Track mouse position only when in the services section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if within services section
      const servicesSection = document.getElementById('features');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const isInServicesSection = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        if (isInServicesSection) {
          setMousePos({ x: e.clientX, y: e.clientY });
          setIsInSection(true);
        } else {
          setIsInSection(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle mouse clicks only when in services section
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      const servicesSection = document.getElementById('features');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const isInServicesSection = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        if (isInServicesSection) {
          setMouseClicked(true);
          setClickPos({ x: e.clientX, y: e.clientY });
        }
      }
    };

    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute top-2 left-2 text-sm text-primary-foreground z-10 bg-black/20 px-2 py-1 rounded">
          Loading icons...
        </div>
      )}
      <div 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  );
};

export default P5SocialIcons;
