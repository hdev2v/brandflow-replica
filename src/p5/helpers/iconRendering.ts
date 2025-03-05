
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';

// Render the icon based on whether the image is loaded
export const renderIcon = (
  p: p5, 
  icon: SocialIcon, 
  logoImages: Record<string, p5.Image>, 
  loadedImages: Record<string, boolean>
): void => {
  const imageLoaded = logoImages[icon.platform] && loadedImages[icon.platform];
  
  // Apply scaling for pop animation
  const scaleFactor = icon.scale !== undefined ? icon.scale : 1.0;
  const currentSize = icon.size * scaleFactor;
  
  // Add glow effect if icon is colliding
  if (icon.isColliding) {
    p.push();
    p.noStroke();
    
    // Draw glow effect as a larger circle behind the icon
    const glowColor = p.color(icon.color);
    glowColor.setAlpha(100);
    p.fill(glowColor);
    
    if (icon.rotation !== undefined) {
      p.translate(icon.x, icon.y);
      p.rotate(icon.rotation);
      p.circle(0, 0, currentSize * 1.4);
    } else {
      p.circle(icon.x, icon.y, currentSize * 1.4);
    }
    p.pop();
  }

  if (imageLoaded) {
    // Draw the actual logo image
    p.push();
    p.imageMode(p.CENTER);
    if (icon.rotation !== undefined) {
      p.translate(icon.x, icon.y);
      p.rotate(icon.rotation);
      p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
      p.image(logoImages[icon.platform], 0, 0, currentSize, currentSize);
    } else {
      p.tint(255, icon.opacity * 2.55); // Convert opacity to 0-255 range
      p.image(logoImages[icon.platform], icon.x, icon.y, currentSize, currentSize);
    }
    p.pop();
  } else {
    // Fallback to circle with first letter if image not loaded
    const rgb = {
      r: parseInt(icon.color.slice(1, 3), 16),
      g: parseInt(icon.color.slice(3, 5), 16),
      b: parseInt(icon.color.slice(5, 7), 16)
    };
    
    p.push();
    if (icon.rotation !== undefined) {
      p.translate(icon.x, icon.y);
      p.rotate(icon.rotation);
      p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
      p.circle(0, 0, currentSize);
      p.fill(255, 255, 255, icon.opacity + 10);
      p.textSize(currentSize * 0.45);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.text(icon.platform.charAt(0).toUpperCase(), 0, 0);
    } else {
      p.fill(rgb.r, rgb.g, rgb.b, icon.opacity);
      p.circle(icon.x, icon.y, currentSize);
      p.fill(255, 255, 255, icon.opacity + 10);
      p.textSize(currentSize * 0.45);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.text(icon.platform.charAt(0).toUpperCase(), icon.x, icon.y);
    }
    p.pop();
  }
};
