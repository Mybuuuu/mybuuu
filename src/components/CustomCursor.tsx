'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hoverType, setHoverType] = useState<'none' | 'link' | 'input' | 'project' | 'lanyard'>('none');
  const [isClicked, setIsClicked] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for organic luxury follower lag
  const ringX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const handle = requestAnimationFrame(() => setMounted(true));
    // Add custom cursor active class to document body to hide native cursor
    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      // Position is centered
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Optimized Event Delegation (single mouseover listener on window)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setHoverType('none');
        return;
      }

      if (target.closest('#projects .glass-card')) {
        setHoverType('project');
        return;
      }

      if (target.closest('.cursor-grab')) {
        setHoverType('lanyard');
        return;
      }

      if (target.closest('input, textarea, select')) {
        setHoverType('input');
        return;
      }

      if (target.closest('a, button, [role="button"], .cursor-pointer')) {
        setHoverType('link');
        return;
      }

      setHoverType('none');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(handle);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  // Determine outer ring scales and glows based on what cursor is hovering
  let ringScale = 38 / 80;
  let ringColor = 'border-white/40';
  let ringBg = 'bg-transparent';
  let ringGlow = '';
  let labelText = '';

  if (isClicked) {
    ringScale = 24 / 80;
    ringColor = 'border-accent-secondary';
    ringBg = 'bg-accent-secondary/15';
  } else if (hoverType === 'link') {
    ringScale = 65 / 80;
    ringColor = 'border-accent-secondary/60';
    ringBg = 'bg-accent-primary/10';
    ringGlow = 'shadow-[0_0_20px_rgba(124,58,237,0.3)]';
  } else if (hoverType === 'input') {
    ringScale = 20 / 80;
    ringColor = 'border-accent-primary/70';
    ringBg = 'bg-accent-primary/5';
  } else if (hoverType === 'project') {
    ringScale = 80 / 80;
    ringColor = 'border-accent-secondary/50';
    ringBg = 'bg-accent-secondary/5';
    labelText = 'LIHAT';
  } else if (hoverType === 'lanyard') {
    ringScale = 75 / 80;
    ringColor = 'border-white/50';
    ringBg = 'bg-white/5';
    labelText = 'TARIK';
  }

  return (
    <>
      {/* 1. Inner Solid Micro-Dot (Immediate position, zero delay) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* 2. Outer Spring Tracking Ring */}
      <motion.div
        className={`fixed top-0 left-0 w-20 h-20 rounded-full border-1.5 z-50 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300 ${ringColor} ${ringBg} ${ringGlow}`}
        animate={{
          scale: ringScale,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 22,
          mass: 0.5,
        }}
        style={{
          x: ringX,
          y: ringY,
          willChange: 'transform',
        }}
      >
        <AnimatePresence>
          {labelText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[9px] font-space font-extrabold tracking-widest text-white leading-none select-none"
            >
              {labelText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
