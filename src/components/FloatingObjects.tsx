'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OBJECTS = [
  {
    // Code Brackets & Tech Logic
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 text-accent-primary">
        <path d="M35 30 L15 50 L35 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M65 30 L85 50 L65 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="55" y1="20" x2="45" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    x: '10%',
    y: '20%',
    duration: 25,
    delay: 2,
    opacity: 0.12,
  },
  {
    // Strategy Compass / Management Gear
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="w-20 h-20 text-accent-secondary">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="50,35 55,50 50,65 45,50" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    x: '85%',
    y: '15%',
    duration: 32,
    delay: 0,
    opacity: 0.15,
  },
  {
    // Management Metrics Bar Chart
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="w-18 h-18 text-accent-primary">
        <line x1="20" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="30" y="45" width="10" height="35" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        <rect x="48" y="30" width="10" height="50" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        <rect x="66" y="55" width="10" height="25" rx="1" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    x: '80%',
    y: '65%',
    duration: 28,
    delay: 4,
    opacity: 0.1,
  },
  {
    // Node Mesh Network Grid
    svg: (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 text-white">
        <circle cx="20" cy="50" r="4" fill="currentColor" />
        <circle cx="50" cy="20" r="4" fill="currentColor" />
        <circle cx="50" cy="80" r="4" fill="currentColor" />
        <circle cx="80" cy="50" r="4" fill="currentColor" />
        <line x1="20" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="20" y1="50" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="20" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="80" x2="80" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
    x: '5%',
    y: '70%',
    duration: 35,
    delay: 1,
    opacity: 0.12,
  },
];

export default function FloatingObjects() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {OBJECTS.map((obj, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            left: obj.x,
            top: obj.y,
            opacity: obj.opacity,
            transformStyle: 'preserve-3d',
            perspective: 500,
          }}
          animate={{
            y: [-16, 16, -16],
            x: [-8, 8, -8],
            rotate: [0, 360],
          }}
          transition={{
            duration: obj.duration,
            delay: obj.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="hidden md:block"
        >
          {obj.svg}
        </motion.div>
      ))}
    </div>
  );
}
