'use client';

import { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp, Globe, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { trackEvent } from '@/lib/utils';

export default function Community() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          trackEvent('section_view', { section: 'community' });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const communityStats = [
    { icon: Users, label: 'Community Members', value: '100K+', color: 'text-sinco-primary', subtitle: 'Across Social Media Platforms' },
    { icon: TrendingUp, label: 'Total Views', value: '10M+', color: 'text-sinco-accent', subtitle: 'Across All Platforms' },
    { icon: Globe, label: 'Countries', value: '120+', color: 'text-sinco-light', subtitle: 'Global Reach' },
  ];

  return (
    <section 
      id="community" 
      ref={sectionRef}
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sinco-light to-sinco-primary mb-6">
            Join Sinco's Army
          </h2>
          <p className="text-xl text-sinco-cream text-opacity-80 mb-8 max-w-3xl mx-auto">
            Be part of the adorable squirrel phenomenon taking the world by storm! Join 100K+ followers watching Sinco's daily adventures.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-sinco-primary to-sinco-accent mx-auto rounded-full"></div>
        </div>

        {/* Community Stats */}
        <div className={`grid sm:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {communityStats.map((stat, index) => (
            <div 
              key={index}
              className="content-card text-center p-8 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-forest-700 bg-opacity-60 mb-4 ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-sinco-cream text-opacity-80 mb-1">{stat.label}</div>
              {stat.subtitle && (
                <div className="text-xs text-sinco-cream text-opacity-60">
                  {stat.subtitle}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Follow Sinco */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="content-card p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sinco-primary bg-opacity-20 mb-4">
                  <span className="text-3xl">🐿️</span>
                </div>
                <h3 className="text-2xl font-bold text-sinco-primary mb-4">
                  Follow Sinco's Journey
                </h3>
                <p className="text-sinco-cream text-opacity-80 leading-relaxed">
                  Join 100K+ followers watching Sinco's adorable daily adventures. New content posted every day!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={siteConfig.social.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-full"
                  onClick={() => trackEvent('social_click', { platform: 'tiktok', location: 'community' })}
                >
                  <span className="text-xl">🎵</span>
                  <span>Follow on TikTok</span>
                  <span className="text-sm opacity-75">{siteConfig.social.tiktok.handle}</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
                
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button w-full"
                  onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'community' })}
                >
                  <span className="text-xl">📸</span>
                  <span>Follow on Instagram</span>
                  <span className="text-sm opacity-75">{siteConfig.social.instagram.handle}</span>
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </a>
              </div>
              
              <p className="text-xs text-sinco-cream text-opacity-60 mt-4 text-center">
                💎 Daily squirrel content • 🎬 Behind-the-scenes • 🐿️ Exclusive moments
              </p>
            </div>
          </div>

          {/* Community Features */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-sinco-primary mb-8">
                What You'll Experience
              </h3>
              
              {[
                {
                  icon: '🎬',
                  title: 'Daily Squirrel Content',
                  description: 'Fresh Sinco adventures posted daily. Watch our adorable squirrel charm the world!'
                },
                {
                  icon: '🌟',
                  title: 'Viral Moments',
                  description: 'Be the first to see new viral TikToks and trending Instagram posts from Sinco.'
                },
                {
                  icon: '💎',
                  title: 'Exclusive Access',
                  description: 'Behind-the-scenes content, feeding time videos, and special squirrel moments.'
                },
                {
                  icon: '🐿️',
                  title: 'Community Love',
                  description: 'Join the global family of squirrel lovers sharing wholesome content and positivity.'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-forest-800 hover:bg-opacity-30 transition-all duration-300"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <div className="text-2xl flex-shrink-0 animate-bounce-gentle" style={{ animationDelay: `${index * 0.5}s` }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-sinco-primary mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sinco-cream text-opacity-80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="content-card inline-block p-8 max-w-2xl">
            <h3 className="text-2xl font-bold text-sinco-primary mb-4">
              Ready to Join Sinco's World?
            </h3>
            <p className="text-sinco-cream text-opacity-80 mb-6">
              Don't miss out on the daily dose of cuteness! Follow @sinco.00 on both platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                onClick={() => trackEvent('social_click', { platform: 'tiktok', location: 'community' })}
              >
                <span>🎵</span>
                <span>Watch on TikTok</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'community' })}
              >
                <span>📸</span>
                <span>Follow on Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-sinco-primary bg-opacity-5 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-sinco-accent bg-opacity-10 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}