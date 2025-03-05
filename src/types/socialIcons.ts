
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
  vx?: number; // Velocity X - used in mouse interactions
  vy?: number; // Velocity Y - used in mouse interactions
  rotation?: number; // Rotation angle
  rotationSpeed?: number; // Speed of rotation
  image?: any; // Image object for the icon
  alpha?: number; // Alpha/opacity for drawing
  targetAlpha?: number; // Target alpha for animations
  isColliding?: boolean; // Tracks if icon is currently colliding
  collisionTimer?: number; // Timer for collision effect duration
  originalColor?: string; // Original color to return to after collision
  scale?: number; // Scale factor for pop-up animation
  targetScale?: number; // Target scale for animation
  popAnimationActive?: boolean; // Whether icon is currently doing a pop animation
}
