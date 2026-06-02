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

    // Event listeners to handle interactive states
    const addListeners = () => {
      // Find all interactive items
      const links = document.querySelectorAll('a, button, [role="button"], .cursor-pointer');
      const inputs = document.querySelectorAll('input, textarea, select');
      const projectCards = document.querySelectorAll('#projects .glass-card');
      const lanyardCard = document.querySelectorAll('.cursor-grab');

      links.forEach((el) => {
        el.addEventListener('mouseenter', () => setHoverType('link'));
        el.addEventListener('mouseleave', () => setHoverType('none'));
      });

      inputs.forEach((el) => {
        el.addEventListener('mouseenter', () => setHoverType('input'));
        el.addEventListener('mouseleave', () => setHoverType('none'));
      });

      projectCards.forEach((el) => {
        el.addEventListener('mouseenter', () => setHoverType('project'));
        el.addEventListener('mouseleave', () => setHoverType('none'));
      });

      lanyardCard.forEach((el) => {
        el.addEventListener('mouseenter', () => setHoverType('lanyard'));
        el.addEventListener('mouseleave', () => setHoverType('none'));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Initial query
    addListeners();

    // Re-bind when DOM updates (dynamic navigation)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(handle);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
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
