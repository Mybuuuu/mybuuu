'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function CanvaIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="22" fill="url(#canvaGrad)" />
      <path 
        d="M24 10C16.27 10 10 16.27 10 24C10 31.73 16.27 38 24 38C28.46 38 32.41 35.91 34.93 32.65L29.35 31.1C27.81 32.89 25.5 34 22.9 34C18.48 34 14.9 30.42 14.9 26C14.9 21.58 18.48 18 22.9 18C25.32 18 27.5 19.07 29 20.73L34.78 18.91C32.25 15.82 28.36 14 24 14" 
        fill="white" 
      />
      <path 
        d="M26.2 24.2C25.4 22.8 24.3 21.9 23.3 21.9C22.1 21.9 21.3 22.9 21.3 24.3C21.3 25.7 22.1 26.7 23.3 26.7C24.3 26.7 25.4 25.8 26.2 24.4V24.2Z" 
        fill="white" 
      />
      <defs>
        <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="50%" stopColor="#7D2AE8" />
          <stop offset="100%" stopColor="#FF6C79" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PhotoshopIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#001829" stroke="#31A8FF" strokeWidth="1.5" />
      <text 
        x="50%" 
        y="68%" 
        fontSize="10" 
        fontFamily="'Space Grotesk', sans-serif" 
        fontWeight="bold" 
        fill="#31A8FF" 
        textAnchor="middle"
      >
        Ps
      </text>
    </svg>
  );
}

export function IllustratorIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#261300" stroke="#FF9A00" strokeWidth="1.5" />
      <text 
        x="50%" 
        y="68%" 
        fontSize="10" 
        fontFamily="'Space Grotesk', sans-serif" 
        fontWeight="bold" 
        fill="#FF9A00" 
        textAnchor="middle"
      >
        Ai
      </text>
    </svg>
  );
}

export function AlightMotionIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="6" fill="url(#alightGrad)" />
      <path 
        d="M6 14C7.5 10.5 10 9 12 9C14.5 9 16 11 18 15" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M6 10C8 13.5 10 15 12 15C14.5 15 16 12 18 9" 
        stroke="white" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        opacity="0.7"
      />
      <defs>
        <linearGradient id="alightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF87" />
          <stop offset="100%" stopColor="#60EFFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CapCutIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path 
        d="M7 6H11L16 12L11 18H7L12 12L7 6Z" 
        fill="#00F0FF" 
      />
      <path 
        d="M17 6H13L8 12L13 18H17L12 12L17 6Z" 
        fill="#FF007A" 
        opacity="0.85"
      />
    </svg>
  );
}

export function Html5Icon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 2L4.82 20.3L12 22.2L19.18 20.3L21 2L3 2ZM17.62 8.7H9.28L9.5 10.9H17.42L16.66 18.2L12 19.5L7.34 18.2L7.02 14.8H9.22L9.38 16.3L12 17L14.62 16.3L14.92 13.1H7.02L6.42 6.5H18.22L17.62 8.7Z" fill="#E34F26" />
    </svg>
  );
}

export function Css3Icon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M3 2L4.82 20.3L12 22.2L19.18 20.3L21 2L3 2ZM17.62 8.7H9.28L9.5 10.9H17.42L16.94 15.6L12 16.9L7.06 15.6L6.74 12.2H8.94L9.1 13.7L12 14.5L14.9 13.7L15.1 10.9H6.42L5.82 6.5H18.22L17.62 8.7Z" fill="#1572B6" />
    </svg>
  );
}

export function JavaScriptIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path d="M19 18.2C18 19.3 16.6 20 14.8 20C12.3 20 10.7 18.3 10.7 15.5H12.8C12.8 17 13.6 18.1 14.8 18.1C15.9 18.1 16.6 17.5 16.6 16.5C16.6 14.4 12.7 14.8 12.7 11.2C12.7 9.1 14.2 7.7 16.6 7.7C18.4 7.7 19.8 8.4 20.6 9.7L19 10.9C18.4 10 17.6 9.6 16.6 9.6C15.6 9.6 15 10.1 15 10.9C15 13.1 19 12.6 19 16.2C19 17 19 17.6 19 18.2ZM7.2 7.8H9.4V16.3C9.4 18.7 8 20 5.6 20C4.3 20 3.2 19.4 2.5 18.3L4.1 17.1C4.5 17.8 5 18.1 5.6 18.1C6.6 18.1 7.2 17.4 7.2 16V7.8Z" fill="#323330" />
    </svg>
  );
}

export function TypeScriptIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text 
        x="13.2" 
        y="19" 
        fontSize="12.5" 
        fontFamily="'Inter', sans-serif" 
        fontWeight="800" 
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        TS
      </text>
    </svg>
  );
}

export function ReactIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(150 12 12)" />
    </svg>
  );
}

export function NextjsIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="black" stroke="#222" strokeWidth="1" />
      <path 
        d="M16.5 7.5L9.5 16.5H8.5V7.5H9.5V13.8L15.3 7.5H16.5ZM14.2 11.2L15.2 12.5V16.5H14.2V11.2Z" 
        fill="white" 
      />
    </svg>
  );
}

