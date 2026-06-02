import React from 'react';
import BackgroundSparks from './BackgroundSparks';

export default function BackgroundEffects() {
  return (
    <>
      {/* Dynamic Noise Grain Overlay */}
      <div className="noise-overlay" />

      {/* Drifting Background Accent Orbs (Static & Subtle) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Violet Ambient Light (Top Right) */}
        <div className="absolute top-[5%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent-primary/4 filter blur-[100px] accelerated" />

        {/* Purple Ambient Light (Bottom Left) */}
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-accent-secondary/3 filter blur-[120px] accelerated" />

        {/* Deep Blue/Violet Accent Light (Center Center) */}
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-blue-600/2 filter blur-[90px] accelerated" />
      </div>

      {/* Subtle Dynamic Ambient Sparks & Cursor Trail Sparks */}
      <BackgroundSparks />
    </>
  );
}
