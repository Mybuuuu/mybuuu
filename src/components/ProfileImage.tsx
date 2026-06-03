'use client';

import React, { useState } from 'react';

const FORMATS = [
  '/profile/avatar.png',
  '/profile/avatar.webp',
  '/profile/avatar.jpg',
  '/profile/avatar.jpeg',
];

interface ProfileImageProps {
  className?: string;
}

export default function ProfileImage({ className = 'w-full h-full' }: ProfileImageProps) {
  const [formatIdx, setFormatIdx] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (formatIdx < FORMATS.length - 1) {
      setFormatIdx((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Premium futuristic SVG avatar placeholder - Combines Code brackets, strategic connections, and developer head profile
    return (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} text-accent-primary animate-pulse`}
        style={{ animationDuration: '4s' }}
      >
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <radialGradient id="avatarGlowInner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Inner Glow Background */}
        <circle cx="100" cy="100" r="85" fill="url(#avatarGlowInner)" />
        <circle cx="100" cy="100" r="70" stroke="url(#avatarGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        
        {/* Strategic Grid Nodes (Management) */}
        <circle cx="50" cy="60" r="3" fill="#A855F7" />
        <circle cx="150" cy="60" r="3" fill="#2563EB" />
        <line x1="50" y1="60" x2="100" y2="40" stroke="#A855F7" strokeWidth="0.5" opacity="0.4" />
        <line x1="150" y1="60" x2="100" y2="40" stroke="#2563EB" strokeWidth="0.5" opacity="0.4" />
        <line x1="50" y1="60" x2="100" y2="90" stroke="url(#avatarGrad)" strokeWidth="0.5" opacity="0.4" />
        <line x1="150" y1="60" x2="100" y2="90" stroke="url(#avatarGrad)" strokeWidth="0.5" opacity="0.4" />

        {/* Head/Avatar Outline (Tech) */}
        <circle cx="100" cy="80" r="28" stroke="url(#avatarGrad)" strokeWidth="2.5" />
        <path
          d="M62 145 C 62 120, 138 120, 138 145"
          stroke="url(#avatarGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Binary Overlay & Tech Badges */}
        <path d="M100 112 L100 135" stroke="url(#avatarGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="100" cy="80" r="4" fill="#FFFFFF" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="100" cy="80" r="2" fill="#FFFFFF" />

        {/* Coding symbol overlay */}
        <path d="M85 80 L75 80" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
        <path d="M115 80 L125 80" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <img
      src={FORMATS[formatIdx]}
      alt="Mybuu Profile Avatar"
      onError={handleImageError}
      className={`${className} object-cover`}
    />
  );
}
