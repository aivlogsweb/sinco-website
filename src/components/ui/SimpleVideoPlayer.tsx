'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface SimpleVideoPlayerProps {
  src: string;
  title: string;
  description: string;
  originalUrl: string;
  type: 'tiktok' | 'instagram';
}

export default function SimpleVideoPlayer({ src, title, description, originalUrl, type }: SimpleVideoPlayerProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`${type === 'tiktok' ? 'aspect-[9/16]' : 'aspect-square'} bg-gradient-to-br ${
        type === 'tiktok' 
          ? 'from-pink-500/20 via-purple-500/20 to-blue-500/20' 
          : 'from-purple-600/20 via-pink-500/20 to-orange-400/20'
      } rounded-xl flex items-center justify-center cursor-pointer group`}
      onClick={() => window.open(originalUrl, '_blank')}
      >
        <div className="text-center text-white p-4">
          <div className="text-4xl mb-2">{type === 'tiktok' ? '🎵' : '📸'}</div>
          <h3 className="font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90 mb-4">{description}</p>
          <div className="flex items-center gap-1 justify-center text-sm">
            <ExternalLink className="w-4 h-4" />
            <span>View on {type === 'tiktok' ? 'TikTok' : 'Instagram'}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${type === 'tiktok' ? 'aspect-[9/16]' : 'aspect-square'}`}>
      <video
        className="w-full h-full object-cover rounded-xl"
        loop
        muted
        playsInline
        preload="metadata"
        autoPlay
        onError={() => setHasError(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Platform Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">
            {type === 'tiktok' ? '🎵 TikTok' : '📸 Instagram'}
          </span>
        </div>
      </div>

      {/* Original Link */}
      <div className="absolute bottom-3 right-3 z-10">
        <button
          onClick={() => window.open(originalUrl, '_blank')}
          className="bg-sinco-primary/80 hover:bg-sinco-primary text-white px-2 py-1 rounded text-xs flex items-center gap-1 transition-all"
        >
          <ExternalLink className="w-3 h-3" />
          <span className="hidden sm:inline">Original</span>
        </button>
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h3 className="font-bold text-sm mb-1">{title}</h3>
        <p className="text-xs opacity-90 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}