'use client';

import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

interface SocialEmbedProps {
  type: 'tiktok' | 'instagram' | 'image';
  url: string;
  embedId?: string;
  title: string;
  description?: string;
  onError?: () => void;
}

export default function SocialEmbed({ type, url, embedId, title, description, onError }: SocialEmbedProps) {
  const openOriginal = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Try iframe with immediate fallback on mobile
  const [useIframe, setUseIframe] = useState(true);
  const [iframeFailed, setIframeFailed] = useState(false);
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // For TikTok - try iframe first, fallback if fails
  if (type === 'tiktok') {
    if (isMobile || iframeFailed || !useIframe) {
      return <TikTokFallback url={url} title={title} description={description} />;
    }

    return (
      <div className="relative group">
        <div className="aspect-[9/16] max-h-[400px] w-full max-w-[280px] mx-auto relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-gray-900 shadow-2xl">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${embedId}`}
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onError={() => {
              setIframeFailed(true);
              setUseIframe(false);
            }}
            onLoad={() => {
              // Check if iframe actually loaded content
              setTimeout(() => {
                const iframe = document.querySelector('iframe[src*="tiktok"]') as HTMLIFrameElement;
                if (iframe && iframe.contentDocument === null) {
                  setIframeFailed(true);
                  setUseIframe(false);
                }
              }, 2000);
            }}
            style={{ pointerEvents: 'auto' }}
            scrolling="no"
            frameBorder="0"
          />
        </div>
        
        {/* Fallback button */}
        <div className="mt-3 text-center">
          <button
            onClick={openOriginal}
            className="text-sm text-sinco-primary hover:text-sinco-light transition-colors flex items-center gap-1 mx-auto"
          >
            <ExternalLink className="w-3 h-3" />
            View on TikTok
          </button>
        </div>
      </div>
    );
  }

  // For Instagram - similar approach
  if (type === 'instagram') {
    if (isMobile || iframeFailed || !useIframe) {
      return <InstagramFallback url={url} title={title} description={description} />;
    }

    return (
      <div className="relative group">
        <div className="aspect-square w-full max-w-[320px] mx-auto relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-100 shadow-2xl">
          <iframe
            src={`https://www.instagram.com/p/${embedId}/embed/captioned/`}
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
            onError={() => {
              setIframeFailed(true);
              setUseIframe(false);
            }}
            scrolling="no"
            frameBorder="0"
          />
        </div>
        
        <div className="mt-3 text-center">
          <button
            onClick={openOriginal}
            className="text-sm text-sinco-primary hover:text-sinco-light transition-colors flex items-center gap-1 mx-auto"
          >
            <ExternalLink className="w-3 h-3" />
            View on Instagram
          </button>
        </div>
      </div>
    );
  }

  // For images
  if (type === 'image') {
    return (
      <div className="relative group cursor-pointer" onClick={openOriginal}>
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover rounded-xl shadow-2xl"
        />
      </div>
    );
  }

  // Generic fallback
  return (
    <div className="aspect-square bg-forest-800 bg-opacity-60 rounded-xl flex items-center justify-center cursor-pointer" onClick={openOriginal}>
      <div className="text-center text-sinco-cream p-4">
        <ExternalLink className="w-8 h-8 mx-auto mb-2 text-sinco-primary" />
        <h3 className="font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-opacity-80 mb-4">{description}</p>}
        <span className="text-sinco-primary text-sm">Tap to view</span>
      </div>
    </div>
  );
}

// TikTok-styled fallback component
function TikTokFallback({ url, title, description }: { url: string; title: string; description?: string }) {
  return (
    <div 
      className="aspect-[9/16] max-h-[400px] w-full max-w-[280px] mx-auto bg-gradient-to-br from-black via-gray-900 to-black rounded-xl flex items-center justify-center cursor-pointer group relative overflow-hidden shadow-2xl border border-sinco-primary/30"
      onClick={() => window.open(url, '_blank')}
    >
      {/* TikTok-style background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/15 to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,150,0.1),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(0,150,255,0.1),transparent_50%)]"></div>
      
      <div className="text-center text-white p-6 relative z-10">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sinco-primary/30 to-sinco-secondary/30 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300 border border-white/20">
          <Play className="w-10 h-10 text-white ml-1" />
        </div>
        <h3 className="font-bold text-lg mb-3 text-shadow">🎵 {title}</h3>
        {description && <p className="text-sm text-white/90 mb-6 leading-relaxed">{description}</p>}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium group-hover:bg-white/20 transition-colors">
          <ExternalLink className="w-3 h-3" />
          <span>Watch on TikTok</span>
        </div>
      </div>
    </div>
  );
}

// Instagram-styled fallback component  
function InstagramFallback({ url, title, description }: { url: string; title: string; description?: string }) {
  return (
    <div 
      className="aspect-square w-full max-w-[320px] mx-auto bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center cursor-pointer group relative overflow-hidden shadow-2xl border border-sinco-primary/30"
      onClick={() => window.open(url, '_blank')}
    >
      {/* Instagram-style overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/10"></div>
      
      <div className="text-center text-white p-6 relative z-10">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-all duration-300 border border-white/30">
          <span className="text-3xl">📸</span>
        </div>
        <h3 className="font-bold text-lg mb-3 text-shadow">{title}</h3>
        {description && <p className="text-sm text-white/90 mb-6 leading-relaxed">{description}</p>}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium group-hover:bg-white/20 transition-colors">
          <ExternalLink className="w-3 h-3" />
          <span>View on Instagram</span>
        </div>
      </div>
    </div>
  );
}