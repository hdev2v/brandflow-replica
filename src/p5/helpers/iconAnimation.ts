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

  // Update collision timer if active
  if (icon.collisionTimer && icon.collisionTimer > 0) {
    icon.collisionTimer -= 1;
    
    // Reset collision state when timer expires
    if (icon.collisionTimer <= 0) {
      icon.isColliding = false;
      icon.collisionTimer = undefined;
      icon.color = icon.originalColor || icon.color;
      icon.originalColor = undefined;
    }
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

// Check collisions between all icons
export const checkCollisions = (p: p5, icons: SocialIcon[]): void => {
  for (let i = 0; i < icons.length; i++) {
    const iconA = icons[i];
    
    for (let j = i + 1; j < icons.length; j++) {
      const iconB = icons[j];
      
      // Calculate distance between icon centers
      const dx = iconA.x - iconB.x;
      const dy = iconA.y - iconB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate the sum of radii (since icons are circles)
      const minDistance = (iconA.size + iconB.size) / 2;
      
      // Collision detected
      if (distance < minDistance) {
        // Handle collision physics
        const angle = Math.atan2(dy, dx);
        const speed = Math.sqrt(iconA.vx * iconA.vx + iconA.vy * iconA.vy);
        
        // Apply collision effect to both icons
        applyCollisionEffect(p, iconA);
        applyCollisionEffect(p, iconB);
        
        // Simple collision response (bounce away from each other)
        const overlap = minDistance - distance;
        
        // Move icons apart to avoid sticking
        const moveX = (dx / distance) * overlap * 0.5;
        const moveY = (dy / distance) * overlap * 0.5;
        
        iconA.x += moveX;
        iconA.y += moveY;
        iconB.x -= moveX;
        iconB.y -= moveY;
        
        // Exchange momentum for realistic bouncing
        const nx = dx / distance;
        const ny = dy / distance;
        
        const p1 = 2 * (iconA.vx * nx + iconA.vy * ny) / (2);
        const p2 = 2 * (iconB.vx * nx + iconB.vy * ny) / (2);
        
        iconA.vx -= p1 * nx;
        iconA.vy -= p1 * ny;
        iconB.vx -= p2 * nx;
        iconB.vy -= p2 * ny;
        
        // Add some random velocity for more dynamic movement
        iconA.vx += p.random(-0.5, 0.5);
        iconA.vy += p.random(-0.5, 0.5);
        iconB.vx += p.random(-0.5, 0.5);
        iconB.vy += p.random(-0.5, 0.5);
      }
    }
  }
};

// Apply collision visual effect to an icon
const applyCollisionEffect = (p: p5, icon: SocialIcon): void => {
  // Only apply effect if not already colliding
  if (!icon.isColliding) {
    // Save original color to revert back later
    icon.originalColor = icon.color;
    
    // Set collision state
    icon.isColliding = true;
    
    // Set collision timer (frames the effect will last)
    icon.collisionTimer = 10;
    
    // Choose a bright flash color
    const flashColors = [
      '#F97316', // Bright Orange
      '#0EA5E9', // Ocean Blue
      '#D946EF', // Magenta Pink
      '#8B5CF6', // Vivid Purple
      '#33C3F0'  // Sky Blue
    ];
    
    // Set a random flash color
    icon.color = flashColors[Math.floor(p.random(0, flashColors.length))];
  }
};
