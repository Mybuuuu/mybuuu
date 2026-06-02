'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'SEDANG MENYIAPKAN PENGALAMAN TERBAIK...',
  'LOADING ASSETS...',
  'MEMBANGUN TAMPILAN...',
  'MENGOPTIMALKAN GRAFIK...',
  'HAMPIR SELESAI...',
  'SISTEM SIAP.'
];

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animate progress percentage smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600); // let exit animations finish
          }, 450);
          return 100;
        }
        
        // Random incremental tick
        const nextVal = prev + Math.floor(Math.random() * 8) + 2;
        return Math.min(nextVal, 100);
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Derive active boot step log from progress values to avoid setState in useEffect cascading renders
  const stepIdx = Math.min(
    Math.floor((progress / 100) * STEPS.length),
    STEPS.length - 1
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: 'blur(10px)',
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-sm flex flex-col items-start relative z-10 font-sans">
            {/* Header / Brand Logo */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full flex items-center justify-between border-b border-portfolio-border pb-3 mb-6"
            >
              <span className="font-space font-bold text-xs tracking-widest text-white">
                MYBUU // PORTFOLIO
              </span>
              <span className="font-mono text-[9px] text-text-secondary">
                V2.0_STABLE
              </span>
            </motion.div>

            {/* Steps Text Log */}
            <div className="h-6 mb-1 overflow-hidden w-full text-left">
              <motion.span
                key={stepIdx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                exit={{ y: -10, opacity: 0 }}
                className="font-mono text-[9px] uppercase tracking-widest text-white block font-medium"
              >
                {STEPS[stepIdx]}
              </motion.span>
            </div>

            {/* Percentage Text Counter */}
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="font-space font-medium text-5xl text-white select-none">
                {progress}
              </span>
              <span className="font-space font-medium text-xs text-text-secondary select-none">
                %
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom status codes */}
            <div className="w-full flex justify-between items-center mt-6 text-[8px] font-mono text-text-secondary opacity-40 uppercase tracking-widest">
              <span>CORE_TEMP: NORMAL</span>
              <span>SECURE_BOOT: ACTIVE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
