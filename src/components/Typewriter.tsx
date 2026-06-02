'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text?: string;
  texts?: string[];
  delay?: number;
  speed?: number;
  eraseSpeed?: number;
  holdTime?: number;
  pauseTime?: number;
  cursorColorClass?: string;
  isReady?: boolean;
}

export default function Typewriter({
  text,
  texts,
  delay = 800,
  speed = 75,
  eraseSpeed = 40,
  holdTime = 2000,
  pauseTime = 500,
  cursorColorClass = 'text-accent-primary',
  isReady = true,
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing' | 'pausing'>('typing');

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  // Main typing state machine effect
  useEffect(() => {
    if (!mounted || !isReady) return;

    // Single text mode (backward compatibility)
    if (!texts || texts.length === 0) {
      if (text) {
        let timer: NodeJS.Timeout;
        const startTimeout = setTimeout(() => {
          let idx = 0;
          timer = setInterval(() => {
            if (idx <= text.length) {
              setCurrentText(text.slice(0, idx));
              idx++;
            } else {
              clearInterval(timer);
            }
          }, speed);
        }, delay);
        return () => {
          clearTimeout(startTimeout);
          if (timer) clearInterval(timer);
        };
      }
      return;
    }

    // Multiple texts looping mode
    const targetText = texts[textIndex];
    let timer: NodeJS.Timeout;

    if (phase === 'typing') {
      const isStart = textIndex === 0 && currentText === '';
      timer = setTimeout(() => {
        setCurrentText((prev) => {
          const nextLen = prev.length + 1;
          if (nextLen > targetText.length) {
            setPhase('holding');
            return prev;
          }
          return targetText.slice(0, nextLen);
        });
      }, isStart ? delay : speed);
    } else if (phase === 'holding') {
      timer = setTimeout(() => {
        setPhase('erasing');
      }, holdTime);
    } else if (phase === 'erasing') {
      timer = setTimeout(() => {
        setCurrentText((prev) => {
          if (prev.length === 0) {
            setPhase('pausing');
            return prev;
          }
          return prev.slice(0, -1);
        });
      }, eraseSpeed);
    } else if (phase === 'pausing') {
      timer = setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setPhase('typing');
      }, pauseTime);
    }

    return () => clearTimeout(timer);
  }, [
    mounted,
    isReady,
    phase,
    textIndex,
    currentText,
    text,
    texts,
    speed,
    eraseSpeed,
    holdTime,
    pauseTime,
    delay,
  ]);

  // Cursor blinking loop
  useEffect(() => {
    if (!mounted) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [mounted]);

  const placeholder = texts && texts.length > 0
    ? texts.reduce((max, cur) => cur.length > max.length ? cur : max, '')
    : (text || '');

  if (!mounted) {
    // Render hidden placeholder with relative container during SSR to prevent hydration mismatches
    return (
      <span className="relative inline-block w-full opacity-0">
        <span className="block w-full" aria-hidden="true">
          {placeholder}
          <span className="ml-1">|</span>
        </span>
      </span>
    );
  }

  // Force solid cursor when actively typing or erasing for realistic typewriter feel; hide if not ready
  const activeCursor = !isReady ? false : ((phase === 'typing' || phase === 'erasing') ? true : showCursor);

  return (
    <span className="relative inline-block w-full">
      {/* Invisible layout reserve to prevent shifting */}
      <span className="opacity-0 invisible select-none pointer-events-none block w-full" aria-hidden="true">
        {placeholder}
        <span className="ml-1">|</span>
      </span>
      {/* Visible typing text */}
      <span className="absolute left-0 top-0 block w-full">
        {currentText}
        <span 
          className={`inline-block transition-opacity duration-100 font-light ${
            activeCursor ? 'opacity-100' : 'opacity-0'
          } ${cursorColorClass} ml-1`}
          style={{ fontSize: 'inherit', lineHeight: '1em' }}
        >
          |
        </span>
      </span>
    </span>
  );
}
