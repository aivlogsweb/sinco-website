'use client';

import { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { debugLogger } from '@/components/debug/DebugLogger';

interface MediaItem {
  id: string;
  type: 'tiktok' | 'instagram' | 'image';
  url: string;
  embedId?: string;
  title: string;
  description: string;
  category: 'featured' | 'gallery';
  createdAt: string;
}

// Simple, safe embed component
function SafeEmbed({ item }: { item: MediaItem }) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    debugLogger.log('info', 'SafeEmbed', `Rendering ${item.type} embed`, { 
      id: item.id, 
      url: item.url, 
      embedId: item.embedId 
    });
  }, [item]);

  const handleView = () => {
    debugLogger.log('info', 'SafeEmbed', 'Opening original URL', item.url);
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  // For now, let's use a simple card approach instead of iframes
  return (
    <div className="bg-gradient-to-br from-forest-900/60 to-forest-800/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-sinco-primary/30 shadow-2xl hover:shadow-sinco-primary/20 hover:border-sinco-primary/50 transition-all duration-500">
      {/* Preview Card */}
      <div 
        className={`${item.type === 'tiktok' ? 'aspect-[9/16]' : 'aspect-square'} bg-gradient-to-br ${
          item.type === 'tiktok' 
            ? 'from-pink-500/20 via-purple-500/20 to-blue-500/20' 
            : 'from-purple-600/20 via-pink-500/20 to-orange-400/20'
        } flex items-center justify-center cursor-pointer group relative`}
        onClick={handleView}
      >
        {/* Platform Icon */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 border border-white/20">
            <span className="text-lg">
              {item.type === 'tiktok' ? '🎵' : '📸'}
            </span>
          </div>
        </div>

        {/* Play Button */}
        <div className="text-center text-white">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-sm opacity-90 px-4">{item.description}</p>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-sinco-cream/60 font-medium">
            {new Date(item.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={handleView}
            className="flex items-center gap-2 bg-sinco-primary/20 hover:bg-sinco-primary hover:text-white text-sinco-primary px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
          >
            <ExternalLink className="w-3 h-3" />
            <span>View on {item.type === 'tiktok' ? 'TikTok' : 'Instagram'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MediaGalleryV2() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'featured' | 'gallery'>('featured');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderAttempt, setRenderAttempt] = useState(0);

  // Client-side only initialization
  useEffect(() => {
    debugLogger.log('info', 'MediaGalleryV2', 'Component mounting');
    
    const initializeComponent = async () => {
      try {
        // Wait a bit to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        debugLogger.log('info', 'MediaGalleryV2', 'Setting client state to true');
        setIsClient(true);
        
        // Load content
        await loadContent();
        
      } catch (err) {
        debugLogger.log('error', 'MediaGalleryV2', 'Initialization failed', err);
        setError(`Initialization failed: ${err}`);
      }
    };

    initializeComponent();
  }, []);

  const loadContent = async () => {
    try {
      debugLogger.log('info', 'MediaGalleryV2', 'Starting content load');
      setIsLoading(true);
      setError(null);

      // Check localStorage
      let items: MediaItem[] = [];
      const saved = localStorage.getItem('sinco-media-content');
      
      if (saved) {
        debugLogger.log('info', 'MediaGalleryV2', 'Found saved content in localStorage');
        items = JSON.parse(saved);
      } else {
        debugLogger.log('info', 'MediaGalleryV2', 'No saved content, creating default');
        items = createDefaultContent();
        localStorage.setItem('sinco-media-content', JSON.stringify(items));
      }

      debugLogger.log('info', 'MediaGalleryV2', `Loaded ${items.length} items`, {
        featured: items.filter(i => i.category === 'featured').length,
        gallery: items.filter(i => i.category === 'gallery').length
      });

      setMediaItems(items);
      setIsLoading(false);

    } catch (err) {
      debugLogger.log('error', 'MediaGalleryV2', 'Content loading failed', err);
      setError(`Failed to load content: ${err}`);
      setIsLoading(false);
    }
  };

  const createDefaultContent = (): MediaItem[] => {
    debugLogger.log('info', 'MediaGalleryV2', 'Creating default content');
    
    return [
      // TikTok content (featured)
      {
        id: 'tiktok-1',
        type: 'tiktok' as const,
        url: 'https://www.tiktok.com/@sinco.00/video/7536555599962623240',
        embedId: '7536555599962623240',
        title: "Sinco's Morning Adventure",
        description: "Watch Sinco start the day with energy!",
        category: 'featured' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: 'tiktok-2',
        type: 'tiktok' as const,
        url: 'https://www.tiktok.com/@sinco.00/video/7534039503653129490',
        embedId: '7534039503653129490',
        title: "Playful Sinco Moments",
        description: "Sinco being adorable as always",
        category: 'featured' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: 'tiktok-3',
        type: 'tiktok' as const,
        url: 'https://www.tiktok.com/@sinco.00/video/7537818276521348359',
        embedId: '7537818276521348359',
        title: "Sinco's Daily Fun",
        description: "Another viral moment from our favorite squirrel",
        category: 'featured' as const,
        createdAt: new Date().toISOString()
      },
      // Instagram content (gallery)
      {
        id: 'instagram-1',
        type: 'instagram' as const,
        url: 'https://www.instagram.com/sinco.00/reel/DNJVdPRNyzQ/',
        embedId: 'DNJVdPRNyzQ',
        title: "Sinco's Instagram Debut",
        description: "Latest reel from our viral squirrel star",
        category: 'gallery' as const,
        createdAt: new Date().toISOString()
      },
      {
        id: 'instagram-2',
        type: 'instagram' as const,
        url: 'https://www.instagram.com/sinco.00/reel/DNIwg11NjCK/',
        embedId: 'DNIwg11NjCK',
        title: "Sinco's Daily Adventures",
        description: "Behind the scenes with Sinco",
        category: 'gallery' as const,
        createdAt: new Date().toISOString()
      }
    ];
  };

  const featuredContent = mediaItems.filter(item => item.category === 'featured');
  const galleryContent = mediaItems.filter(item => item.category === 'gallery');
  const currentContent = activeTab === 'featured' ? featuredContent : galleryContent;

  debugLogger.log('info', 'MediaGalleryV2', 'Render state', {
    isClient,
    isLoading,
    error,
    activeTab,
    mediaItemsCount: mediaItems.length,
    currentContentCount: currentContent.length,
    renderAttempt
  });

  // Don't render anything until client is ready
  if (!isClient) {
    return (
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sinco-light to-sinco-primary mb-6">
            Viral Moments
          </h2>
          <div className="text-xl text-sinco-cream text-opacity-80 mb-8">
            Initializing...
          </div>
          <div className="w-8 h-8 border-2 border-sinco-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="media" className="py-20 px-4 relative">
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

        {/* Debug Info */}
        <div className="text-center mb-8">
          <div className="inline-block bg-forest-800/50 px-4 py-2 rounded-lg text-xs text-sinco-accent">
            Status: {isLoading ? 'Loading' : error ? 'Error' : 'Ready'} | 
            Items: {mediaItems.length} | 
            Current: {currentContent.length} |
            Tab: {activeTab} |
            Client: {isClient ? 'Yes' : 'No'}
            {error && ` | Error: ${error}`}
          </div>
        </div>

        {/* Tab Navigation - Always visible */}
        <div className="flex justify-center mb-16">
          <div className="bg-gradient-to-r from-forest-900/90 to-forest-800/90 backdrop-blur-xl rounded-2xl p-1.5 border border-sinco-primary/40 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <button
                onClick={() => {
                  debugLogger.log('info', 'MediaGalleryV2', 'Tab clicked: featured');
                  setActiveTab('featured');
                }}
                className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-500 flex items-center gap-3 w-full sm:w-auto justify-center ${
                  activeTab === 'featured'
                    ? 'bg-gradient-to-r from-sinco-primary to-sinco-secondary text-white shadow-xl border border-sinco-light/30'
                    : 'text-sinco-cream/80 hover:text-white hover:bg-sinco-primary/20'
                }`}
              >
                <span className="text-xl">🎵</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">TikTok Viral</span>
                  <span className="text-xs opacity-75">{featuredContent.length} videos</span>
                </div>
              </button>
              
              <button
                onClick={() => {
                  debugLogger.log('info', 'MediaGalleryV2', 'Tab clicked: gallery');
                  setActiveTab('gallery');
                }}
                className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-500 flex items-center gap-3 w-full sm:w-auto justify-center ${
                  activeTab === 'gallery'
                    ? 'bg-gradient-to-r from-sinco-primary to-sinco-secondary text-white shadow-xl border border-sinco-light/30'
                    : 'text-sinco-cream/80 hover:text-white hover:bg-sinco-primary/20'
                }`}
              >
                <span className="text-xl">📸</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">Instagram Feed</span>
                  <span className="text-xs opacity-75">{galleryContent.length} videos</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              debugLogger.log('info', 'MediaGalleryV2', 'Refresh clicked');
              setRenderAttempt(prev => prev + 1);
              loadContent();
            }}
            disabled={isLoading}
            className="flex items-center gap-2 text-sinco-cream text-opacity-60 hover:text-sinco-primary transition-colors text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Content
          </button>
        </div>

        {/* Content */}
        {error ? (
          <div className="text-center py-16">
            <div className="text-red-400 mb-4">❌ Error loading content</div>
            <div className="text-sm text-sinco-cream/60 mb-4">{error}</div>
            <button
              onClick={() => {
                debugLogger.log('info', 'MediaGalleryV2', 'Retry clicked');
                loadContent();
              }}
              className="bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Retry
            </button>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center text-sinco-cream">
              <div className="w-8 h-8 border-2 border-sinco-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading content...</p>
            </div>
          </div>
        ) : currentContent.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🐿️</div>
            <h3 className="text-xl font-semibold text-sinco-primary mb-2">
              No content in {activeTab === 'featured' ? 'TikTok' : 'Instagram'} section
            </h3>
            <p className="text-sinco-cream text-opacity-80 mb-6">
              Content will appear here when available!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-4 sm:px-0">
            {currentContent.map((item, index) => {
              debugLogger.log('info', 'MediaGalleryV2', `Rendering item ${index}`, item.id);
              return (
                <div key={`${activeTab}-${item.id}-${renderAttempt}`} className="w-full">
                  <SafeEmbed item={item} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}