'use client';

import { useVideoThumbnail } from '@/lib/videoThumbnail';

interface VideoThumbnailProps {
  videoSrc: string;
  className?: string;
  alt?: string;
}

export default function VideoThumbnail({ videoSrc, className = '', alt = 'Video thumbnail' }: VideoThumbnailProps) {
  const { thumbnail, isLoading, error } = useVideoThumbnail(videoSrc);

  if (isLoading) {
    return (
      <div className={`bg-forest-800/50 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-sinco-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sinco-cream/60 text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !thumbnail) {
    return (
      <div className={`bg-gradient-to-br from-forest-900 to-forest-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-2xl mb-2">🐿️</div>
          <p className="text-sinco-primary text-sm font-medium">SINCO</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={thumbnail}
      alt={alt}
      className={`w-full h-full object-cover rounded-lg ${className}`}
      loading="lazy"
    />
  );
}





