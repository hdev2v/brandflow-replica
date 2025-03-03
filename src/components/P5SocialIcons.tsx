
import React, { useRef } from 'react';
import { useP5SocialIconsSketch } from '@/hooks/useP5SocialIconsSketch';

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { loading } = useP5SocialIconsSketch({ containerRef: canvasRef });

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
