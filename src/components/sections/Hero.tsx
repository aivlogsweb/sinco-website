'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig, textContent } from '@/data/config';
import CopyButton from '@/components/ui/CopyButton';
import { trackEvent, truncateAddress } from '@/lib/utils';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    trackEvent('page_view', { section: 'hero' });
  }, []);

  const scrollToContent = () => {
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      trackEvent('scroll_to_section', { target: 'about' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Hero Content */}
      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Squirrel Image */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              {/* Featured Squirrel Image */}
              <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-sinco-primary border-opacity-60 shadow-2xl hover:scale-105 transition-all duration-500">
                <img 
                  src="/images/sinco-squirrel.jpg" 
                  alt="Sinco the adorable viral squirrel"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with play icon for TikTok feel */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-6xl">🎵</div>
                </div>
              </div>
              
              {/* Floating stats around image */}
              <div className="absolute -top-4 -left-4 bg-sinco-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-gentle">
                💎 100K+ Followers
              </div>
              <div className="absolute -bottom-4 -right-4 bg-sinco-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-gentle" style={{animationDelay: '1s'}}>
                🔥 10M+ Views
              </div>
              <div className="absolute top-1/2 -right-8 bg-sinco-light text-forest-900 px-3 py-2 rounded-full text-xs font-bold shadow-lg animate-bounce-gentle" style={{animationDelay: '2s'}}>
                🌟 Daily Content
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-left lg:text-left">
            {/* Main Title */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="hero-title mb-6 text-center lg:text-left">
                {textContent.hero.title}
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="hero-subtitle mb-8 text-center lg:text-left">
                {textContent.hero.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg md:text-xl text-sinco-cream text-opacity-80 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                {textContent.hero.description}
              </p>
            </div>

            {/* Social Media Buttons */}
            <div className={`transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <a
                  href={siteConfig.social.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-full sm:w-auto"
                  onClick={() => trackEvent('social_click', { platform: 'tiktok' })}
                >
                  <span className="text-xl">🎵</span>
                  <span>Watch on TikTok</span>
                  <span className="text-sm opacity-75">{siteConfig.social.tiktok.handle}</span>
                </a>
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-full sm:w-auto"
                  onClick={() => trackEvent('social_click', { platform: 'instagram' })}
                >
                  <span className="text-xl">📸</span>
                  <span>Follow on Instagram</span>
                  <span className="text-sm opacity-75">{siteConfig.social.instagram.handle}</span>
                </a>
              </div>
            </div>

            {/* Memecoin Contract */}
            <div className={`transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-8">
                <div className="bg-forest-900 bg-opacity-60 backdrop-blur-md rounded-2xl p-6 border-2 border-sinco-primary border-opacity-40 shadow-xl max-w-lg mx-auto lg:mx-0">
                  <div className="text-center lg:text-left mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-sinco-primary mb-2 flex items-center justify-center lg:justify-start gap-2">
                      💎 {siteConfig.memecoin.symbol} Token
                    </h3>
                    <p className="text-sinco-cream text-opacity-70 text-sm">
                      Official {siteConfig.memecoin.network} Contract Address
                    </p>
                  </div>
                  <div className="bg-forest-800 bg-opacity-80 rounded-xl p-3 mb-4">
                    <p className="font-mono text-xs md:text-sm text-sinco-cream break-all leading-relaxed">
                      {siteConfig.memecoin.contractAddress}
                    </p>
                  </div>
                  <CopyButton
                    text={siteConfig.memecoin.contractAddress}
                    label="Copy Contract Address"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Scroll Arrow */}
            <div className={`transition-all duration-1000 delay-1300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center lg:text-left">
                <button
                  onClick={scrollToContent}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-sinco-primary border-opacity-40 text-sinco-primary hover:border-opacity-60 hover:bg-sinco-primary hover:bg-opacity-10 transition-all duration-300 animate-bounce-gentle"
                  aria-label="Scroll to content"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sinco-primary bg-opacity-10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sinco-accent bg-opacity-15 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}