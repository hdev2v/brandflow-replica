
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

  // Handle mouse clicks within the canvas
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setClickPos({ 
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setMouseClicked(true);
    }
  };

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
        onClick={handleCanvasClick}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default P5SocialIcons;
