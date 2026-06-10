'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  className?: string;
}

export default function Magnetic({ children, range = 45, className = 'w-full sm:w-auto sm:inline-block' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate center of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance between cursor and center of element
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply magnetic pull if within range
    const distance = Math.hypot(distanceX, distanceY);
    if (distance < range) {
      // Scale attraction strength based on distance
      const strength = 0.35; 
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const springConfig = {
    stiffness: 80,
    damping: 18,
    mass: 0.8,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', ...springConfig }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
