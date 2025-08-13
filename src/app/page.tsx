'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import components
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Community from '@/components/sections/Community';
import { DebugPanel } from '@/components/debug/DebugLogger';

// Dynamic import for performance (client-only components)
const FallingLeaves = dynamic(() => import('@/components/effects/FallingLeaves'), {
  ssr: false,
  loading: () => null,
});

// Import components normally - no dynamic loading
import MediaGallery from '@/components/sections/MediaGallery';
import DexScreenerChart from '@/components/charts/TradingViewWidget';

export default function Home() {
  useEffect(() => {
    // Initialize any global effects or analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Sinco - Home',
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Animated Background Effects */}
      <FallingLeaves />
      
      {/* Main Content Sections */}
      <Hero />
      <About />
      <MediaGallery />
      
      {/* Trading & Analytics Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sinco-light to-sinco-primary mb-6">
              Live Trading & Analytics
            </h2>
            <p className="text-xl text-sinco-cream text-opacity-80 mb-8 max-w-2xl mx-auto">
              Track SINCO's price in real-time with professional trading data
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sinco-primary to-sinco-accent mx-auto rounded-full"></div>
          </div>
          
          <DexScreenerChart className="w-full" />
        </div>
      </section>
      
      <Community />
      
      {/* Debug Panel - only visible when needed */}
      <DebugPanel />
      
      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-sinco-primary border-opacity-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-sinco-primary mb-4">SINCO</h3>
            <p className="text-sinco-cream text-opacity-80 mb-6">
              The viral forest experience that's taking the world by storm.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.tiktok.com/@sinco.00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sinco-cream hover:text-sinco-primary transition-colors duration-300"
                title="TikTok"
              >
                <span className="text-2xl">🎵</span>
              </a>
              <a
                href="https://www.instagram.com/sinco.00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sinco-cream hover:text-sinco-primary transition-colors duration-300"
                title="Instagram"
              >
                <span className="text-2xl">📸</span>
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-sinco-primary border-opacity-20">
            <p className="text-sinco-cream text-opacity-60 text-sm">
              © 2024 Sinco. All rights reserved. Built with 🌿 and ❤️
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}