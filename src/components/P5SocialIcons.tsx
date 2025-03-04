
import React, { useRef, useState } from 'react';
import { useP5SocialIconsSketch } from '@/hooks/useP5SocialIconsSketch';

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [mouseClicked, setMouseClicked] = useState<boolean>(false);
  const [clickPos, setClickPos] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  
  const { loading } = useP5SocialIconsSketch({ 
    containerRef: canvasRef,
    mouseClicked,
    clickPos,
    resetMouseClick: () => setMouseClicked(false)
  });

  // We only need click handling now, not mouse movement tracking
  const handleClick = (e: React.MouseEvent) => {
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
        console.log('Click in features section', { x: e.clientX, y: e.clientY });
      }
    }
  };

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
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
