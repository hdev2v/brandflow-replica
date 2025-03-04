
import p5 from 'p5';
import { socialPlatforms } from '@/config/socialPlatforms';

interface ImageLoaderResult {
  logoImages: Record<string, p5.Image>;
  loadedImages: Record<string, boolean>;
}

// Helper to preload all social platform images
export const preloadImages = (
  p: p5, 
  onLoadingChange: (loading: boolean) => void
): ImageLoaderResult => {
  const logoImages: Record<string, p5.Image> = {};
  const loadedImages: Record<string, boolean> = {};
  
  // Function to check if all images have been processed
  const checkAllImagesLoaded = () => {
    if (Object.keys(loadedImages).length === socialPlatforms.length) {
      onLoadingChange(false);
    }
  };
  
  // Load each platform image
  socialPlatforms.forEach(platform => {
    try {
      logoImages[platform.platform] = p.loadImage(
        `/social-icons/${platform.platform}.png`, 
        // Success callback
        () => {
          loadedImages[platform.platform] = true;
          console.log(`Loaded ${platform.platform} image`);
          checkAllImagesLoaded();
        },
        // Error callback
        () => {
          console.log(`Failed to load ${platform.platform} image, using fallback`);
          loadedImages[platform.platform] = false;
          checkAllImagesLoaded();
        }
      );
    } catch (error) {
      console.error(`Error loading ${platform.platform}:`, error);
      loadedImages[platform.platform] = false;
      checkAllImagesLoaded();
    }
  });
  
  return { logoImages, loadedImages };
};
