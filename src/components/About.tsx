'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Trophy, Palette, GraduationCap, Code2, Rocket } from 'lucide-react';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this container to animate the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const TIMELINE_EVENTS = [
    {
      icon: Trophy,
      year: t('about.timelineEvents.event1.year'),
      title: t('about.timelineEvents.event1.title'),
      desc: t('about.timelineEvents.event1.desc'),
    },
    {
      icon: Palette,
      year: t('about.timelineEvents.event2.year'),
      title: t('about.timelineEvents.event2.title'),
      desc: t('about.timelineEvents.event2.desc'),
    },
    {
      icon: GraduationCap,
      year: t('about.timelineEvents.event3.year'),
      title: t('about.timelineEvents.event3.title'),
      desc: t('about.timelineEvents.event3.desc'),
    },
    {
      icon: Code2,
      year: t('about.timelineEvents.event4.year'),
      title: t('about.timelineEvents.event4.title'),
      desc: t('about.timelineEvents.event4.desc'),
    },
    {
      icon: Rocket,
      year: t('about.timelineEvents.event5.year'),
      title: t('about.timelineEvents.event5.title'),
      desc: t('about.timelineEvents.event5.desc'),
    },
  ];

  return (
    <section id="about" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            <TextReveal text={t('about.sectionTitle')} mode="words" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            <TextReveal text={t('about.sectionDesc')} mode="fade-up" delay={0.15} />
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto pl-8 md:pl-0">
          {/* Central Vertical Timeline Line (Desktop: center, Mobile: left) */}
          <div className="absolute left-[16px] md:left-1/2 top-4 bottom-4 w-[2px] bg-portfolio-border -translate-x-1/2 z-0">
            {/* Scrolled filled vertical line */}
            <motion.div 
              className="w-full h-full bg-white origin-top"
              style={{ scaleY }}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {TIMELINE_EVENTS.map((event, idx) => {
              const IconComponent = event.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-col md:flex-row items-start z-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node Badge */}
                  <motion.div 
                    initial={{ scale: 0.9, borderColor: 'rgba(255, 255, 255, 0.08)', backgroundColor: '#0F0F0F', color: '#A1A1AA' }}
                    whileInView={{ 
                      scale: 1.15, 
                      borderColor: '#7C3AED', // accent-primary color
                      backgroundColor: '#151515', 
                      color: '#FFFFFF',
                      boxShadow: '0 0 12px rgba(124, 58, 237, 0.25)'
                    }}
                    viewport={{ once: false, margin: '-30% 0px -30% 0px' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute left-[16px] md:left-1/2 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border z-20 -translate-x-1/2"
                  >
                    <IconComponent size={12} />
                  </motion.div>

                  {/* Spacer for desktop layout (takes half width) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card (takes other half width) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, y: 25 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full md:w-[45%] glass-card p-6 rounded-2xl relative text-left"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-primary font-space block mb-2">
                      {event.year}
                    </span>
                    <h3 className="font-space font-bold text-lg md:text-xl text-white mb-3">
                      {event.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                      {event.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
