
import { useRef, useState, useEffect } from 'react';
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { hexToRgb } from '@/utils/colorUtils';

interface ServiceCardRect {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseP5SocialIconsSketchProps {
  containerRef: React.RefObject<HTMLDivElement>;
  mousePos?: { x: number, y: number };
  hoveredCard?: ServiceCardRect | null;
  serviceCards?: ServiceCardRect[];
}

export const useP5SocialIconsSketch = ({ 
  containerRef, 
  mousePos = { x: 0, y: 0 }, 
  hoveredCard = null,
  serviceCards = []
}: UseP5SocialIconsSketchProps) => {
  const sketchRef = useRef<p5 | null>(null);
  const [loading, setLoading] = useState(true);
  const iconListRef = useRef<SocialIcon[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Define the sketch
    const sketch = (p: p5) => {
      const icons: SocialIcon[] = [];
      const numIcons = 20;
      const logoImages: Record<string, p5.Image> = {};
      const loadedImages: Record<string, boolean> = {};
      
      // Mouse interaction constants
      const MOUSE_REPEL_RADIUS = 100;
      const MOUSE_REPEL_STRENGTH = 2;
      const GATHER_STRENGTH = 0.05;
      const RETURN_STRENGTH = 0.02;
      
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
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
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
            platform: platform.platform,
            isTargeting: false
          });
        }
        
        // Store icons in ref for external access
        iconListRef.current = icons;
      };
      
      p.draw = () => {
        p.clear();
        
        // Get mouse position relative to canvas
        const mouseX = mousePos.x - containerRef.current!.getBoundingClientRect().left;
        const mouseY = mousePos.y - containerRef.current!.getBoundingClientRect().top;
        
        // Convert service cards to canvas coordinates
        const cardRects = serviceCards.map(card => {
          const canvasLeft = card.x - containerRef.current!.getBoundingClientRect().left;
          const canvasTop = card.y - containerRef.current!.getBoundingClientRect().top;
          return {
            ...card,
            x: canvasLeft,
            y: canvasTop
          };
        });
        
        // Update and display icons
        for (let i = 0; i < icons.length; i++) {
          const icon = icons[i];
          
          // Reset targeting
          icon.isTargeting = false;
          
          // Handle hovering over a service card - gather icons
          if (hoveredCard) {
            const canvasCardX = hoveredCard.x - containerRef.current!.getBoundingClientRect().left;
            const canvasCardY = hoveredCard.y - containerRef.current!.getBoundingClientRect().top;
            
            // Calculate target position around the card
            const cardCenterX = canvasCardX + hoveredCard.width / 2;
            const cardCenterY = canvasCardY + hoveredCard.height / 2;
            
            // Distribute icons around the card
            const angle = p.TWO_PI * (i / icons.length);
            const radius = p.max(hoveredCard.width, hoveredCard.height) * 0.8;
            
            icon.targetX = cardCenterX + p.cos(angle) * radius;
            icon.targetY = cardCenterY + p.sin(angle) * radius;
            icon.isTargeting = true;
            
            // Move toward target with easing
            const dx = icon.targetX - icon.x;
            const dy = icon.targetY - icon.y;
            icon.speedX = p.lerp(icon.speedX, dx * GATHER_STRENGTH, 0.1);
            icon.speedY = p.lerp(icon.speedY, dy * GATHER_STRENGTH, 0.1);
          } 
          // If mouse is nearby and not targeting, run away
          else if (!icon.isTargeting) {
            const dx = icon.x - mouseX;
            const dy = icon.y - mouseY;
            const distance = p.sqrt(dx * dx + dy * dy);
            
            if (distance < MOUSE_REPEL_RADIUS) {
              // Calculate repulsion force (stronger when closer)
              const force = p.map(distance, 0, MOUSE_REPEL_RADIUS, MOUSE_REPEL_STRENGTH, 0);
              
              // Add repulsion to velocity
              icon.speedX += (dx / distance) * force;
              icon.speedY += (dy / distance) * force;
            } else {
              // Natural movement with slight acceleration/deceleration
              const noise = p.noise(icon.x * 0.01, icon.y * 0.01, p.frameCount * 0.01);
              const accelerationFactor = p.map(noise, 0, 1, 0.98, 1.02);
              
              icon.speedX *= accelerationFactor;
              icon.speedY *= accelerationFactor;
            }
          }
          
          // Limit max speed
          const maxSpeed = 3;
          icon.speedX = p.constrain(icon.speedX, -maxSpeed, maxSpeed);
          icon.speedY = p.constrain(icon.speedY, -maxSpeed, maxSpeed);
          
          // Apply friction to gradually slow down
          icon.speedX *= 0.95;
          icon.speedY *= 0.95;
          
          // Update position
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
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };
    };

    // Create the p5 instance
    sketchRef.current = new p5(sketch, containerRef.current);

    // Cleanup function
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [containerRef]);

  return { loading };
};
