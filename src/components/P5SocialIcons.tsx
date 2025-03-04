
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

  // Track mouse position only when in the features section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if within features section
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const isInFeaturesSection = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        if (isInFeaturesSection) {
          setMousePos({ 
            x: e.clientX, 
            y: e.clientY 
          });
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

  // Handle mouse clicks only when in features section
  useEffect(() => {
    const handleMouseClick = (e: MouseEvent) => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const isInFeaturesSection = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
        
        if (isInFeaturesSection) {
          setMouseClicked(true);
          setClickPos({ 
            x: e.clientX, 
            y: e.clientY 
          });
          
          // Debug logging
          console.log('Mouse clicked in features section', { x: e.clientX, y: e.clientY });
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