export function TailwindIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 6C8.5 6 6 8.5 6 12C6 15.5 8.5 18 12 18C13.5 18 15 17 16 16C15 16 14 15 14 14C14 12.5 15.5 11 17 11C18.5 11 20 12.5 20 14C20 16 18 18 15 18C10 18 8 15.5 8 12C8 8.5 10.5 6 15 6C16.5 6 18 7 18 8C18 9 17 10 15.5 10C14 10 12.5 8.5 12.5 7C12.5 6 13.5 6 14 6H12Z" fill="#06B6D4" />
      <path d="M7.5 10.5C6.5 10.5 5.5 11 4.5 12C5.5 12 6.5 11.5 7.5 11.5C8.5 11.5 9 12 9 12.5C9 13 8 13.5 7 13.5C5 13.5 4 12 4 10C4 8 5.5 7 7.5 7C8.5 7 9.5 7.5 10.5 8C9.5 8 8.5 8.5 8.5 9.5C8.5 10.5 9.5 10.5 10 10.5H7.5Z" fill="#38BDF8" opacity="0.8" />
    </svg>
  );
}

export function NodejsIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L4 6.5V15.5L12 20L20 15.5V6.5L12 2ZM18 14.5L12 18L6 14.5V8.5L12 5L18 8.5V14.5Z" fill="#339933" />
      <path d="M12 7.5L8.5 9.5V13.5L12 15.5L15.5 13.5V9.5L12 7.5ZM12 9.5L13.5 10.5V12.5L12 13.5L10.5 12.5V10.5L12 9.5Z" fill="#339933" opacity="0.7" />
    </svg>
  );
}

export function GitIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M20.6 11.4L12.6 3.4C12.2 3 11.6 3 11.2 3.4L3.4 11.2C3 11.6 3 12.2 3.4 12.6L11.4 20.6C11.8 21 12.4 21 12.8 20.6L20.6 12.8C21 12.4 21 11.8 20.6 11.4ZM11.9 16.9C11.3 16.9 10.9 16.5 10.9 15.9C10.9 15.6 11.1 15.3 11.4 15.1V12.3C11.1 12.1 10.9 11.8 10.9 11.5C10.9 10.9 11.3 10.5 11.9 10.5C12.5 10.5 12.9 10.9 12.9 11.5C12.9 11.8 12.7 12.1 12.4 12.3V15.1C12.7 15.3 12.9 15.6 12.9 15.9C12.9 16.5 12.5 16.9 11.9 16.9Z" fill="#F05032" />
    </svg>
  );
}

export function GithubIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.867 20.165 8.84 21.488C9.34 21.58 9.52 21.272 9.52 21.006C9.52 20.77 9.512 20.143 9.508 19.311C6.73 19.914 6.145 17.973 6.145 17.973C5.69 16.818 5.032 16.51 5.032 16.51C4.126 15.892 5.1 15.904 5.1 15.904C6.102 15.975 6.63 16.934 6.63 16.934C7.52 18.459 8.966 18.019 9.53 17.766C9.62 17.12 9.88 16.68 10.167 16.43C7.947 16.178 5.613 15.318 5.613 11.482C5.613 10.39 6.004 9.497 6.645 8.8C6.542 8.547 6.2 7.528 6.743 6.149C6.743 6.149 7.583 5.88 9.494 7.171C10.292 6.949 11.149 6.838 12 6.834C12.85 6.838 13.708 6.949 14.507 7.171C16.416 5.88 17.254 6.149 17.254 6.149C17.798 7.528 17.457 8.547 17.355 8.8C17.997 9.497 18.385 10.39 18.385 11.482C18.385 15.328 16.047 16.174 13.82 16.422C14.18 16.732 14.498 17.344 14.498 18.281C14.498 19.624 14.486 20.71 14.486 21.036C14.486 21.306 14.664 21.615 15.176 21.515C19.16 20.19 22 16.434 22 12C22 6.477 17.522 2 12 2Z" fill="white" />
    </svg>
  );
}

export function VscodeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1.5 6.5L6.5 2.5L10.5 6.5L6.5 10.5L1.5 6.5Z" fill="#007ACC" />
      <path d="M22.5 6.5L17.5 2.5L13.5 6.5L17.5 10.5L22.5 6.5Z" fill="#007ACC" opacity="0.8" />
      <path d="M6.5 10.5L13.5 6.5L17.5 10.5L10.5 17.5L6.5 10.5Z" fill="#007ACC" />
      <path d="M6.5 2.5L13.5 6.5L10.5 13.5L6.5 10.5L6.5 2.5Z" fill="#007ACC" opacity="0.6" />
    </svg>
  );
}

export function VercelIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 2L22 19.5H2L12 2Z" fill="white" />
    </svg>
  );
}

export function AiSparkIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M9 3L11.5 8.5L17 11L11.5 13.5L9 19L6.5 13.5L1 11L6.5 8.5L9 3Z" fill="#A855F7" />
      <path d="M19 13L20.25 15.75L23 17L20.25 18.25L19 21L17.75 18.25L15 17L17.75 15.75L19 13Z" fill="#F59E0B" />
      <circle cx="6" cy="18" r="1.5" fill="#7C3AED" />
    </svg>
  );
}
