
// Configuration for the p5 social icons sketch
export const SKETCH_CONFIG = {
  NUM_ICONS: 15,
  MAX_SPEED: 1.5,
  FRICTION: 0.98,
  ICON_MIN_SIZE: 30,
  ICON_MAX_SIZE: 60,
  // New configuration for autonomous movement
  DIRECTION_CHANGE_CHANCE: 0.02, // Probability of changing direction each frame
  MIN_VELOCITY: 0.5,             // Minimum velocity
  MAX_VELOCITY: 1.2,             // Maximum velocity
  // Configuration for click interactions
  CLICK_BURST_COUNT: 6,          // Number of icons created on click
  CLICK_BURST_SPEED: 3.5         // Initial speed of icons created on click
};
