'use client';

import { useState, useEffect, useRef } from 'react';
import { textContent } from '@/data/config';
import { trackEvent } from '@/lib/utils';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          trackEvent('section_view', { section: 'about' });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sinco-light to-sinco-primary mb-6">
            {textContent.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sinco-primary to-sinco-accent mx-auto rounded-full"></div>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-6">
              {textContent.about.content.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-lg md:text-xl text-sinco-cream text-opacity-90 leading-relaxed"
                  style={{ animationDelay: `${300 + index * 200}ms` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="text-center content-card p-6">
                <div className="text-3xl md:text-4xl font-bold text-sinco-primary mb-2">10M+</div>
                <div className="text-sinco-cream text-opacity-80">Total Views</div>
              </div>
              <div className="text-center content-card p-6">
                <div className="text-3xl md:text-4xl font-bold text-sinco-accent mb-2">100K+</div>
                <div className="text-sinco-cream text-opacity-80">Social Media Followers</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Main Visual Container */}
              <div className="bg-forest-800 bg-opacity-40 backdrop-blur-md rounded-2xl p-8 border border-sinco-primary border-opacity-30 shadow-xl">
                {/* Forest Icon Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {['🌲', '🍃', '🌿', '🍀', '🌾', '🌱', '🍂', '🌳'].map((emoji, index) => (
                    <div 
                      key={index}
                      className="text-center text-3xl animate-bounce-gentle"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-center">
                  <p className="text-lg md:text-xl italic text-sinco-cream text-opacity-90 mb-4">
                    "Nature meets viral culture in the most beautiful way possible."
                  </p>
                  <cite className="text-sinco-primary font-semibold">- The Sinco Community</cite>
                </blockquote>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-sinco-primary rounded-full animate-pulse-glow"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-sinco-accent rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {textContent.features.map((feature, index) => (
              <div 
                key={index}
                className="content-card text-center p-6 hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="text-4xl mb-4 animate-bounce-gentle" style={{ animationDelay: `${index * 0.5}s` }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-sinco-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sinco-cream text-opacity-80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-leaf-pattern bg-leaf-pattern opacity-5 pointer-events-none"></div>
    </section>
  );
}