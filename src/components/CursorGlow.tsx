'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for a laggy, organic, luxurious tracking feel
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const animFrame = requestAnimationFrame(() => setMounted(true));

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of glow card width (250px) to center it under cursor
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-[2] opacity-35 filter blur-[80px] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)',
      }}
    />
  );
}
