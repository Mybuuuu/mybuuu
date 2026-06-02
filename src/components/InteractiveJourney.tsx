'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Palette, GraduationCap, Code2, Rocket } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Provincial Athlete (POPROV)',
    label: 'POPROV Athlete',
    icon: Trophy,
    timeline: 'Athletics Foundation',
    shortDesc: 'Developed discipline, consistency, resilience, and a competitive mindset.',
    longDesc: 'Competing as a provincial athlete taught me that success is a product of long-term dedication, physical and mental discipline, and resilience. I apply this competitive and hard-working mindset to coding and strategy every day.',
  },
  {
    id: 2,
    title: 'Creative Visual Designer',
    label: 'Visual Designer',
    icon: Palette,
    timeline: 'Visual & Branding Stage',
    shortDesc: 'Explored visual communication through posters, infographics, branding, and promotional materials.',
    longDesc: 'Before programming, I developed visual assets for my church community and commercial promotions like Es Teh Poci. Designing taught me the power of layout, color theory, typography, and how to capture user attention.',
  },
  {
    id: 3,
    title: 'Management Student',
    label: 'Management Student',
    icon: GraduationCap,
    timeline: 'Business Strategy',
    shortDesc: 'Learned strategic thinking, leadership, decision-making, and problem-solving.',
    longDesc: 'My management studies at university taught me strategic business thinking, human resource management, and operations. This business logic helps me design digital products that solve real problems.',
  },
  {
    id: 4,
    title: 'Self-Taught Developer',
    label: 'Self-Taught Developer',
    icon: Code2,
    timeline: 'Programming Pivot',
    shortDesc: 'Began learning programming and web development independently through real-world projects.',
    longDesc: 'Independently mastering programming using online resources, documentation, and utilizing AI as a learning accelerator. Building modern, beautiful web projects with HTML, CSS, JavaScript, React, and Next.js.',
  },
  {
    id: 5,
    title: 'Future Digital Builder',
    label: 'Future Builder',
    icon: Rocket,
    timeline: 'Strategic Tech Vision',
    shortDesc: 'Combining sports discipline, visual creativity, business thinking, and technology.',
    longDesc: 'Combining all my strengths: sports discipline, visual design, strategic management, and modern programming. I aim to build technology-first solutions that deliver premium value and unforgettable digital experiences.',
  },
];

export default function InteractiveJourney() {
  const [activeStep, setActiveStep] = useState(3); // Start with Roblox Developer active as it's the pivot!

  return (
    <section id="journey" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Lights */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            Dari Manajemen ke Pemrograman
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg"
          >
            Peta jalan interaktif bagaimana konsep manajemen dan logika pemrograman bertemu. Klik pada setiap node milstone untuk menjelajah cerita.
          </motion.p>
        </div>

        {/* Horizontal Journey Map for Desktop */}
        <div className="hidden md:block relative mb-16 select-none">
          {/* SVG Connection Line */}
          <svg className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[2px] z-0" fill="none">
            {/* Background line */}
            <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
            {/* Active connection line */}
            <motion.line
              x1="0"
              y1="1"
              x2={`${(activeStep - 1) * 25 + 12.5}%`}
              y2="1"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              initial={{ x2: '12.5%' }}
              animate={{ x2: `${(activeStep - 1) * 25 + 12.5}%` }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </svg>

          {/* Steps Nodes Grid */}
          <div className="grid grid-cols-5 relative z-10 w-full">
            {STEPS.map((step) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isPassed = step.id < activeStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Timeline Badge */}
                  <span className={`text-[10px] font-bold uppercase tracking-widest font-space mb-4 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {step.timeline}
                  </span>

                  {/* Node Button */}
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center glass-card transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'border-white bg-white/10 scale-105' 
                        : isPassed
                          ? 'border-white/30 bg-white/5 text-white'
                          : 'border-white/10 hover:border-white/20 text-text-secondary'
                    }`}
                  >
                    <IconComponent size={18} className={isActive ? 'text-white' : isPassed ? 'text-white/80' : 'text-text-secondary'} />
                  </button>

                  {/* Node Title */}
                  <h3 className={`mt-4 font-space font-bold text-sm tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-white'
                  }`}>
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical Journey Map for Mobile */}
        <div className="md:hidden relative flex flex-col space-y-8 pl-8 mb-12">
          {/* Vertical Connection Line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-portfolio-border z-0">
            <motion.div 
              className="w-full bg-white/20"
              initial={{ height: '0%' }}
              animate={{ height: `${(activeStep - 1) * 25}%` }}
              transition={{ duration: 0.6 }}
              style={{ maxHeight: '100%' }}
            />
          </div>

          {STEPS.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative flex items-start text-left gap-4 p-4 rounded-2xl border transition-all duration-300 w-full cursor-pointer ${
                  isActive 
                    ? 'glass-card border-white/15 bg-white/[0.02]' 
                    : 'border-transparent bg-transparent'
                }`}
              >
                {/* Vertical Node Icon wrapper */}
                <div className={`absolute left-[-29px] w-[26px] h-[26px] rounded-full flex items-center justify-center border z-10 bg-portfolio-bg transition-colors ${
                  isActive 
                    ? 'border-white text-white' 
                    : 'border-portfolio-border text-text-secondary'
                }`}>
                  <IconComponent size={12} />
                </div>

                <div className="flex-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
                    {step.timeline}
                  </span>
                  <h3 className={`font-space font-bold text-base transition-colors ${
                    isActive ? 'text-white' : 'text-text-secondary'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    {step.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Display Panel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden text-left"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
                {/* Left Mini Icon Indicator */}
                <div className="p-3.5 bg-portfolio-surface border border-portfolio-border rounded-2xl text-text-secondary flex-shrink-0">
                  {React.createElement(STEPS[activeStep - 1].icon, { size: 28 })}
                </div>

                {/* Right Description */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-portfolio-surface border border-portfolio-border text-[10px] font-bold uppercase tracking-widest text-text-secondary font-space">
                      {STEPS[activeStep - 1].timeline}
                    </span>
                  </div>
                  
                  <h3 className="font-space font-extrabold text-2xl md:text-3xl text-white mb-4">
                    {STEPS[activeStep - 1].title}
                  </h3>
                  
                  <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed mb-4 border-l-2 border-white/20 pl-4">
                    {STEPS[activeStep - 1].shortDesc}
                  </p>
                  
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                    {STEPS[activeStep - 1].longDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
