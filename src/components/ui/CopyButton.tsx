'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard, trackEvent } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'compact';
  className?: string;
}

export default function CopyButton({ 
  text, 
  label = "Copy", 
  variant = 'default',
  className = '' 
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || isCopied) return;
    
    setIsLoading(true);
    
    try {
      const success = await copyToClipboard(text);
      
      if (success) {
        setIsCopied(true);
        trackEvent('copy_to_clipboard', { text: text.slice(0, 10) + '...' });
        
        // Reset after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Copy failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleCopy}
        disabled={isLoading}
        className={`
          p-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95
          ${isCopied 
            ? 'bg-green-500 text-white animate-copy-success' 
            : 'bg-sinco-primary hover:bg-sinco-secondary text-white'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
          border border-sinco-light border-opacity-20 hover:border-opacity-40
          shadow-md hover:shadow-lg
          ${className}
        `}
        title={isCopied ? 'Copied!' : 'Copy to clipboard'}
      >
        {isCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      disabled={isLoading}
      className={`
        copy-button
        ${isCopied ? 'animate-copy-success bg-green-500 hover:bg-green-600' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Copying...</span>
        </>
      ) : isCopied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}