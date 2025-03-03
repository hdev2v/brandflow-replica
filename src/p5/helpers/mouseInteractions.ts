
import p5 from 'p5';
import { SocialIcon } from '@/types/socialIcons';

// Repel icons from mouse cursor
export const applyMouseRepulsion = (icon: SocialIcon, mouseX: number, mouseY: number, p: p5, serviceCards: any[]) => {
  const mouseRepelDistance = 120;
  const repelForce = 2;
  
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

  // Avoid service cards if any are provided
  if (serviceCards && serviceCards.length > 0) {
    for (const card of serviceCards) {
      // Calculate if icon is inside or close to the card
      if (
        icon.x > card.x - 20 && 
        icon.x < card.x + card.width + 20 && 
        icon.y > card.y - 20 && 
        icon.y < card.y + card.height + 20
      ) {
        // Find the closest edge to push away from
        const edgeDistances = [
          { edge: 'left', dist: Math.abs(icon.x - card.x) },
          { edge: 'right', dist: Math.abs(icon.x - (card.x + card.width)) },
          { edge: 'top', dist: Math.abs(icon.y - card.y) },
          { edge: 'bottom', dist: Math.abs(icon.y - (card.y + card.height)) }
        ];
        
        // Sort to find closest edge
        edgeDistances.sort((a, b) => a.dist - b.dist);
        const closestEdge = edgeDistances[0].edge;
        
        // Apply force based on closest edge
        const pushForce = 1.5;
        switch (closestEdge) {
          case 'left':
            icon.vx -= pushForce;
            break;
          case 'right':
            icon.vx += pushForce;
            break;
          case 'top':
            icon.vy -= pushForce;
            break;
          case 'bottom':
            icon.vy += pushForce;
            break;
        }
      }
    }
  }
};

// Apply targeting towards a card when hovering
export const applyCardTargeting = (icon: SocialIcon, hoveredCard: any, p: p5) => {
  if (!hoveredCard) return;
  
  const targetX = hoveredCard.x + hoveredCard.width / 2;
  const targetY = hoveredCard.y + hoveredCard.height / 2;
  
  // Calculate distance to target
  const d = p.dist(icon.x, icon.y, targetX, targetY);
  
  // Only apply targeting if within reasonable distance
  if (d < 300) {
    const angle = p.atan2(targetY - icon.y, targetX - icon.x);
    const force = p.map(d, 0, 300, 0, 0.5); // Gentle force
    
    icon.vx += p.cos(angle) * force;
    icon.vy += p.sin(angle) * force;
  }
};

// Create new icons at a position (for mouse click)
export const createIconsAtPosition = (p: p5, x: number, y: number, iconImages: p5.Image[], numIcons = 5) => {
  const newIcons: SocialIcon[] = [];
  
  for (let i = 0; i < numIcons; i++) {
    const randomImage = iconImages[Math.floor(p.random(0, iconImages.length))];
    const randomSize = p.random(24, 40);
    const randomAngle = p.random(0, p.TWO_PI);
    const randomSpeed = p.random(2, 5);
    
    const newIcon: SocialIcon = {
      x: x,
      y: y,
      vx: p.cos(randomAngle) * randomSpeed,
      vy: p.sin(randomAngle) * randomSpeed,
      size: randomSize,
      rotation: p.random(0, p.TWO_PI),
      rotationSpeed: p.random(-0.05, 0.05),
      image: randomImage,
      alpha: 0,
      targetAlpha: 255
    };
    
    newIcons.push(newIcon);
  }
  
  return newIcons;
};
