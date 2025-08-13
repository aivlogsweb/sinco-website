/**
 * Video Thumbnail Generator
 * Captures the first frame of videos to use as poster images
 */

export interface VideoThumbnail {
  videoSrc: string;
  thumbnailDataUrl: string;
  timestamp: number;
}

class VideoThumbnailGenerator {
  private thumbnails: Map<string, string> = new Map();
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeCanvas();
    }
  }

  private initializeCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 200;
    this.canvas.height = 356; // 9:16 aspect ratio
    this.context = this.canvas.getContext('2d');
  }

  /**
   * Generate thumbnail for a video by capturing the first frame
   */
  public async generateThumbnail(videoSrc: string): Promise<string> {
    // Check if we already have this thumbnail cached
    if (this.thumbnails.has(videoSrc)) {
      return this.thumbnails.get(videoSrc)!;
    }

    return new Promise((resolve, reject) => {
      if (!this.canvas || !this.context) {
        reject(new Error('Canvas not initialized'));
        return;
      }

      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';

      // Set up video event handlers
      video.onloadedmetadata = () => {
        try {
          // Seek to 0.1 seconds to get a good frame (not black)
          video.currentTime = 0.1;
        } catch (e) {
          // If seeking fails, try 0 seconds
          video.currentTime = 0;
        }
      };

      video.onseeked = () => {
        try {
          // Draw the video frame to canvas
          this.context!.drawImage(video, 0, 0, this.canvas!.width, this.canvas!.height);
          
          // Convert canvas to data URL
          const thumbnailDataUrl = this.canvas!.toDataURL('image/jpeg', 0.8);
          
          // Cache the thumbnail
          this.thumbnails.set(videoSrc, thumbnailDataUrl);
          
          // Clean up
          video.remove();
          
          resolve(thumbnailDataUrl);
        } catch (e) {
          video.remove();
          reject(e);
        }
      };

      video.onerror = () => {
        video.remove();
        reject(new Error(`Failed to load video: ${videoSrc}`));
      };

      // Set a timeout in case the video doesn't load
      setTimeout(() => {
        video.remove();
        reject(new Error('Video thumbnail generation timeout'));
      }, 10000);

      // Start loading the video
      video.src = videoSrc;
    });
  }

  /**
   * Get cached thumbnail or generate new one
   */
  public async getThumbnail(videoSrc: string): Promise<string> {
    try {
      return await this.generateThumbnail(videoSrc);
    } catch (error) {
      console.warn('Failed to generate thumbnail for:', videoSrc, error);
      // Return a fallback thumbnail
      return this.getFallbackThumbnail();
    }
  }

  /**
   * Get a fallback thumbnail when video thumbnail generation fails
   */
  private getFallbackThumbnail(): string {
    // Create a nice fallback thumbnail with SINCO branding
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 356;
    const ctx = canvas.getContext('2d')!;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 356);
    gradient.addColorStop(0, '#1a4a2e');
    gradient.addColorStop(1, '#0f2e1f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 356);

    // Add some forest-themed elements
    ctx.fillStyle = '#22c55e';
    ctx.globalAlpha = 0.3;
    
    // Draw some leaf-like shapes
    for (let i = 0; i < 5; i++) {
      const x = 20 + i * 40;
      const y = 50 + i * 60;
      ctx.beginPath();
      ctx.ellipse(x, y, 15, 8, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Add SINCO text
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SINCO', 100, 178);

    // Add subtitle
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = '#86efac';
    ctx.fillText('🐿️', 100, 220);

    return canvas.toDataURL('image/jpeg', 0.9);
  }

  /**
   * Clear all cached thumbnails
   */
  public clearCache(): void {
    this.thumbnails.clear();
  }

  /**
   * Get cache size
   */
  public getCacheSize(): number {
    return this.thumbnails.size;
  }
}

// Singleton instance
let thumbnailGenerator: VideoThumbnailGenerator | null = null;

export const getThumbnailGenerator = (): VideoThumbnailGenerator => {
  if (!thumbnailGenerator) {
    thumbnailGenerator = new VideoThumbnailGenerator();
  }
  return thumbnailGenerator;
};

import { useState, useEffect } from 'react';

/**
 * React hook for video thumbnails
 */
export const useVideoThumbnail = (videoSrc: string) => {
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoSrc) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const generator = getThumbnailGenerator();
    generator.getThumbnail(videoSrc)
      .then(setThumbnail)
      .catch((err) => {
        setError(err.message);
        console.warn('Thumbnail generation failed:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [videoSrc]);

  return { thumbnail, isLoading, error };
};
