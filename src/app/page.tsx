'use client';

import React, { useState } from 'react';
import CustomCursor from '../components/CustomCursor';
import CursorGlow from '../components/CursorGlow';
import BackgroundEffects from '../components/BackgroundEffects';
import SmoothScroll from '../components/SmoothScroll';
import IntroLoader from '../components/IntroLoader';
import ScrollProgress from '../components/ScrollProgress';
import Marquee from '../components/Marquee';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InteractiveJourney from '../components/InteractiveJourney';
import CreativeJourney from '../components/CreativeJourney';
import About from '../components/About';
import Skills from '../components/Skills';
import SportsAchievement from '../components/SportsAchievement';
import Projects from '../components/Projects';
import Philosophy from '../components/Philosophy';
import FutureGoals from '../components/FutureGoals';
import Footer from '../components/Footer';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main className="relative bg-portfolio-bg text-white min-h-screen selection:bg-accent-primary/30 selection:text-white font-sans overflow-hidden">
      {/* Premium Loading Intro */}
      <IntroLoader onComplete={() => setIntroComplete(true)} />

      {/* Inertial Momentum Smooth Scroll Solver */}
      <SmoothScroll />

      {/* Thin Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Background drifting stars particle simulation, grain, and blurs */}
      <BackgroundEffects />

      {/* Soft background glow following cursor */}
      <CursorGlow />

      {/* Advanced Spring-Loaded Custom Cursor System */}
      <CustomCursor />

      {/* Fixed Futuristic Grid Background Overlay */}
      <div className="grid-background" />

      {/* Sticky Floating Navbar */}
      <Navbar />

      {/* Main long-form section containers */}
      <div 
        style={{ 
          opacity: introComplete ? 1 : 0, 
          transform: introComplete ? 'translate3d(0,0,0)' : 'translate3d(0,25px,0)',
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' 
        }}
        className="relative z-10 flex flex-col w-full"
      >
        {/* Home / Hero Section */}
        <Hero introComplete={introComplete} />

        {/* Seamless Loop Marquee 1 (Forward, between Hero and Journey) */}
        <Marquee 
          items={['BELAJAR', 'MEMBANGUN', 'TUMBUH', 'BERKREASI']} 
          direction="forward" 
          speed="normal" 
          separator="•" 
        />

        {/* Interactive Journey Map Milestone */}
        <InteractiveJourney />

        {/* Creative Visual Design Journey Section */}
        <CreativeJourney />

        {/* Chronological Vertical Timeline About Section */}
        <About />

        {/* Skills Cards Grid */}
        <Skills />

        {/* Seamless Loop Marquee 2 (Reverse, between Skills and Sports) */}
        <Marquee 
          items={['MANAJEMEN', 'TEKNOLOGI', 'INOVASI', 'STRATEGI']} 
          direction="reverse" 
          speed="slow" 
          separator="×" 
        />

        {/* POPROV Sports Milestone Section */}
        <SportsAchievement />

        {/* Projects Showcase Cards Grid */}
        <Projects />

        {/* Conceptual Philosophy Quote Panel */}
        <Philosophy />

        {/* Seamless Loop Marquee 3 (Forward, between Philosophy and Future) */}
        <Marquee 
          items={['SELF-TAUGHT DEVELOPER', 'WIRAUSAHAWAN MASA DEPAN', 'FUTURE BUILDER']} 
          direction="forward" 
          speed="slow" 
          separator="•" 
        />

        {/* Strategic Futures Goals Roadmap */}
        <FutureGoals />

        {/* Footer legal & tagline metadata */}
        <Footer />
      </div>
    </main>
  );
}
