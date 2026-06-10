'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  mode?: 'typing' | 'words' | 'fade-up';
  className?: string;
  delay?: number;
  once?: boolean;
}

const TextReveal = React.memo(function TextReveal({
  text,
  mode = 'words',
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) {
  if (mode === 'typing') {
    const letters = text.split('');
    
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.015,
          delayChildren: delay,
        },
      },
    };

    const letterVariants: Variants = {
      hidden: { opacity: 0, y: 4 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: 'easeOut',
        },
      },
    };

    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={`inline-block ${className}`}
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  if (mode === 'words') {
    const words = text.split(' ');

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.03,
          delayChildren: delay,
        },
      },
    };

    const wordVariants: Variants = {
      hidden: { opacity: 0, y: '100%' },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // easeOutExpo
        },
      },
    };

    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-30px' }}
        className={`inline-flex flex-wrap ${className}`}
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1 mr-[0.22em]">
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    );
  }

  // Default: 'fade-up'
  return (
    <motion.span
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-30px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
});

TextReveal.displayName = 'TextReveal';
export default TextReveal;
