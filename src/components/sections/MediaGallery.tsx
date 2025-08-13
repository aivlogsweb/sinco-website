'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, RefreshCw, Play, Pause } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { trackEvent } from '@/lib/utils';
import { detectDeviceCapabilities, getOptimalVideoSettings, type DeviceCapabilities } from '@/lib/deviceDetection';
import { trackVideoPerformance, logPerformanceError } from '@/lib/performanceMonitor';
import { useVideoThumbnail } from '@/lib/videoThumbnail';
import SocialEmbed from '@/components/ui/SocialEmbed';
import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer';
import VideoThumbnail from '@/components/ui/VideoThumbnail';

interface MediaItem {
  id: string;
  type: 'tiktok' | 'instagram' | 'image';
  url: string;
  embedId?: string;
  videoSrc?: string; // Local video file path
  title: string;
  description: string;
  category: 'featured' | 'gallery';
  createdAt: string;
}

export default function MediaGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize device detection
  useEffect(() => {
    setDeviceCapabilities(detectDeviceCapabilities());
  }, []);

  // Video controls
  const playVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      // Pause all other videos first
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
      video.play();
      setIsPlaying(true);
      setActiveVideoIndex(index);
    }
  }, []);

  const pauseVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Lazy load video when it comes into view
  const loadVideo = useCallback((index: number) => {
    if (!loadedVideos.has(index)) {
      const startTime = performance.now();
      setLoadedVideos(prev => new Set(prev).add(index));
      
      // Track video loading performance
      const video = videoRefs.current[index];
      if (video) {
        video.addEventListener('loadeddata', () => {
          // Get video source from mediaItems instead of currentContent
          const videoSrc = mediaItems[index]?.videoSrc || '';
          trackVideoPerformance(videoSrc, startTime);
        }, { once: true });
      }
    }
  }, [loadedVideos, mediaItems]);

  // Load content from admin panel
  useEffect(() => {
    const loadContent = () => {
      try {
        const saved = localStorage.getItem('sinco-media-content');
        if (saved) {
          const items = JSON.parse(saved);
          setMediaItems(items);
        } else {
          // Default content with local video files
          const defaultContent = [
            // TikTok Videos (Featured) - Using local MP4 files
            {
              id: 'tiktok-1',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7536555599962623240',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059732262.mp4',
              title: "Sinco's Morning Adventure",
              description: "Watch Sinco start the day with energy! 🐿️✨",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'tiktok-2',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7534039503653129490',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059763858.mp4',
              title: "Sinco's Playful Moments",
              description: "Pure squirrel joy and adorable antics 🌰",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'tiktok-3',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7537818276521348359',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059861723.mp4',
              title: "Sinco's Daily Adventures",
              description: "Another viral moment taking TikTok by storm! 🔥",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'tiktok-4',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7537683691410165000',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059890454.mp4',
              title: "Sinco's Forest Life",
              description: "Living the dream in nature's paradise 🌲",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'tiktok-5',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7537443380675005704',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059912013.mp4',
              title: "Sinco's Acrobatic Skills",
              description: "Watch those amazing squirrel moves! 🤸‍♂️",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'tiktok-6',
              type: 'tiktok' as const,
              url: 'https://www.tiktok.com/@sinco.00/video/7537048309555350791',
              videoSrc: '/videos/ssstik.io_@sinco.00_1755059935849.mp4',
              title: "Sinco's Social Hour",
              description: "Making friends and spreading joy everywhere! 💖",
              category: 'featured' as const,
              createdAt: new Date().toISOString()
            },
            // Instagram Posts (Gallery) - Placeholder for now
            {
              id: 'instagram-1',
              type: 'instagram' as const,
              url: 'https://www.instagram.com/sinco.00/reel/DNJVdPRNyzQ/',
              embedId: 'DNJVdPRNyzQ',
              title: "Sinco's Instagram Debut",
              description: "Latest content from our viral squirrel star 📸",
              category: 'gallery' as const,
              createdAt: new Date().toISOString()
            },
            {
              id: 'instagram-2',
              type: 'instagram' as const,
              url: 'https://www.instagram.com/sinco.00/reel/DNIwg11NjCK/',
              embedId: 'DNIwg11NjCK',
              title: "Sinco's Daily Stories",
              description: "Behind the scenes with everyone's favorite squirrel 🎬",
              category: 'gallery' as const,
              createdAt: new Date().toISOString()
            }
          ];
          setMediaItems(defaultContent);
          // Also save to localStorage for future admin panel use
          localStorage.setItem('sinco-media-content', JSON.stringify(defaultContent));
        }
      } catch (error) {
        console.error('Failed to load media content:', error);
        setMediaItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();

    // Listen for storage changes (when admin updates content)
    const handleStorageChange = () => {
      loadContent();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for manual refresh (reduced frequency for performance)
    const interval = setInterval(loadContent, 60000); // Refresh every minute

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          trackEvent('section_view', { section: 'media_gallery' });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const refreshContent = () => {
    setIsLoading(true);
    const saved = localStorage.getItem('sinco-media-content');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        setMediaItems(items);
      } catch (error) {
        console.error('Failed to refresh content:', error);
      }
    }
    setIsLoading(false);
  };

  const featuredContent = mediaItems.filter(item => item.category === 'featured');
  const currentContent = featuredContent; // Only show TikTok videos


  return (
    <section 
      id="media" 
      ref={sectionRef}
      className="py-20 px-4 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sinco-light to-sinco-primary mb-6">
            Viral Moments
          </h2>
          <p className="text-xl text-sinco-cream text-opacity-80 mb-8 max-w-2xl mx-auto">
            Experience Sinco's adorable moments that are taking social media by storm
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sinco-primary to-sinco-accent mx-auto rounded-full"></div>
        </div>



        {/* Content Grid */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
            <p>Loading content...</p>
          </div>
        ) : currentContent.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐿️</div>
            <h3 className="text-xl font-semibold text-sinco-primary mb-2">
              No TikTok content yet
            </h3>
            <p className="text-sinco-cream text-opacity-80 mb-6">
              Add content through the admin panel to see it here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admin"
                className="bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Admin Panel
              </a>
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <span>🎵</span>
                <span>View on TikTok</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Mobile-optimized single video player */}
            {deviceCapabilities?.isMobile ? (
              <div className="space-y-6">
                {/* Video Navigation */}
                <div className="flex justify-center items-center gap-4 mb-6">
                  <button
                    onClick={() => {
                      const prevIndex = activeVideoIndex > 0 ? activeVideoIndex - 1 : currentContent.length - 1;
                      setActiveVideoIndex(prevIndex);
                      setIsPlaying(false);
                    }}
                    className="p-3 bg-sinco-primary/20 hover:bg-sinco-primary/40 rounded-full transition-colors"
                    disabled={currentContent.length <= 1}
                  >
                    <span className="text-white text-xl">‹</span>
                  </button>
                  
                  <span className="text-sinco-cream text-sm px-4 py-2 bg-black/30 rounded-full">
                    {activeVideoIndex + 1} of {currentContent.length}
                  </span>
                  
                  <button
                    onClick={() => {
                      const nextIndex = activeVideoIndex < currentContent.length - 1 ? activeVideoIndex + 1 : 0;
                      setActiveVideoIndex(nextIndex);
                      setIsPlaying(false);
                    }}
                    className="p-3 bg-sinco-primary/20 hover:bg-sinco-primary/40 rounded-full transition-colors"
                    disabled={currentContent.length <= 1}
                  >
                    <span className="text-white text-xl">›</span>
                  </button>
                </div>
                
                {/* Single Active Video */}
                {currentContent[activeVideoIndex] && (
                  <div className="bg-forest-800/60 backdrop-blur-md rounded-xl p-6 border border-sinco-primary/30">
                    <h3 className="text-sinco-primary text-lg font-semibold mb-3">
                      {currentContent[activeVideoIndex].title}
                    </h3>
                    
                    <div className="relative aspect-[9/16] max-w-sm mx-auto mb-4">
                      {loadedVideos.has(activeVideoIndex) ? (
                        <video
                          ref={(el) => {
                            videoRefs.current[activeVideoIndex] = el;
                          }}
                          className="w-full h-full object-cover rounded-lg"
                          loop
                          muted={deviceCapabilities ? getOptimalVideoSettings(deviceCapabilities).muted : true}
                          playsInline={deviceCapabilities ? getOptimalVideoSettings(deviceCapabilities).playsInline : true}
                          preload={deviceCapabilities ? 
                            (loadedVideos.has(activeVideoIndex) ? getOptimalVideoSettings(deviceCapabilities).preload : "none") 
                            : "metadata"}
                          controls={deviceCapabilities?.isMobile || false}
                          onLoadStart={() => loadVideo(activeVideoIndex)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onError={(e) => {
                            console.warn('Video failed to load:', e);
                            logPerformanceError(new Error('Video load failed'), 'MediaGallery');
                            // Fallback: try to load next video or show error state
                          }}
                        >
                          <source src={currentContent[activeVideoIndex].videoSrc} type="video/mp4" />
                        </video>
                      ) : currentContent[activeVideoIndex].videoSrc ? (
                        <VideoThumbnail
                          videoSrc={currentContent[activeVideoIndex].videoSrc}
                          className="w-full h-full"
                          alt={currentContent[activeVideoIndex].title}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forest-900 to-forest-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-2">🐿️</div>
                            <p className="text-sinco-primary text-sm font-medium">SINCO</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Play/Pause Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => {
                            const video = videoRefs.current[activeVideoIndex];
                            if (video) {
                              if (isPlaying) {
                                video.pause();
                              } else {
                                if (!loadedVideos.has(activeVideoIndex)) {
                                  loadVideo(activeVideoIndex);
                                }
                                video.play();
                              }
                            }
                          }}
                          className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                        >
                          {isPlaying && activeVideoIndex === activeVideoIndex ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sinco-cream/80 text-sm mb-4">
                      {currentContent[activeVideoIndex].description}
                    </p>
                    
                    <a
                      href={currentContent[activeVideoIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sinco-primary hover:text-sinco-secondary text-sm font-medium"
                    >
                      View on TikTok <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Grid - Load videos on demand */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentContent.map((item, index) => (
                  <div key={item.id} className="bg-forest-800/60 backdrop-blur-md rounded-xl p-4 border border-sinco-primary/30 hover:border-sinco-primary/50 transition-all">
                    {item.videoSrc ? (
                      <div>
                        <h3 className="text-sinco-primary text-lg font-semibold mb-3">{item.title}</h3>
                        <div className="relative aspect-[9/16] mb-3">
                          {loadedVideos.has(index) ? (
                            <video
                              ref={(el) => {
                                videoRefs.current[index] = el;
                              }}
                              className="w-full h-full object-cover rounded-lg"
                              loop
                              muted
                              playsInline
                              preload={loadedVideos.has(index) ? "metadata" : "none"}
                              onClick={() => {
                                const video = videoRefs.current[index];
                                if (video) {
                                  if (video.paused) {
                                    playVideo(index);
                                  } else {
                                    pauseVideo(index);
                                  }
                                }
                              }}
                            >
                              <source src={item.videoSrc} type="video/mp4" />
                            </video>
                          ) : item.videoSrc ? (
                            <VideoThumbnail
                              videoSrc={item.videoSrc}
                              className="w-full h-full"
                              alt={item.title}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-forest-900 to-forest-800 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl mb-2">🐿️</div>
                                <p className="text-sinco-primary text-sm font-medium">SINCO</p>
                              </div>
                            </div>
                          )}
                          
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                              onClick={() => {
                                if (!loadedVideos.has(index)) {
                                  loadVideo(index);
                                }
                                playVideo(index);
                              }}
                            >
                              <Play className="w-6 h-6 text-white ml-0.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sinco-cream/80 text-sm mb-3">{item.description}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sinco-primary hover:text-sinco-secondary text-sm font-medium"
                        >
                          View Original <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ) : (
                      <div className="aspect-[9/16] flex items-center justify-center text-white bg-forest-700 rounded-lg">
                        Instagram: {item.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="content-card inline-block p-8">
            <h3 className="text-2xl font-bold text-sinco-primary mb-4">
              Ready to join the viral movement?
            </h3>
            <p className="text-sinco-cream text-opacity-80 mb-6">
              Follow @sinco.00 on both platforms for exclusive behind-the-scenes content, daily posts, and live updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                onClick={() => trackEvent('cta_click', { platform: 'tiktok', location: 'media_gallery' })}
              >
                <span>🎵</span>
                <span>More on TikTok</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                onClick={() => trackEvent('cta_click', { platform: 'instagram', location: 'media_gallery' })}
              >
                <span>📸</span>
                <span>More on Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 bg-sinco-accent bg-opacity-5 rounded-full blur-2xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-sinco-primary bg-opacity-10 rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
    </section>
  );
}