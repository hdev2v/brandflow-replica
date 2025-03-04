
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Update icon animation and movement
export const updateIconAnimation = (p: p5, icon: SocialIcon): void => {
  // Occasionally change direction randomly for more natural movement
  if (p.random() < SKETCH_CONFIG.DIRECTION_CHANGE_CHANCE) {
    const angle = p.random(0, p.TWO_PI);
    
    icon.vx += p.cos(angle) * 0.1;
    icon.vy += p.sin(angle) * 0.1;
  }
  
  // Apply friction to gradually slow down
  icon.vx *= SKETCH_CONFIG.FRICTION;
  icon.vy *= SKETCH_CONFIG.FRICTION;
  
  // Ensure minimum speed so icons don't stop
  const currentSpeed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
  if (currentSpeed < SKETCH_CONFIG.MIN_VELOCITY) {
    const angle = Math.atan2(icon.vy, icon.vx);
    icon.vx = Math.cos(angle) * SKETCH_CONFIG.MIN_VELOCITY;
    icon.vy = Math.sin(angle) * SKETCH_CONFIG.MIN_VELOCITY;
  }
  
  // Limit max speed
  const maxSpeed = SKETCH_CONFIG.MAX_SPEED;
  icon.vx = p.constrain(icon.vx, -maxSpeed, maxSpeed);
  icon.vy = p.constrain(icon.vy, -maxSpeed, maxSpeed);
  
  // Update position
  icon.x += icon.vx;
  icon.y += icon.vy;
  
  // Bounce off edges with slight randomization for more organic movement
  if (icon.x < 0 || icon.x > p.width) {
    icon.vx *= -1;
    icon.vx += p.random(-0.1, 0.1); // Add slight randomness
  }
  if (icon.y < 0 || icon.y > p.height) {
    icon.vy *= -1;
    icon.vy += p.random(-0.1, 0.1); // Add slight randomness
  }
  
  // Update rotation
  if (icon.rotation !== undefined && icon.rotationSpeed !== undefined) {
    icon.rotation += icon.rotationSpeed;
  }
};

// Clean up icons that are far outside the canvas
export const cleanupIcons = (p: p5, icons: SocialIcon[]): SocialIcon[] => {
  const padding = 100;
  
  // Only remove icons if we have more than the desired number
  if (icons.length <= SKETCH_CONFIG.NUM_ICONS * 2) {
    return icons;
  }
  
  return icons.filter(icon => {
    return !(
      icon.x < -padding || 
      icon.x > p.width + padding || 
      icon.y < -padding || 
      icon.y > p.height + padding
    );
  });
};
