'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { trackEvent } from '@/lib/utils';
import SocialEmbed from '@/components/ui/SocialEmbed';
import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer';

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
  const sectionRef = useRef<HTMLElement>(null);

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
    
    // Also listen for manual refresh
    const interval = setInterval(loadContent, 30000); // Refresh every 30 seconds

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '0 20px' }}>
            {currentContent.map((item, index) => (
              <div key={item.id} style={{ backgroundColor: '#1a4a2e', padding: '15px', borderRadius: '8px' }}>
                {item.videoSrc ? (
                  <div>
                    <h3 style={{ color: '#22c55e', marginBottom: '10px', fontSize: '16px' }}>{item.title}</h3>
                    <video
                      style={{ 
                        width: '100%', 
                        height: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px' 
                      }}
                      loop
                      muted
                      playsInline
                      autoPlay
                    >
                      <source src={item.videoSrc} type="video/mp4" />
                      Video not supported.
                    </video>
                    <p style={{ color: '#a3a3a3', fontSize: '14px', marginTop: '8px' }}>{item.description}</p>
                  </div>
                ) : (
                  <div style={{ color: 'white', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Instagram: {item.title}
                  </div>
                )}
              </div>
            ))}
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