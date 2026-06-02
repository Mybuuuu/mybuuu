'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

// SVG Minimal Avatar Fallback Image Component (Declared outside render to satisfy lint rules)
function HologramFallback() {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full opacity-40"
    >
      <defs>
        <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Cybernetic abstract wireframe nodes/grid backdrop */}
      <circle cx="200" cy="200" r="120" stroke="url(#holoGrad)" strokeWidth="0.5" />
      <line x1="80" y1="200" x2="320" y2="200" stroke="url(#holoGrad)" strokeWidth="0.5" opacity="0.2" />
      <line x1="200" y1="80" x2="200" y2="320" stroke="url(#holoGrad)" strokeWidth="0.5" opacity="0.2" />

      {/* Futuristic digital profile mask silhouette */}
      <path
        d="M200 100 
           C 160 100, 130 135, 130 190 
           C 130 235, 140 280, 150 305 
           C 160 325, 170 340, 180 350
           L 180 390 C 145 410, 110 430, 110 460
           L 290 460 C 290 430, 255 410, 220 390
           L 220 350
           C 230 340, 240 325, 250 305
           C 260 280, 270 235, 270 190
           C 270 135, 240 100, 200 100 Z"
        stroke="url(#holoGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function InteractivePortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Mouse normalized coordinates (-0.5 to 0.5)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Spring physics matching the portfolio style guideline
  const springConfig = { stiffness: 80, damping: 18, mass: 0.8 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Scroll Parallax hooks
  const { scrollY } = useScroll();
  // Portrait translates 30% slower than scroll
  const scrollParallaxY = useTransform(scrollY, [0, 1000], [0, -300]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) {
        // Reduce mouse tracking offset on mobile by 70%
        rawMouseX.set(((e.clientX / window.innerWidth) - 0.5) * 0.3);
        rawMouseY.set(((e.clientY / window.innerHeight) - 0.5) * 0.3);
      } else {
        rawMouseX.set((e.clientX / window.innerWidth) - 0.5);
        rawMouseY.set((e.clientY / window.innerHeight) - 0.5);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rawMouseX, rawMouseY]);

  // Front Layer Translation for soft parallax interaction
  const frontX = useTransform(smoothMouseX, [-0.5, 0.5], [-18, 18]);
  const frontY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        y: scrollParallaxY,
        willChange: 'transform',
      }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] md:w-[45vw] lg:w-[38vw] h-[550px] pointer-events-none select-none z-0 overflow-visible flex items-center justify-center"
    >
      {/* Behind-portrait static aurora glow */}
      <div className="absolute inset-0 flex items-center justify-center overflow-visible opacity-15 blur-[100px] z-0">
        <div className="absolute w-[250px] h-[250px] bg-accent-primary/10 rounded-full" />
        <div className="absolute w-[280px] h-[280px] bg-accent-secondary/5 rounded-full" />
      </div>

      {/* Main Single Portrait Layer */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-full flex items-center justify-center overflow-visible"
      >
        <motion.div
          style={{
            x: frontX,
            y: frontY,
            willChange: 'transform',
          }}
          className="absolute inset-0 z-20 opacity-80 scale-100 flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {imageError ? (
              <HologramFallback />
            ) : (
              <img
                src="/profile/portrait.png"
                alt="Mybuu Portrait Backdrop"
                onError={() => setImageError(true)}
                className="w-full h-full object-contain"
              />
            )}

            {/* Gradient mask at bottom to fade portrait into the background grid */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-portfolio-bg via-portfolio-bg/80 to-transparent z-25 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
