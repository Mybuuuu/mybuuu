'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Palette, GraduationCap, Code2, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function InteractiveJourney() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(3); // Start with Roblox Developer active as it's the pivot!

  const STEPS = useMemo(() => [
    {
      id: 1,
      title: t('interactiveJourney.steps.step1.title'),
      label: t('interactiveJourney.steps.step1.label'),
      icon: Trophy,
      timeline: t('interactiveJourney.steps.step1.timeline'),
      shortDesc: t('interactiveJourney.steps.step1.shortDesc'),
      longDesc: t('interactiveJourney.steps.step1.longDesc'),
    },
    {
      id: 2,
      title: t('interactiveJourney.steps.step2.title'),
      label: t('interactiveJourney.steps.step2.label'),
      icon: Palette,
      timeline: t('interactiveJourney.steps.step2.timeline'),
      shortDesc: t('interactiveJourney.steps.step2.shortDesc'),
      longDesc: t('interactiveJourney.steps.step2.longDesc'),
    },
    {
      id: 3,
      title: t('interactiveJourney.steps.step3.title'),
      label: t('interactiveJourney.steps.step3.label'),
      icon: GraduationCap,
      timeline: t('interactiveJourney.steps.step3.timeline'),
      shortDesc: t('interactiveJourney.steps.step3.shortDesc'),
      longDesc: t('interactiveJourney.steps.step3.longDesc'),
    },
    {
      id: 4,
      title: t('interactiveJourney.steps.step4.title'),
      label: t('interactiveJourney.steps.step4.label'),
      icon: Code2,
      timeline: t('interactiveJourney.steps.step4.timeline'),
      shortDesc: t('interactiveJourney.steps.step4.shortDesc'),
      longDesc: t('interactiveJourney.steps.step4.longDesc'),
    },
    {
      id: 5,
      title: t('interactiveJourney.steps.step5.title'),
      label: t('interactiveJourney.steps.step5.label'),
      icon: Rocket,
      timeline: t('interactiveJourney.steps.step5.timeline'),
      shortDesc: t('interactiveJourney.steps.step5.shortDesc'),
      longDesc: t('interactiveJourney.steps.step5.longDesc'),
    },
  ], [t]);

  const currentStep = STEPS.find((step) => step.id === activeStep) || STEPS[2];
  const CurrentIcon = currentStep.icon;

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
            className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            {t('interactiveJourney.sectionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg"
          >
            {t('interactiveJourney.sectionDesc')}
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
              x2={`${(activeStep - 1) * 20 + 10}%`}
              y2="1"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              initial={{ x2: '10%' }}
              animate={{ x2: `${(activeStep - 1) * 20 + 10}%` }}
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
        <div className="md:hidden relative flex flex-col space-y-8 pl-10 mb-12">
          {/* Vertical Connection Line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-portfolio-border z-0">
            <div 
              className="absolute top-0 left-0 w-full bg-white/30 transition-all duration-500" 
              style={{ height: `${(activeStep - 1) * 25}%` }}
            />
          </div>

          {STEPS.map((step) => {
            const IconComponent = step.icon;
            const isActive = activeStep === step.id;
            const isPassed = step.id < activeStep;

            return (
              <div 
                key={step.id} 
                onClick={() => setActiveStep(step.id)}
                className="flex items-center gap-4 text-left relative z-10 cursor-pointer group min-h-[44px]"
              >
                {/* Node circle */}
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 -ml-10 bg-portfolio-bg ${
                  isActive 
                    ? 'border-white text-white bg-white/10' 
                    : isPassed 
                      ? 'border-white/30 text-white/85' 
                      : 'border-portfolio-border text-text-secondary'
                }`}>
                  <IconComponent size={14} />
                </div>
                <div>
                  <span className={`text-[8px] font-mono uppercase tracking-widest block transition-colors ${
                    isActive ? 'text-accent-secondary' : 'text-text-secondary'
                  }`}>
                    {step.timeline}
                  </span>
                  <h3 className={`font-space font-bold text-sm leading-tight transition-colors ${
                    isActive ? 'text-white font-extrabold' : 'text-text-secondary group-hover:text-white'
                  }`}>
                    {step.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Descriptive Content Panel (Framer Motion Cross-Dissolve on step change) */}
        <div className="max-w-4xl mx-auto glass-card p-5 md:p-10 rounded-2xl md:rounded-[32px] border border-portfolio-border/60 relative overflow-hidden bg-portfolio-surface/30">
          <div className="absolute top-[-100px] right-[-100px] w-48 h-48 bg-accent-secondary/5 rounded-full blur-[80px]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
            >
              {/* Left Column icon */}
              <div className="md:col-span-3 flex justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl border border-portfolio-border bg-portfolio-surface-secondary flex items-center justify-center text-accent-primary shadow-xl">
                  <CurrentIcon className="w-10 h-10 md:w-14 md:h-14" />
                </div>
              </div>

              {/* Right Column content details */}
              <div className="md:col-span-9 flex flex-col items-start">
                <span className="text-[10px] font-bold font-space uppercase tracking-widest text-accent-secondary mb-2">
                  {currentStep.timeline}
                </span>
                <h2 className="font-space font-extrabold text-2xl md:text-3xl text-white mb-4">
                  {currentStep.title}
                </h2>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary/70 mb-4 bg-portfolio-surface border border-portfolio-border px-3 py-1 rounded-xl font-space">
                  {currentStep.shortDesc}
                </h4>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                  {currentStep.longDesc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
