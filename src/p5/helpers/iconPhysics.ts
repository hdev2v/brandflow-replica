
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Helper function to update icon position and handle bouncing
export const updateIconPosition = (p: p5, icon: SocialIcon, width: number, height: number): void => {
  // Limit max speed
  icon.speedX = p.constrain(icon.speedX, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
  icon.speedY = p.constrain(icon.speedY, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
  
  // Apply friction to gradually slow down
  icon.speedX *= SKETCH_CONFIG.FRICTION;
  icon.speedY *= SKETCH_CONFIG.FRICTION;
  
  // Update position
  icon.x += icon.speedX;
  icon.y += icon.speedY;
  
  // Bounce off edges with slight randomization for more organic movement
  if (icon.x < 0 || icon.x > width) {
    icon.speedX *= -1;
    icon.speedX += p.random(-0.1, 0.1); // Add slight randomness
  }
  if (icon.y < 0 || icon.y > height) {
    icon.speedY *= -1;
    icon.speedY += p.random(-0.1, 0.1); // Add slight randomness
  }
};
