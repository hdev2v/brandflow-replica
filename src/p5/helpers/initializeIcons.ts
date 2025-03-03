
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SocialPlatformConfig } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Helper function to initialize icons
export const initializeIcons = (p: p5, width: number, height: number, socialPlatforms: SocialPlatformConfig[]): SocialIcon[] => {
  const icons: SocialIcon[] = [];
  
  for (let i = 0; i < SKETCH_CONFIG.NUM_ICONS; i++) {
    const platform = p.random(socialPlatforms);
    // More varied speeds and sizes for more dynamic movement
    const size = p.random(SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE);
    const speedMultiplier = p.map(size, SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE, 1.5, 0.5); // Smaller icons move faster
    
    icons.push({
      x: p.random(width),
      y: p.random(height),
      size: size,
      speedX: p.random(-1, 1) * speedMultiplier,
      speedY: p.random(-1, 1) * speedMultiplier,
      opacity: p.random(70, 95),
      color: platform.color,
      platform: platform.platform,
      isTargeting: false
    });
  }
  
  return icons;
};
