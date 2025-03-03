
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';

// Repel icons from mouse cursor
export const applyMouseRepulsion = (p: p5, icon: SocialIcon, mouseX: number, mouseY: number) => {
  const mouseRepelDistance = 120;
  const repelForce = 2;
  
  // Initialize vx and vy if they don't exist
  if (icon.vx === undefined) icon.vx = 0;
  if (icon.vy === undefined) icon.vy = 0;
  
  // Calculate distance between icon and mouse
  const d = p.dist(icon.x, icon.y, mouseX, mouseY);
  
  // Apply repulsion if mouse is close enough
  if (d < mouseRepelDistance) {
    const angle = p.atan2(icon.y - mouseY, icon.x - mouseX);
    const force = p.map(d, 0, mouseRepelDistance, repelForce, 0);
    icon.vx += p.cos(angle) * force;
    icon.vy += p.sin(angle) * force;
  }
  
  // Add a "no-fly zone" for the partner section
  const partnersSectionElement = document.getElementById('partners');
  if (partnersSectionElement) {
    const rect = partnersSectionElement.getBoundingClientRect();
    const partnersCenterX = rect.left + rect.width / 2;
    const partnersCenterY = rect.top + rect.height / 2;
    
    // Calculate distance to partners section center
    const distToPartners = p.dist(icon.x, icon.y, partnersCenterX, partnersCenterY);
    
    // If icon is in the partners section area, apply repulsion
    if (distToPartners < rect.width / 2.5) {
      const angle = p.atan2(icon.y - partnersCenterY, icon.x - partnersCenterX);
      const repelStrength = p.map(distToPartners, 0, rect.width / 2.5, 1.5, 0);
      icon.vx += p.cos(angle) * repelStrength;
      icon.vy += p.sin(angle) * repelStrength;
    }
  }
};

// Apply targeting towards a card when hovering
export const applyCardTargeting = (
  p: p5,
  icon: SocialIcon,
  iconIndex: number,
  totalIcons: number,
  targetX: number,
  targetY: number,
  cardWidth: number,
  cardHeight: number
) => {
  // Initialize vx and vy if they don't exist
  if (icon.vx === undefined) icon.vx = 0;
  if (icon.vy === undefined) icon.vy = 0;
  
  // Mark this icon as targeting
  icon.isTargeting = true;
  
  // Calculate a unique position around the card for this icon
  const angle = (iconIndex / totalIcons) * p.TWO_PI;
  const radius = Math.min(cardWidth, cardHeight) * 0.7;
  
  // Set the target position
  icon.targetX = targetX + p.cos(angle) * radius;
  icon.targetY = targetY + p.sin(angle) * radius;
  
  // Calculate direction and distance to target
  const dx = icon.targetX - icon.x;
  const dy = icon.targetY - icon.y;
  const dist = p.sqrt(dx * dx + dy * dy);
  
  // Apply force towards target
  const targetingStrength = 0.05;
  if (dist > 5) {
    icon.vx += (dx / dist) * targetingStrength;
    icon.vy += (dy / dist) * targetingStrength;
  }
};

// Create new icons at a position (for mouse click)
export const createIconsAtPosition = (
  p: p5,
  x: number,
  y: number,
  numIcons: number,
  socialPlatforms: any[]
) => {
  const newIcons: SocialIcon[] = [];
  
  for (let i = 0; i < numIcons; i++) {
    const randomPlatform = socialPlatforms[Math.floor(p.random(0, socialPlatforms.length))];
    const randomSize = p.random(24, 40);
    const randomAngle = p.random(0, p.TWO_PI);
    const randomSpeed = p.random(2, 5);
    
    const newIcon: SocialIcon = {
      x: x,
      y: y,
      size: randomSize,
      speedX: p.cos(randomAngle) * randomSpeed * 0.1,
      speedY: p.sin(randomAngle) * randomSpeed * 0.1,
      vx: p.cos(randomAngle) * randomSpeed,
      vy: p.sin(randomAngle) * randomSpeed,
      opacity: 0, // Start transparent
      color: randomPlatform.color,
      platform: randomPlatform.platform,
      isTargeting: false,
      rotation: p.random(0, p.TWO_PI),
      rotationSpeed: p.random(-0.05, 0.05),
      alpha: 0,
      targetAlpha: 255
    };
    
    newIcons.push(newIcon);
  }
  
  return newIcons;
};
