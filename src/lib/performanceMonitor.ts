/**
 * Performance Monitoring Utility
 * Tracks key performance metrics for mobile optimization
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  
  // Custom metrics
  videoLoadTime?: number;
  animationFPS?: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
  deviceInfo: {
    userAgent: string;
    screenSize: string;
    connectionType?: string;
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    deviceInfo: {
      userAgent: '',
      screenSize: '',
    }
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics();
      this.startMonitoring();
    }
  }

  private initializeMetrics() {
    // Device info
    this.metrics.deviceInfo = {
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      connectionType: (navigator as any).connection?.effectiveType,
      deviceMemory: (navigator as any).deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    };
  }

  private startMonitoring() {
    // Monitor Core Web Vitals
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorTTFB();
    
    // Monitor memory usage
    this.monitorMemory();
    
    // Monitor animation performance
    this.monitorAnimationFPS();
  }

  private monitorLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.logMetric('LCP', this.metrics.lcp);
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }
  }

  private monitorFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Cast to PerformanceEventTiming for FID measurement
        const eventEntry = entry as PerformanceEventTiming;
        this.metrics.fid = eventEntry.processingStart - eventEntry.startTime;
        this.logMetric('FID', this.metrics.fid);
      });
    });
    
    try {
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring not supported');
    }
  }

  private monitorCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
      this.logMetric('CLS', this.metrics.cls);
    });
    
    try {
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS monitoring not supported');
    }
  }

  private monitorTTFB() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      this.logMetric('TTFB', this.metrics.ttfb);
    }
  }

  private monitorMemory() {
    if ((performance as any).memory) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
      
      // Log memory usage every 30 seconds
      setInterval(() => {
        this.logMetric('Memory Usage', this.metrics.memoryUsage);
      }, 30000);
    }
  }

  private monitorAnimationFPS() {
    let lastTime = performance.now();
    let frames = 0;
    
    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        this.metrics.animationFPS = frames;
        this.logMetric('Animation FPS', this.metrics.animationFPS);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  public trackVideoLoad(videoSrc: string, loadTime: number) {
    this.metrics.videoLoadTime = loadTime;
    this.logMetric('Video Load Time', { videoSrc, loadTime });
  }

  public trackError(error: Error, context: string) {
    console.error(`Performance Error [${context}]:`, error);
    // Could send to analytics service here
  }

  private logMetric(name: string, value: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}:`, value);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public isPerformanceAcceptable(): boolean {
    const { lcp, fid, cls } = this.metrics;
    
    // Core Web Vitals thresholds
    const lcpGood = !lcp || lcp < 2500;
    const fidGood = !fid || fid < 100;
    const clsGood = !cls || cls < 0.1;
    
    return lcpGood && fidGood && clsGood;
  }

  public getPerformanceReport(): string {
    const { lcp, fid, cls, animationFPS, memoryUsage } = this.metrics;
    
    return `
Performance Report:
- LCP: ${lcp ? `${lcp.toFixed(0)}ms` : 'N/A'} ${lcp && lcp < 2500 ? '✅' : '❌'}
- FID: ${fid ? `${fid.toFixed(0)}ms` : 'N/A'} ${fid && fid < 100 ? '✅' : '❌'}
- CLS: ${cls ? cls.toFixed(3) : 'N/A'} ${cls && cls < 0.1 ? '✅' : '❌'}
- Animation FPS: ${animationFPS || 'N/A'} ${animationFPS && animationFPS > 30 ? '✅' : '❌'}
- Memory Usage: ${memoryUsage ? `${(memoryUsage.used / 1024 / 1024).toFixed(1)}MB` : 'N/A'}
    `.trim();
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const getPerformanceMonitor = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

export const trackVideoPerformance = (videoSrc: string, startTime: number) => {
  const monitor = getPerformanceMonitor();
  const loadTime = performance.now() - startTime;
  monitor.trackVideoLoad(videoSrc, loadTime);
};

export const logPerformanceError = (error: Error, context: string) => {
  const monitor = getPerformanceMonitor();
  monitor.trackError(error, context);
};
