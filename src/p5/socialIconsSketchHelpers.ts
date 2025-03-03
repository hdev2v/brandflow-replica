
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SocialPlatformConfig } from '@/config/socialPlatforms';
import { SKETCH_CONFIG } from './socialIconsSketchConfig';

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

// Helper function to handle mouse repulsion
export const applyMouseRepulsion = (p: p5, icon: SocialIcon, mouseX: number, mouseY: number): void => {
  const dx = icon.x - mouseX;
  const dy = icon.y - mouseY;
  const distance = p.sqrt(dx * dx + dy * dy);
  
  if (distance < SKETCH_CONFIG.MOUSE_REPEL_RADIUS) {
    // Calculate repulsion force (stronger when closer)
    const force = p.map(distance, 0, SKETCH_CONFIG.MOUSE_REPEL_RADIUS, SKETCH_CONFIG.MOUSE_REPEL_STRENGTH, 0);
    
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
};

// Helper function to handle card targeting
export const applyCardTargeting = (
  p: p5, 
  icon: SocialIcon, 
  index: number, 
  totalIcons: number,
  cardCenterX: number, 
  cardCenterY: number, 
  cardWidth: number, 
  cardHeight: number
): void => {
  // Calculate target position around the card
  const angle = p.TWO_PI * (index / totalIcons);
  const radius = p.max(cardWidth, cardHeight) * 0.8;
  
  icon.targetX = cardCenterX + p.cos(angle) * radius;
  icon.targetY = cardCenterY + p.sin(angle) * radius;
  icon.isTargeting = true;
  
  // Move toward target with easing
  const dx = icon.targetX - icon.x;
  const dy = icon.targetY - icon.y;
  icon.speedX = p.lerp(icon.speedX, dx * SKETCH_CONFIG.GATHER_STRENGTH, 0.1);
  icon.speedY = p.lerp(icon.speedY, dy * SKETCH_CONFIG.GATHER_STRENGTH, 0.1);
};

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
