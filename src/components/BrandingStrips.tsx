'use client';

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

// Repeating segment component to represent physical manufactured branding elements
const RibbonSegment = ({ 
  type, 
  text, 
  colorTheme = 'white' 
}: { 
  type: 'title' | 'detail' | 'symbol' | 'divider' | 'barcode'; 
  text?: string; 
  colorTheme?: 'white' | 'gold' | 'purple' | 'black' 
}) => {
  const getTextColorClass = () => {
    if (colorTheme === 'gold') return 'text-accent-gold';
    if (colorTheme === 'purple') return 'text-accent-secondary';
    if (colorTheme === 'black') return 'text-black';
    return 'text-white';
  };

  switch (type) {
    case 'title':
      return (
        <div className="flex flex-col items-center justify-center py-4 md:py-8 px-1 md:px-2 w-full flex-shrink-0">
          <div className="h-[120px] md:h-[200px] flex items-center justify-center">
            <span className={`rotate-90 origin-center whitespace-nowrap tracking-[0.22em] md:tracking-[0.25em] font-space font-extrabold text-base md:text-2xl uppercase ${getTextColorClass()}`}>
              {text}
            </span>
          </div>
        </div>
      );

    case 'detail':
      return (
        <div className="flex flex-col items-center justify-center py-4 md:py-6 px-0.5 md:px-1 w-full flex-shrink-0">
          <div className="h-[160px] md:h-[260px] flex items-center justify-center">
            <span className={`rotate-90 origin-center whitespace-nowrap tracking-[0.15em] md:tracking-[0.2em] font-sans font-bold text-[8px] md:text-xs uppercase ${
              colorTheme === 'black' 
                ? 'text-black/80 font-extrabold' 
                : 'text-transparent [-webkit-text-stroke:0.3px_rgba(255,255,255,0.4)] md:[-webkit-text-stroke:0.5px_rgba(255,255,255,0.4)] opacity-70'
            }`}>
              {text}
            </span>
          </div>
        </div>
      );

    case 'symbol':
      return (
        <div className="flex flex-col items-center justify-center py-2 md:py-4 w-full flex-shrink-0">
          {text === '★' && (
            <svg className={`w-4 h-4 md:w-6 md:h-6 ${getTextColorClass()}`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
          {text === '◆' && (
            <div className={`w-3.5 h-3.5 md:w-5 md:h-5 rotate-45 border-[1.5px] md:border-2 ${
              colorTheme === 'gold' ? 'border-accent-gold bg-accent-gold/20' : 'border-accent-secondary bg-accent-secondary/20'
            }`} />
          )}
          {text === 'cross' && (
            <div className="relative w-3.5 h-3.5 md:w-5 md:h-5 flex items-center justify-center">
              <div className="absolute w-full h-[1px] md:h-[2px] bg-white/40" />
              <div className="absolute w-[1px] md:w-[2px] h-full bg-white/40" />
            </div>
          )}
        </div>
      );

    case 'divider':
      return (
        <div className="w-full h-4 md:h-8 flex-shrink-0 overflow-hidden relative opacity-60">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: colorTheme === 'gold'
                ? 'repeating-linear-gradient(-45deg, var(--accent-gold) 0, var(--accent-gold) 4px, transparent 4px, transparent 8px)'
                : 'repeating-linear-gradient(-45deg, var(--accent-secondary) 0, var(--accent-secondary) 4px, transparent 4px, transparent 8px)',
            }}
          />
        </div>
      );

    case 'barcode':
      return (
        <div className="flex flex-col items-center justify-center py-4 md:py-6 w-full flex-shrink-0">
          <div className="flex items-center justify-center gap-[1.2px] md:gap-[2px] h-6 md:h-10 w-8 md:w-12 opacity-60">
            {[2, 4, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2].map((w, i) => (
              <div 
                key={i} 
                className={colorTheme === 'black' ? 'bg-black h-full' : 'bg-white h-full'} 
                style={{ width: `${w * 0.5}px` }} 
              />
            ))}
          </div>
          <span className={`text-[6px] md:text-[8px] font-mono tracking-widest mt-1 opacity-50 ${colorTheme === 'black' ? 'text-black' : 'text-white'}`}>
            {text || 'ID-03.06.26'}
          </span>
        </div>
      );

    default:
      return null;
  }
};

interface StripConfig {
  className: string;
  scale: number;
  opacity: number;
  blur: string;
  direction: 'up' | 'down';
  speed: string; // duration in seconds
  bgClass: string;
  stitchClass: string;
  parallaxStrength: { x: number; y: number };
  items: Array<{ type: 'title' | 'detail' | 'symbol' | 'divider' | 'barcode'; text?: string; colorTheme?: 'white' | 'gold' | 'purple' | 'black' }>;
  hiddenOnMobile?: boolean;
}

interface SingleStripProps {
  strip: StripConfig;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

const SingleStrip = ({ strip, springX, springY }: SingleStripProps) => {
  // Compute parallax values for each individual strip (Safely inside a React component)
  const xTranslate = useTransform(springX, (v: number) => v * strip.parallaxStrength.x);
  const yTranslate = useTransform(springY, (v: number) => v * strip.parallaxStrength.y);

  return (
    <motion.div
      style={{
        x: xTranslate,
        y: yTranslate,
        scale: strip.scale,
        opacity: strip.opacity,
        filter: strip.blur !== '0px' ? `blur(${strip.blur})` : 'none',
      }}
      className={`fixed top-0 bottom-0 select-none pointer-events-none shadow-[0_15px_35px_rgba(0,0,0,0.65)] ribbon-texture ribbon-shading ${
        strip.stitchClass
      } ${strip.bgClass} ${strip.hiddenOnMobile ? 'hidden md:flex' : 'flex'} flex-col ${strip.className}`}
    >
      {/* Running track containing 2 identical copies of elements for seamless looping */}
      <div 
        className={`marquee-vertical-${strip.direction} flex flex-col items-center gap-12 flex-nowrap`}
        style={{ animationDuration: strip.speed }}
      >
        <div className="flex flex-col items-center gap-12 flex-shrink-0 w-full">
          {strip.items.map((item, itemIdx) => (
            <RibbonSegment 
              key={itemIdx} 
              type={item.type} 
              text={item.text} 
              colorTheme={item.colorTheme} 
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-12 flex-shrink-0 w-full" aria-hidden="true">
          {strip.items.map((item, itemIdx) => (
            <RibbonSegment 
              key={`dup-${itemIdx}`} 
              type={item.type} 
              text={item.text} 
              colorTheme={item.colorTheme} 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function BrandingStrips() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for high-end damped movement
  const springConfig = { stiffness: 40, damping: 24, mass: 0.7 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Map coordinates to range [-1, 1]
      const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Strip definitions
  const strips: StripConfig[] = [
    {
      className: 'w-[42px] md:w-[80px] left-[2%] md:left-[4%]',
      scale: 1.0,
      opacity: 0.28,
      blur: '0px',
      direction: 'up',
      speed: '40s',
      bgClass: 'bg-[#080808]',
      stitchClass: 'ribbon-stitch-gold',
      parallaxStrength: { x: 15, y: 10 },
      hiddenOnMobile: true,
      items: [
        { type: 'barcode', text: 'MYBUUU.DEPT-1', colorTheme: 'white' },
        { type: 'title', text: 'MYBUUU', colorTheme: 'gold' },
        { type: 'symbol', text: '★', colorTheme: 'gold' },
        { type: 'detail', text: 'CREATIVE VISUAL DESIGNER', colorTheme: 'white' },
        { type: 'divider', colorTheme: 'gold' },
        { type: 'title', text: 'DIGITAL BUILDER', colorTheme: 'white' },
        { type: 'symbol', text: '◆', colorTheme: 'gold' },
        { type: 'detail', text: 'MANAGEMENT STUDENT', colorTheme: 'white' },
        { type: 'barcode', text: 'EST. 2004', colorTheme: 'gold' },
        { type: 'symbol', text: 'cross', colorTheme: 'white' },
      ],
    },
    {
      className: 'w-[65px] left-[26%]',
      scale: 0.78,
      opacity: 0.15,
      blur: '1.2px',
      direction: 'up',
      speed: '52s',
      bgClass: 'bg-[#101010]',
      stitchClass: 'ribbon-stitch-white',
      parallaxStrength: { x: 8, y: 5 },
      hiddenOnMobile: true,
      items: [
        { type: 'title', text: 'MYBUUU', colorTheme: 'purple' },
        { type: 'symbol', text: 'cross', colorTheme: 'purple' },
        { type: 'detail', text: 'SELF-TAUGHT DEVELOPER', colorTheme: 'white' },
        { type: 'barcode', text: 'CODE-CORE-X', colorTheme: 'white' },
        { type: 'divider', colorTheme: 'purple' },
        { type: 'detail', text: 'MANAGEMENT STUDENT', colorTheme: 'white' },
        { type: 'symbol', text: '★', colorTheme: 'purple' },
        { type: 'title', text: 'BUILD & GROW', colorTheme: 'white' },
      ],
    },
    {
      className: 'w-[90px] left-[68%]',
      scale: 1.15,
      opacity: 0.24,
      blur: '0.4px',
      direction: 'up',
      speed: '32s',
      bgClass: 'bg-gradient-to-b from-[#6b21a8] to-[#8b5cf6]',
      stitchClass: 'ribbon-stitch-purple',
      parallaxStrength: { x: 26, y: 16 },
      hiddenOnMobile: true,
      items: [
        { type: 'title', text: 'MYBUUU', colorTheme: 'black' },
        { type: 'symbol', text: '★', colorTheme: 'gold' },
        { type: 'detail', text: 'DIGITAL ARCHITECT', colorTheme: 'black' },
        { type: 'barcode', text: 'VERIFIED-002', colorTheme: 'black' },
        { type: 'divider', colorTheme: 'gold' },
        { type: 'title', text: 'CREATIVE DESIGN', colorTheme: 'black' },
        { type: 'symbol', text: '◆', colorTheme: 'black' },
        { type: 'detail', text: 'SELF-TAUGHT CODE', colorTheme: 'black' },
      ],
    },
    {
      className: 'w-[74px] left-[88%]',
      scale: 0.9,
      opacity: 0.20,
      blur: '0px',
      direction: 'down',
      speed: '38s',
      bgClass: 'bg-[#050505]',
      stitchClass: 'ribbon-stitch-white',
      parallaxStrength: { x: 18, y: 12 },
      hiddenOnMobile: true,
      items: [
        { type: 'title', text: 'MYBUUU', colorTheme: 'gold' },
        { type: 'barcode', text: 'SECURE-004', colorTheme: 'white' },
        { type: 'detail', text: 'SELF-TAUGHT DEVELOPER', colorTheme: 'white' },
        { type: 'symbol', text: 'cross', colorTheme: 'purple' },
        { type: 'divider', colorTheme: 'purple' },
        { type: 'title', text: 'DIGITAL BUILDER', colorTheme: 'purple' },
        { type: 'symbol', text: '★', colorTheme: 'gold' },
        { type: 'detail', text: 'MANAGEMENT STUDENT', colorTheme: 'white' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
      {strips.map((strip, idx) => (
        <SingleStrip 
          key={idx} 
          strip={strip} 
          springX={springX} 
          springY={springY} 
        />
      ))}
    </div>
  );
}
