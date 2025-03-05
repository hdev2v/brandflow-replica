
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Helper function to initialize icons
export const initializeIcons = (p: p5, width: number, height: number, numIcons: number): SocialIcon[] => {
  const icons: SocialIcon[] = [];
  
  for (let i = 0; i < numIcons; i++) {
    const platform = socialPlatforms[Math.floor(p.random(0, socialPlatforms.length))];
    // More varied speeds and sizes for more dynamic movement
    const size = p.random(SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE);
    const speedMultiplier = p.map(size, SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE, 1.5, 0.5); // Smaller icons move faster
    
    icons.push({
      x: p.random(width),
      y: p.random(height),
      size: size,
      speedX: p.random(-1, 1) * speedMultiplier,
      speedY: p.random(-1, 1) * speedMultiplier,
      vx: p.random(-1, 1) * speedMultiplier,
      vy: p.random(-1, 1) * speedMultiplier,
      opacity: p.random(70, 95),
      color: platform.color,
      platform: platform.platform,
      isTargeting: false,
      rotation: p.random(0, p.TWO_PI),
      rotationSpeed: p.random(-0.05, 0.05)
    });
  }
  
  return icons;
};
