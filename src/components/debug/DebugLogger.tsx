'use client';

import { useState, useEffect } from 'react';

interface DebugLog {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  component: string;
  message: string;
  data?: any;
}

class DebugLogger {
  private static instance: DebugLogger;
  private logs: DebugLog[] = [];
  private listeners: ((logs: DebugLog[]) => void)[] = [];

  static getInstance(): DebugLogger {
    if (!DebugLogger.instance) {
      DebugLogger.instance = new DebugLogger();
    }
    return DebugLogger.instance;
  }

  log(level: 'info' | 'warn' | 'error', component: string, message: string, data?: any) {
    const logEntry: DebugLog = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      data
    };
    
    this.logs.push(logEntry);
    console.log(`[${level.toUpperCase()}] ${component}: ${message}`, data || '');
    
    // Keep only last 50 logs
    if (this.logs.length > 50) {
      this.logs = this.logs.slice(-50);
    }
    
    // Notify listeners
    this.listeners.forEach(listener => listener([...this.logs]));
  }

  getLogs(): DebugLog[] {
    return [...this.logs];
  }

  subscribe(listener: (logs: DebugLog[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  clear() {
    this.logs = [];
    this.listeners.forEach(listener => listener([]));
  }
}

export const debugLogger = DebugLogger.getInstance();

export function DebugPanel() {
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>({});

  useEffect(() => {
    // Get device info
    setDeviceInfo({
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      browser: /Safari/.test(navigator.userAgent) ? 'Safari' : /Chrome/.test(navigator.userAgent) ? 'Chrome' : 'Other',
      localStorage: typeof Storage !== 'undefined',
      support: {
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        backdrop: CSS.supports('backdrop-filter', 'blur(10px)')
      }
    });

    debugLogger.log('info', 'DebugPanel', 'Debug panel initialized', deviceInfo);

    const unsubscribe = debugLogger.subscribe(setLogs);
    setLogs(debugLogger.getLogs());

    return unsubscribe;
  }, []);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-bold"
        >
          🐛 Debug
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 p-4">
      <div className="bg-gray-900 rounded-lg h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex justify-between items-center">
          <h3 className="text-white font-bold">🐛 Debug Console</h3>
          <div className="flex gap-2">
            <button
              onClick={() => debugLogger.clear()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-gray-800 p-3 border-b border-gray-700">
          <div className="text-white text-xs">
            <div><strong>Device:</strong> {deviceInfo.isMobile ? 'Mobile' : 'Desktop'} | {deviceInfo.browser}</div>
            <div><strong>Viewport:</strong> {deviceInfo.viewport}</div>
            <div><strong>localStorage:</strong> {deviceInfo.localStorage ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`p-2 rounded text-xs font-mono border-l-4 ${
                log.level === 'error' 
                  ? 'bg-red-900/30 border-red-500 text-red-200'
                  : log.level === 'warn'
                  ? 'bg-yellow-900/30 border-yellow-500 text-yellow-200'
                  : 'bg-blue-900/30 border-blue-500 text-blue-200'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold">[{log.component}]</span>
                <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="mb-1">{log.message}</div>
              {log.data && (
                <div className="bg-black/30 p-2 rounded mt-1 overflow-x-auto">
                  <pre>{typeof log.data === 'string' ? log.data : JSON.stringify(log.data, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-400 text-center py-8">No logs yet...</div>
          )}
        </div>
      </div>
    </div>
  );
}