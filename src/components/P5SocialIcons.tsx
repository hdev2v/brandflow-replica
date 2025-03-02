
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface SocialIcon {
  x: number;
  y: number;
  size: number;
  icon: string;
  speedX: number;
  speedY: number;
  opacity: number;
}

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Icons to be used
    const icons = ['❤️', '👍', '💬', '🔄', '📸', '🎬', '📱', '📊', '📈', '🔔'];

    // Define the sketch
    const sketch = (p: p5) => {
      const icons: SocialIcon[] = [];
      const numIcons = 25;
      
      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight);
        canvas.style('position', 'absolute');
        canvas.style('z-index', '1');
        
        // Initialize icons
        for (let i = 0; i < numIcons; i++) {
          icons.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(15, 30),
            icon: p.random(icons),
            speedX: p.random(-1, 1),
            speedY: p.random(-1, 1),
            opacity: p.random(40, 100)
          });
        }
      };
      
      p.draw = () => {
        p.clear();
        
        // Update and display icons
        for (let i = 0; i < icons.length; i++) {
          const icon = icons[i];
          
          // Move the icon
          icon.x += icon.speedX;
          icon.y += icon.speedY;
          
          // Bounce off edges
          if (icon.x < 0 || icon.x > p.width) {
            icon.speedX *= -1;
          }
          if (icon.y < 0 || icon.y > p.height) {
            icon.speedY *= -1;
          }
          
          // Display the icon
          p.textSize(icon.size);
          p.textAlign(p.CENTER, p.CENTER);
          p.fill(255, 255, 255, icon.opacity);
          p.text(icon.icon, icon.x, icon.y);
        }
      };
      
      p.windowResized = () => {
        if (canvasRef.current) {
          p.resizeCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        }
      };
    };

    // Create the p5 instance
    sketchRef.current = new p5(sketch, canvasRef.current);

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default P5SocialIcons;
