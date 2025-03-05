
// Re-export helper functions selectively to avoid naming conflicts
export * from './iconAnimation';
export * from './iconRendering';
export * from './imageLoader';
export * from './mouseInteractions';

// Export from iconCreation explicitly to avoid duplicate exports
export { 
  createIcon,
  initializeIcons,
  createIconsAtPosition
} from './iconCreation';
