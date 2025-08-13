/**
 * Device Detection and Performance Utilities
 * Optimized for mobile devices, especially Android compatibility
 */

export interface DeviceCapabilities {
  isMobile: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isLowEndDevice: boolean;
  supportsVideoAutoplay: boolean;
  prefersReducedMotion: boolean;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connectionType?: string;
}

export const detectDeviceCapabilities = (): DeviceCapabilities => {
  // Server-side safe defaults
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isAndroid: false,
      isIOS: false,
      isLowEndDevice: false,
      supportsVideoAutoplay: false,
      prefersReducedMotion: false,
    };
  }

  const userAgent = navigator.userAgent;
  const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  // @ts-ignore - These are experimental APIs
  const deviceMemory = (navigator as any).deviceMemory;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  // @ts-ignore - Connection API
  const connection = (navigator as any).connection;

  // Low-end device detection
  const isLowEndDevice = (
    (deviceMemory && deviceMemory <= 4) ||
    (hardwareConcurrency && hardwareConcurrency <= 2) ||
    (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'))
  );

  // Video autoplay support detection
  const supportsVideoAutoplay = (() => {
    // Android Chrome often blocks autoplay with sound
    if (isAndroid) return false;
    
    // iOS Safari supports autoplay muted
    if (isIOS) return true;
    
    // Desktop generally supports autoplay
    return !isMobile;
  })();

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    isMobile,
    isAndroid,
    isIOS,
    isLowEndDevice,
    supportsVideoAutoplay,
    prefersReducedMotion,
    deviceMemory,
    hardwareConcurrency,
    connectionType: connection?.effectiveType,
  };
};

export const getOptimalVideoSettings = (capabilities: DeviceCapabilities) => {
  return {
    autoplay: false, // Never autoplay on mobile for performance
    preload: capabilities.isLowEndDevice ? 'none' : 'metadata',
    muted: true,
    playsInline: true,
    controls: capabilities.isMobile, // Show native controls on mobile
    maxSimultaneousVideos: capabilities.isLowEndDevice ? 1 : capabilities.isMobile ? 2 : 6,
  };
};

export const getOptimalAnimationSettings = (capabilities: DeviceCapabilities) => {
  return {
    enabled: !capabilities.prefersReducedMotion && !capabilities.isLowEndDevice,
    leafCount: capabilities.isLowEndDevice ? 8 : capabilities.isMobile ? 12 : 24,
    reducedMotion: capabilities.prefersReducedMotion,
    useTransform3d: !capabilities.isAndroid, // Android sometimes has issues with 3D transforms
  };
};

// Performance monitoring utility
export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;

  return {
    // Measure FPS
    getFPS: (): Promise<number> => {
      return new Promise((resolve) => {
        let lastTime = performance.now();
        let frames = 0;
        
        const measure = () => {
          frames++;
          const currentTime = performance.now();
          
          if (currentTime >= lastTime + 1000) {
            resolve(frames);
          } else {
            requestAnimationFrame(measure);
          }
        };
        
        requestAnimationFrame(measure);
      });
    },

    // Measure memory usage (Chrome only)
    getMemoryUsage: () => {
      // @ts-ignore
      return (performance as any).memory ? {
        // @ts-ignore
        used: (performance as any).memory.usedJSHeapSize,
        // @ts-ignore
        total: (performance as any).memory.totalJSHeapSize,
        // @ts-ignore
        limit: (performance as any).memory.jsHeapSizeLimit,
      } : null;
    },

    // Measure loading performance
    getNavigationTiming: () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || null,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null,
      };
    }
  };
};