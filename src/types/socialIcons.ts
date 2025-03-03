
// Types for social icons
export interface SocialIcon {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  platform: string;
  targetX?: number; // Target X position for gathering
  targetY?: number; // Target Y position for gathering
  isTargeting: boolean; // Whether icon is currently targeting
}
