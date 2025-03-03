
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';
import { SKETCH_CONFIG } from '../socialIconsSketchConfig';
import { SocialPlatformConfig } from '@/config/socialPlatforms';

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
  
  // Repel icons from the title area
  const titleElement = document.getElementById('services-title');
  if (titleElement) {
    const titleRect = titleElement.getBoundingClientRect();
    const containerRect = document.querySelector('.viewport-section')?.getBoundingClientRect();
    
    if (containerRect) {
      // Convert title coordinates to canvas coordinates
      const titleX = titleRect.left + titleRect.width / 2 - containerRect.left;
      const titleY = titleRect.top + titleRect.height / 2 - containerRect.top;
      const titleWidth = titleRect.width * 1.5; // Make the repulsion area larger than the title
      const titleHeight = titleRect.height * 2;
      
      // Check if icon is within or near the title area (with some margin)
      const distX = Math.abs(icon.x - titleX);
      const distY = Math.abs(icon.y - titleY);
      
      if (distX < titleWidth / 2 + 30 && distY < titleHeight / 2 + 20) {
        // Calculate force direction away from title center
        const forceX = icon.x - titleX;
        const forceY = icon.y - titleY;
        const forceMag = Math.sqrt(forceX * forceX + forceY * forceY);
        
        if (forceMag > 0) {
          // Apply stronger repulsion force - title area is a no-fly zone
          icon.speedX += (forceX / forceMag) * 1.0;
          icon.speedY += (forceY / forceMag) * 1.0;
        }
      }
    }
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

// Helper function to create new icons at click position
export const createIconsAtPosition = (
  p: p5,
  x: number,
  y: number,
  count: number,
  socialPlatforms: SocialPlatformConfig[]
): SocialIcon[] => {
  const newIcons: SocialIcon[] = [];
  
  for (let i = 0; i < count; i++) {
    const platform = p.random(socialPlatforms);
    const size = p.random(SKETCH_CONFIG.ICON_MIN_SIZE, SKETCH_CONFIG.ICON_MAX_SIZE);
    const angle = p.random(p.TWO_PI);
    const speed = p.random(1, 3);
    
    newIcons.push({
      x: x,
      y: y,
      size: size,
      speedX: p.cos(angle) * speed,
      speedY: p.sin(angle) * speed,
      opacity: p.random(70, 95),
      color: platform.color,
      platform: platform.platform,
      isTargeting: false
    });
  }
  
  return newIcons;
};
