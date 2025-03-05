
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Helper function to update icon position and handle bouncing
export const updateIconPosition = (p: p5, icon: SocialIcon, width: number, height: number): void => {
  // Initialize vx and vy if they don't exist yet
  if (icon.vx === undefined) icon.vx = icon.speedX;
  if (icon.vy === undefined) icon.vy = icon.speedY;
  
  // Limit max speed
  icon.vx = p.constrain(icon.vx, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
  icon.vy = p.constrain(icon.vy, -SKETCH_CONFIG.MAX_SPEED, SKETCH_CONFIG.MAX_SPEED);
  
  // Apply friction to gradually slow down
  icon.vx *= SKETCH_CONFIG.FRICTION;
  icon.vy *= SKETCH_CONFIG.FRICTION;
  
  // Update position
  icon.x += icon.vx;
  icon.y += icon.vy;
  
  // Bounce off edges with slight randomization for more organic movement
  if (icon.x < 0 || icon.x > width) {
    icon.vx *= -1;
    icon.vx += p.random(-0.1, 0.1); // Add slight randomness
  }
  if (icon.y < 0 || icon.y > height) {
    icon.vy *= -1;
    icon.vy += p.random(-0.1, 0.1); // Add slight randomness
  }
};
