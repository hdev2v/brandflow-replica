
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { socialPlatforms } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';

// Function to add a new icon
export const createIcon = (
  p: p5, 
  x: number, 
  y: number, 
  randomizeVelocity: boolean = false
): SocialIcon => {
  const platform = socialPlatforms[Math.floor(p.random(0, socialPlatforms.length))];
  const size = p.random(SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE);
  const speedMultiplier = p.map(size, SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE, 1.5, 0.5);
  
  let vx, vy;
  
  if (randomizeVelocity) {
    // Random initial velocity for autonomous movement
    const angle = p.random(0, p.TWO_PI);
    const speed = p.random(SKETCH_CONFIG.MIN_VELOCITY, SKETCH_CONFIG.MAX_VELOCITY) * speedMultiplier;
    vx = p.cos(angle) * speed;
    vy = p.sin(angle) * speed;
  } else {
    // For icons created by clicks, make them explode outward with more energy
    const angle = p.random(0, p.TWO_PI);
    const speed = p.random(3, 5); // Increased speed for more dynamic "pop" effect
    vx = p.cos(angle) * speed;
    vy = p.sin(angle) * speed;
  }
  
  return {
    x,
    y,
    size,
    speedX: 0, // Legacy field, kept for compatibility
    speedY: 0, // Legacy field, kept for compatibility
    opacity: p.random(70, 95),
    color: platform.color,
    platform: platform.platform,
    isTargeting: false,
    vx,
    vy,
    rotation: p.random(0, p.TWO_PI),
    rotationSpeed: p.random(-0.05, 0.05),
    scale: 0.1, // Start small for popup animation
    targetScale: 1.0, // Target normal size
    popAnimationActive: true // Flag to indicate this icon is animating in
  };
};

// Function to initialize icons with the initial count
export const initializeIcons = (p: p5, width: number, height: number): SocialIcon[] => {
  const icons: SocialIcon[] = [];
  
  for (let i = 0; i < SKETCH_CONFIG.NUM_ICONS; i++) {
    icons.push(createIcon(p, p.random(width), p.random(height), true));
  }
  
  return icons;
};

// Function to create multiple icons at a specific position (for click events)
export const createIconsAtPosition = (
  p: p5, 
  icons: SocialIcon[], 
  x: number, 
  y: number
): SocialIcon[] => {
  const newIcons = [...icons];
  const randomCount = Math.floor(p.random(4, 8)); // Increased number of icons that appear
  
  for (let i = 0; i < randomCount; i++) {
    newIcons.push(createIcon(p, x, y, false));
  }
  
  return newIcons;
};
