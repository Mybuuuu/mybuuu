'use client';

import React from 'react';

interface MarqueeProps {
  items: string[];
  direction?: 'forward' | 'reverse';
  speed?: 'normal' | 'fast' | 'slow';
  separator?: string;
  className?: string;
}

export default function Marquee({
  items,
  direction = 'forward',
  speed = 'normal',
  separator = '•',
  className = '',
}: MarqueeProps) {
  // Speed options map to animation durations (seconds)
  const durationMap = {
    fast: '15s',
    normal: '28s',
    slow: '45s',
  };
  const duration = durationMap[speed] || '28s';
  const trackClass = direction === 'forward' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div className={`w-full overflow-hidden select-none py-4 border-y border-portfolio-border/40 bg-portfolio-bg/30 backdrop-blur-md relative z-10 flex ${className}`}>
      <div className="flex w-max">
        {/* Track 1 */}
        <div 
          className={`${trackClass} gap-12 pr-12`}
          style={{ animationDuration: duration }}
        >
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-12 font-space font-extrabold text-2xl md:text-3xl uppercase tracking-widest flex-shrink-0"
            >
              {/* Alternating solid white and hollow outlined typography for Gen Z aesthetics */}
              <span className={idx % 2 === 0 ? 'text-white' : 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] font-light'}>
                {item}
              </span>
              <span className="text-accent-secondary font-black opacity-60 text-xl">{separator}</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Aria-hidden duplicate for seamless loop) */}
        <div 
          className={`${trackClass} gap-12 pr-12`}
          style={{ animationDuration: duration }}
          aria-hidden="true"
        >
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-12 font-space font-extrabold text-2xl md:text-3xl uppercase tracking-widest flex-shrink-0"
            >
              {/* Alternating solid white and hollow outlined typography for Gen Z aesthetics */}
              <span className={idx % 2 === 0 ? 'text-white' : 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] font-light'}>
                {item}
              </span>
              <span className="text-accent-secondary font-black opacity-60 text-xl">{separator}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
