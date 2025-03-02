
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
  color: string;
}

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Define the sketch
    const sketch = (p: p5) => {
      const icons: SocialIcon[] = [];
      const numIcons = 25;
      
      // Social media platforms with their brand colors
      const socialPlatforms = [
        { icon: 'fb', name: 'Facebook', color: '#1877F2' },
        { icon: 'ig', name: 'Instagram', color: '#E4405F' },
        { icon: 'yt', name: 'YouTube', color: '#FF0000' },
        { icon: 'tt', name: 'TikTok', color: '#000000' },
        { icon: 'tw', name: 'Twitter', color: '#1DA1F2' },
        { icon: 'sc', name: 'Snapchat', color: '#FFFC00' },
        { icon: 'li', name: 'LinkedIn', color: '#0A66C2' },
        { icon: 'pi', name: 'Pinterest', color: '#E60023' },
        { icon: 'wa', name: 'WhatsApp', color: '#25D366' },
        { icon: 'gm', name: 'Gmail', color: '#EA4335' }
      ];
      
      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight);
        canvas.style('position', 'absolute');
        canvas.style('z-index', '1');
        
        // Initialize icons
        for (let i = 0; i < numIcons; i++) {
          const platform = p.random(socialPlatforms);
          icons.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(20, 40),
            icon: platform.icon,
            speedX: p.random(-1, 1),
            speedY: p.random(-1, 1),
            opacity: p.random(40, 100),
            color: platform.color
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
          
          // Draw platform icon with brand color
          p.noStroke();
          
          // Draw a circle with the brand color
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 255, g: 255, b: 255 };
          };
          
          const rgb = hexToRgb(icon.color);
          p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
          p.circle(icon.x, icon.y, icon.size);
          
          // Draw the icon letter in white
          p.fill(255, 255, 255, icon.opacity);
          p.textSize(icon.size * 0.5);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.text(icon.icon.charAt(0).toUpperCase(), icon.x, icon.y);
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
