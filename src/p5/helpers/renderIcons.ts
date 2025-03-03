
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';

// Helper function to draw icons
export const drawIcon = (
  p: p5, 
  icon: SocialIcon, 
  logoImages: Record<string, p5.Image>, 
  loadedImages: Record<string, boolean>
): void => {
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
    const rgb = {
      r: parseInt(icon.color.slice(1, 3), 16),
      g: parseInt(icon.color.slice(3, 5), 16),
      b: parseInt(icon.color.slice(5, 7), 16)
    };
    
    p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
    p.circle(icon.x, icon.y, icon.size);
    
    p.fill(255, 255, 255, icon.opacity + 10);
    p.textSize(icon.size * 0.45);
    p.textAlign(p.CENTER, p.CENTER);
    p.textStyle(p.BOLD);
    p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
  }
};
