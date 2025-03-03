
import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

interface SocialIcon {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  platform: string;
}

const P5SocialIcons: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Define the sketch
    const sketch = (p: p5) => {
      const icons: SocialIcon[] = [];
      const numIcons = 20;
      const logoImages: Record<string, p5.Image> = {};
      const loadedImages: Record<string, boolean> = {};
      
      // Social media platforms with their brand colors and logo paths
      const socialPlatforms = [
        { platform: 'facebook', name: 'Facebook', color: '#1877F2' },
        { platform: 'instagram', name: 'Instagram', color: '#E4405F' },
        { platform: 'youtube', name: 'YouTube', color: '#FF0000' },
        { platform: 'tiktok', name: 'TikTok', color: '#000000' },
        { platform: 'x', name: 'X', color: '#000000' },
        { platform: 'snapchat', name: 'Snapchat', color: '#FFFC00' },
        { platform: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
        { platform: 'whatsapp', name: 'WhatsApp', color: '#25D366' },
        { platform: 'meta', name: 'Meta', color: '#0668E1' },
        { platform: 'messenger', name: 'Messenger', color: '#00B2FF' }
      ];
      
      // Preload images with error handling
      p.preload = () => {
        socialPlatforms.forEach(platform => {
          try {
            logoImages[platform.platform] = p.loadImage(
              `/social-icons/${platform.platform}.png`, 
              // Success callback
              () => {
                loadedImages[platform.platform] = true;
                console.log(`Loaded ${platform.platform} image`);
                // Check if all images are loaded
                if (Object.keys(loadedImages).length === socialPlatforms.length) {
                  setLoading(false);
                }
              },
              // Error callback
              () => {
                console.log(`Failed to load ${platform.platform} image, using fallback`);
                loadedImages[platform.platform] = false;
                // Even if image fails, we still want to continue
                if (Object.keys(loadedImages).length === socialPlatforms.length) {
                  setLoading(false);
                }
              }
            );
          } catch (error) {
            console.error(`Error loading ${platform.platform}:`, error);
            loadedImages[platform.platform] = false;
          }
        });
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
            speedX: p.random(-1, 1) * speedMultiplier,
            speedY: p.random(-1, 1) * speedMultiplier,
            opacity: p.random(70, 95),
            color: platform.color,
            platform: platform.platform
          });
        }
      };
      
      p.draw = () => {
        p.clear();
        
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
          
          // Convert hex color to RGB for the icon background if needed
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : { r: 255, g: 255, b: 255 };
          };
          
          const rgb = hexToRgb(icon.color);
          
          // Check if the image is loaded successfully
          const imageLoaded = logoImages[icon.platform] && loadedImages[icon.platform];
          
          if (imageLoaded) {
            // Draw the actual logo image without any glow effect
            p.push();
            p.imageMode(p.CENTER);
            p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
            p.image(logoImages[icon.platform], icon.x, icon.y, icon.size, icon.size);
            p.pop();
          } else {
            // Fallback to circle with first letter if image not loaded
            p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
            p.circle(icon.x, icon.y, icon.size);
            
            p.fill(255, 255, 255, icon.opacity + 10);
            p.textSize(icon.size * 0.45);
            p.textAlign(p.CENTER, p.CENTER);
            p.textStyle(p.BOLD);
            p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
          }
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
