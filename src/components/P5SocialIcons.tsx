
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
  logo: string;
}

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Define the sketch
    const sketch = (p: p5) => {
      const icons: SocialIcon[] = [];
      const numIcons = 20;
      const logoImages: Record<string, p5.Image> = {};
      
      // Social media platforms with their brand colors and logo paths
      const socialPlatforms = [
        { icon: 'fb', name: 'Facebook', color: '#1877F2', logo: 'facebook' },
        { icon: 'ig', name: 'Instagram', color: '#E4405F', logo: 'instagram' },
        { icon: 'yt', name: 'YouTube', color: '#FF0000', logo: 'youtube' },
        { icon: 'tt', name: 'TikTok', color: '#000000', logo: 'tiktok' },
        { icon: 'tw', name: 'Twitter', color: '#1DA1F2', logo: 'twitter' },
        { icon: 'sc', name: 'Snapchat', color: '#FFFC00', logo: 'snapchat' },
        { icon: 'li', name: 'LinkedIn', color: '#0A66C2', logo: 'linkedin' },
        { icon: 'pi', name: 'Pinterest', color: '#E60023', logo: 'pinterest' },
        { icon: 'wa', name: 'WhatsApp', color: '#25D366', logo: 'whatsapp' },
        { icon: 'gm', name: 'Gmail', color: '#EA4335', logo: 'gmail' }
      ];
      
      // Preload images
      p.preload = () => {
        // For now, we'll still use circle fallbacks as we don't have the actual logo images
      };
      
      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current!.offsetWidth, canvasRef.current!.offsetHeight);
        canvas.style('position', 'absolute');
        canvas.style('z-index', '1');
        
        // Initialize icons with more varied speeds and sizes
        for (let i = 0; i < numIcons; i++) {
          const platform = p.random(socialPlatforms);
          // More varied speeds and sizes for more dynamic movement
          const size = p.random(30, 60);
          const speedMultiplier = p.map(size, 30, 60, 1.5, 0.5); // Smaller icons move faster
          
          icons.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: size,
            icon: platform.icon,
            speedX: p.random(-1, 1) * speedMultiplier,
            speedY: p.random(-1, 1) * speedMultiplier,
            opacity: p.random(70, 95),
            color: platform.color,
            logo: platform.logo
          });
        }
      };
      
      p.draw = () => {
        p.clear();
        
        // Draw shadow first for a subtle layered effect
        for (let i = 0; i < icons.length; i++) {
          const icon = icons[i];
          
          // Draw subtle shadow
          p.noStroke();
          p.fill(0, 0, 0, 5);
          p.ellipse(icon.x + 2, icon.y + 2, icon.size + 4, icon.size + 4);
        }
        
        // Update and display icons
        for (let i = 0; i < icons.length; i++) {
          const icon = icons[i];
          
          // Move the icon with slight acceleration/deceleration for more natural movement
          const noise = p.noise(icon.x * 0.01, icon.y * 0.01, p.frameCount * 0.01);
          const accelerationFactor = p.map(noise, 0, 1, 0.98, 1.02);
          
          icon.speedX *= accelerationFactor;
          icon.speedY *= accelerationFactor;
          
          // Limit max speed
          const maxSpeed = 2;
          icon.speedX = p.constrain(icon.speedX, -maxSpeed, maxSpeed);
          icon.speedY = p.constrain(icon.speedY, -maxSpeed, maxSpeed);
          
          icon.x += icon.speedX;
          icon.y += icon.speedY;
          
          // Bounce off edges with slight randomization for more organic movement
          if (icon.x < 0 || icon.x > p.width) {
            icon.speedX *= -1;
            icon.speedX += p.random(-0.1, 0.1); // Add slight randomness
          }
          if (icon.y < 0 || icon.y > p.height) {
            icon.speedY *= -1;
            icon.speedY += p.random(-0.1, 0.1); // Add slight randomness
          }
          
          // Apply a subtle glow effect
          const glowSize = icon.size * 1.2;
          p.noStroke();
          
          // Convert hex color to RGB for the glow
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 255, g: 255, b: 255 };
          };
          
          const rgb = hexToRgb(icon.color);
          
          // Draw subtle glow
          p.fill(rgb.r, rgb.g, rgb.b, icon.opacity * 0.2);
          p.ellipse(icon.x, icon.y, glowSize, glowSize);
          
          // Draw the main circle with the brand color
          p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
          p.circle(icon.x, icon.y, icon.size);
          
          // Draw the icon letter in white with a better font styling
          p.fill(255, 255, 255, icon.opacity + 10);
          p.textSize(icon.size * 0.45);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);
          p.text(icon.icon.toUpperCase(), icon.x, icon.y);
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
