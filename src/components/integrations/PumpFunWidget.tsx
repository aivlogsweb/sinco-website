'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Play, Users, TrendingUp, Zap } from 'lucide-react';

interface PumpFunWidgetProps {
  tokenAddress?: string;
  className?: string;
}

interface StreamData {
  isLive: boolean;
  viewerCount: number;
  title: string;
  streamer: string;
  thumbnail: string;
}

export default function PumpFunWidget({ tokenAddress = 'CONTRACT_ADDRESS_PLACEHOLDER_UPDATE_AT_LAUNCH', className = '' }: PumpFunWidgetProps) {
  const [streamData, setStreamData] = useState<StreamData>({
    isLive: false,
    viewerCount: 0,
    title: '',
    streamer: '',
    thumbnail: ''
  });
  const [isConnected, setIsConnected] = useState(false);
  const [tokenStats, setTokenStats] = useState({
    holders: 0,
    transactions: 0,
    bondingProgress: 0
  });

  useEffect(() => {
    // Simulate pump.fun data - replace with actual API calls
    const simulateData = () => {
      // Simulate livestream data
      const isCurrentlyLive = Math.random() > 0.7; // 30% chance of being live
      setStreamData({
        isLive: isCurrentlyLive,
        viewerCount: isCurrentlyLive ? Math.floor(Math.random() * 500 + 50) : 0,
        title: isCurrentlyLive ? "🐿️ SINCO Community Livestream - To the Moon!" : "Stream Offline",
        streamer: "SincoTeam",
        thumbnail: "/images/sinco-stream-thumbnail.jpg" // You'd need to add this image
      });

      // Simulate token stats
      setTokenStats({
        holders: 3250, // Fixed value to prevent hydration mismatch
        transactions: 47500, // Fixed value to prevent hydration mismatch
        bondingProgress: 73 // Fixed value to prevent hydration mismatch
      });

      setIsConnected(true);
    };

    simulateData();
    
    // Update every 30 seconds
    const interval = setInterval(simulateData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleWatchStream = () => {
    // Open pump.fun page - replace with actual token page
    window.open(`https://pump.fun/board`, '_blank');
  };

  const handleTradingView = () => {
    // Open real SINCO trading interface
    window.open(`https://pump.fun/coin/${tokenAddress}`, '_blank');
  };

  return (
    <div className={`bg-gradient-to-br from-forest-900/60 to-forest-800/80 backdrop-blur-xl rounded-2xl border border-sinco-primary/30 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-sinco-primary/20">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-sinco-primary mb-1">
              🚀 Pump.fun Integration
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-xs text-sinco-cream/60">
                {isConnected ? 'Connected to Pump.fun' : 'Connecting...'}
              </span>
            </div>
          </div>
          <button
            onClick={handleTradingView}
            className="bg-gradient-to-r from-sinco-primary to-sinco-secondary hover:from-sinco-secondary hover:to-sinco-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trade SINCO</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Livestream Section */}
      <div className="p-6 border-b border-sinco-primary/20">
        <h4 className="text-lg font-semibold text-sinco-cream mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-sinco-secondary" />
          Community Livestream
        </h4>

        {streamData.isLive ? (
          <div className="relative group cursor-pointer" onClick={handleWatchStream}>
            {/* Live Stream Preview */}
            <div className="aspect-video bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl overflow-hidden relative">
              {/* Simulated stream content */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{streamData.title}</h3>
                  <p className="text-sm opacity-90">by {streamData.streamer}</p>
                </div>
              </div>
              
              {/* Live indicator */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>
              
              {/* Viewer count */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {streamData.viewerCount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              <button className="bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                <ExternalLink className="w-4 h-4" />
                Watch on Pump.fun
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-forest-700/50 rounded-xl flex items-center justify-center border-2 border-dashed border-sinco-primary/30">
            <div className="text-center text-sinco-cream/60">
              <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium mb-2">Stream Currently Offline</p>
              <p className="text-sm">Check back later for live community streams!</p>
              <button 
                onClick={handleWatchStream}
                className="mt-4 text-sinco-primary hover:text-sinco-light transition-colors text-sm font-medium flex items-center gap-1 mx-auto"
              >
                <ExternalLink className="w-3 h-3" />
                Visit Pump.fun
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Token Stats */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-sinco-cream mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-sinco-accent" />
          Pump.fun Stats
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sinco-primary/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-sinco-primary mb-1">
              {tokenStats.holders.toLocaleString()}
            </div>
            <div className="text-xs text-sinco-cream/80">Token Holders</div>
          </div>

          <div className="bg-sinco-secondary/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-sinco-secondary mb-1">
              {tokenStats.transactions.toLocaleString()}
            </div>
            <div className="text-xs text-sinco-cream/80">Total Transactions</div>
          </div>

          <div className="bg-sinco-accent/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-sinco-accent mb-1">
              {tokenStats.bondingProgress}%
            </div>
            <div className="text-xs text-sinco-cream/80">Bonding Progress</div>
          </div>
        </div>

        {/* Bonding Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-sinco-cream/80">Bonding Curve Progress</span>
            <span className="text-sm font-medium text-sinco-primary">{tokenStats.bondingProgress}%</span>
          </div>
          <div className="w-full bg-forest-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-sinco-primary to-sinco-secondary h-3 rounded-full transition-all duration-1000"
              style={{ width: `${tokenStats.bondingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-sinco-cream/60 mt-2">
            When the bonding curve reaches 100%, SINCO will be available on Raydium!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleTradingView}
            className="flex-1 bg-gradient-to-r from-sinco-primary to-sinco-secondary hover:from-sinco-secondary hover:to-sinco-primary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Trade on Pump.fun
          </button>
          
          <button
            onClick={() => window.open('https://pump.fun/board', '_blank')}
            className="flex-1 bg-forest-700 hover:bg-forest-600 text-sinco-cream font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Explore Pump.fun
          </button>
        </div>
      </div>
    </div>
  );
}