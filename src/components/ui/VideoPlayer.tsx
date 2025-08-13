'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  description: string;
  originalUrl: string;
  type: 'tiktok' | 'instagram';
  className?: string;
}

export default function VideoPlayer({ src, title, description, originalUrl, type, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      video.currentTime = 0;
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const openOriginal = () => {
    window.open(originalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={`relative group ${type === 'tiktok' ? 'aspect-[9/16]' : 'aspect-square'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
      onClick={() => setShowControls(!showControls)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover rounded-xl shadow-2xl bg-black"
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onLoadedData={() => {
          // Auto-play on mobile with user interaction
          if (videoRef.current) {
            videoRef.current.muted = true;
          }
        }}
      />

      {/* Platform Badge */}
      <div className="absolute top-3 right-3 z-20">
        <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
          <span className="text-white text-sm font-medium flex items-center gap-1">
            {type === 'tiktok' ? '🎵' : '📸'}
            {type === 'tiktok' ? 'TikTok' : 'Instagram'}
          </span>
        </div>
      </div>

      {/* Play/Pause Overlay */}
      {(!isPlaying || showControls || isHovered) && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Bottom Controls */}
      {(showControls || isHovered || !isPlaying) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 z-15">
          {/* Progress Bar */}
          <div
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-sinco-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white ml-0.5" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restart();
                }}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openOriginal();
              }}
              className="bg-sinco-primary/80 hover:bg-sinco-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              <span className="hidden sm:inline">View Original</span>
            </button>
          </div>
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-10">
        <h3 className="font-bold text-lg mb-1 drop-shadow-lg">{title}</h3>
        <p className="text-sm opacity-90 drop-shadow-lg line-clamp-2">{description}</p>
      </div>
    </div>
  );
}