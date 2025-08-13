/**
 * Simple test for video thumbnail generation
 * This file can be used to test the thumbnail generation functionality
 */

import { getThumbnailGenerator } from './videoThumbnail';

// Test function to verify thumbnail generation
export const testThumbnailGeneration = async () => {
  const generator = getThumbnailGenerator();
  
  // Test video sources from the MediaGallery
  const testVideos = [
    '/videos/ssstik.io_@sinco.00_1755059732262.mp4',
    '/videos/ssstik.io_@sinco.00_1755059763858.mp4',
    '/videos/ssstik.io_@sinco.00_1755059861723.mp4',
    '/videos/ssstik.io_@sinco.00_1755059890454.mp4',
    '/videos/ssstik.io_@sinco.00_1755059912013.mp4',
    '/videos/ssstik.io_@sinco.00_1755059935849.mp4'
  ];

  console.log('🧪 Testing video thumbnail generation...');
  
  for (const videoSrc of testVideos) {
    try {
      console.log(`📹 Generating thumbnail for: ${videoSrc}`);
      const startTime = performance.now();
      
      const thumbnail = await generator.getThumbnail(videoSrc);
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`✅ Thumbnail generated in ${duration.toFixed(2)}ms`);
      console.log(`📊 Thumbnail size: ${thumbnail.length} characters`);
      
      // Verify it's a valid data URL
      if (thumbnail.startsWith('data:image/')) {
        console.log('✅ Valid data URL format');
      } else {
        console.log('❌ Invalid data URL format');
      }
      
    } catch (error) {
      console.error(`❌ Failed to generate thumbnail for ${videoSrc}:`, error);
    }
  }
  
  console.log(`📊 Cache size: ${generator.getCacheSize()} thumbnails`);
  console.log('🎉 Thumbnail generation test complete!');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testThumbnailGeneration = testThumbnailGeneration;
}





