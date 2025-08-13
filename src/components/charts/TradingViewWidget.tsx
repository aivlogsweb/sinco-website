'use client';

import { useState } from 'react';

interface DexScreenerChartProps {
  tokenAddress?: string;
  className?: string;
}

export default function DexScreenerChart({ 
  tokenAddress = 'HoQYRCnUeyZZyFiPtYDw48kHyGwjsaUXJxDVtxcK4yPg', 
  className = '' 
}: DexScreenerChartProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`bg-gradient-to-br from-forest-900/60 to-forest-800/80 backdrop-blur-xl rounded-2xl border border-sinco-primary/30 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-sinco-primary/20">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-sinco-primary mb-1">
              📊 Live SINCO Chart
            </h3>
            <p className="text-sinco-cream/60 text-sm">
              Real-time trading data from DexScreener
            </p>
          </div>
          <a
            href={`https://dexscreener.com/solana/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-sinco-primary to-sinco-secondary hover:from-sinco-secondary hover:to-sinco-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <span>🚀</span>
            <span>Trade Now</span>
          </a>
        </div>
      </div>

      {/* DexScreener Embed */}
      <div className="p-6">
        <div className="h-96 w-full relative">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-forest-800/50 rounded-xl">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-sinco-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sinco-cream/60">Loading chart...</p>
              </div>
            </div>
          )}
          <iframe
            src={`https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark&trades=0&info=0`}
            className="w-full h-full rounded-xl border-0"
            onLoad={() => setIsLoaded(true)}
            style={{ 
              minHeight: '384px',
              background: 'transparent'
            }}
            title="DexScreener Chart"
          />
        </div>

        {/* Trading Info */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://dexscreener.com/solana/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-sinco-primary/20 hover:bg-sinco-primary hover:text-white text-sinco-primary px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 justify-center"
          >
            <span>📈</span>
            <span>View Full Chart</span>
          </a>
          <a
            href={`https://pump.fun/coin/${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-sinco-secondary/20 hover:bg-sinco-secondary hover:text-white text-sinco-secondary px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 justify-center"
          >
            <span>🚀</span>
            <span>Buy on Pump.fun</span>
          </a>
        </div>
      </div>
    </div>
  );
}