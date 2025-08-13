'use client';

import { useEffect, useState, useMemo } from 'react';

// Performance detection - ONLY check for reduced motion preference
const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false;
  
  // ONLY check for reduced motion preference - don't disable on mobile
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion;
};

export default function FallingLeaves() {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  useEffect(() => {
    // Only check for reduced motion preference
    const reduceAnimations = shouldReduceAnimations();
    setShouldAnimate(!reduceAnimations);
  }, []);
  
  // Generate leaves dynamically
  const leafElements = useMemo(() => {
    if (!shouldAnimate) return [];
    
    const leafCount = 12; // Reduced count for subtlety
    const leaves = ['🍃', '🌿', '🍀', '🌾', '🌱'];
    const colors = ['#22c55e', '#16a34a', '#10b981', '#86efac'];
    
    return Array.from({ length: leafCount }, (_, i) => ({
      id: i,
      emoji: leaves[i % leaves.length],
      color: colors[i % colors.length],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8, // 8-16s
      delay: Math.random() * 5, // Reduced delay for immediate start
      opacity: 0.15 + Math.random() * 0.15, // 0.15-0.3 (much more subtle)
      size: 0.8 + Math.random() * 0.3 // 0.8-1.1em (smaller)
    }));
  }, [shouldAnimate]);
  
  if (!shouldAnimate) {
    return null;
  }
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Dynamic, performance-optimized leaves */}
      {leafElements.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute leaf-animation"
          style={{
            left: `${leaf.left}%`,
            color: leaf.color,
            opacity: leaf.opacity,
            fontSize: `${leaf.size}em`,
            animation: `leafFallSway ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
            willChange: 'transform'
          }}
          aria-hidden="true"
        >
          {leaf.emoji}
        </div>
      ))}
    </div>
  );
}