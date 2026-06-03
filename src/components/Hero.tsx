'use client';

import React from 'react';
import { ArrowRight, Download, Award, Target, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lanyard from './Lanyard';
import Magnetic from './Magnetic';
import InteractivePortrait from './InteractivePortrait';
import TextReveal from './TextReveal';
import Typewriter from './Typewriter';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  introComplete?: boolean;
}

export default function Hero({ introComplete = true }: HeroProps) {
  const { t } = useLanguage();
  // Framer Motion Scroll hooks
  const { scrollY } = useScroll();

  // Background layers move at 10% scroll speed
  const bgY = useTransform(scrollY, [0, 800], [0, 80]);
  
  // Content layers scale, translate-y upwards, and fade/blur
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentBlur = useTransform(scrollY, [0, 450], ['blur(0px)', 'blur(8px)']);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const, // premium ease-out
      },
    },
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToJourney = () => {
    const el = document.getElementById('creative-journey');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Decorative Lights (10% scroll speed) */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-accent-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-accent-secondary/80 rounded-full blur-[120px] opacity-20" />
      </motion.div>

      {/* Interactive Background Portrait System (Mesh gradient, particles, hologram copy layers) */}
      <InteractivePortrait />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={introComplete ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Text Column (Progressive fade-out & blur on scroll) */}
          <motion.div 
            style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }}
            className="col-span-1 lg:col-span-7 flex flex-col items-start text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-portfolio-border bg-portfolio-surface text-[10px] font-bold tracking-widest text-text-secondary uppercase font-space mb-6"
            >
              {t('hero.badge')}
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-space font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-4 py-1 min-h-[1.2em] flex items-center w-full"
            >
              <Typewriter 
                texts={[
                  t('hero.typewriter.hello'),
                  t('hero.typewriter.tech'),
                  t('hero.typewriter.management'),
                  t('hero.typewriter.selfTaught')
                ]}
                delay={200}
                speed={80}
                eraseSpeed={40}
                holdTime={2200}
                cursorColorClass="text-accent-primary"
                isReady={introComplete}
              />
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl font-space font-medium text-white mb-6 leading-snug"
            >
              <TextReveal text={t('hero.title')} mode="words" />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl mb-8 font-sans"
            >
              <TextReveal text={t('hero.description')} mode="fade-up" delay={0.2} />
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 w-full sm:w-auto">
              <Magnetic>
                <button
                  onClick={handleScrollToJourney}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-accent-primary text-white text-sm font-semibold uppercase tracking-wider hover:bg-accent-primary/90 active:scale-95 transition-all duration-300 cursor-pointer w-full sm:w-auto font-space"
                >
                  {t('hero.ctaJourney')}
                  <ArrowRight size={16} />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={handleScrollToProjects}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-accent-gold/25 hover:border-accent-gold/50 text-accent-gold text-sm font-semibold uppercase tracking-wider hover:bg-accent-gold/5 active:scale-95 transition-all duration-300 cursor-pointer w-full sm:w-auto font-space"
                >
                  {t('hero.ctaProjects')}
                  <Download size={16} />
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Column Spacer (The lanyard hangs absolute in the center, so this column acts as beautiful negative space) */}
          <div className="col-span-1 lg:col-span-5 hidden lg:block pointer-events-none" />
        </motion.div>

        {/* Stats Grid Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20"
        >
          {/* Card 01 */}
          <div className="glass-card p-5 rounded-2xl flex items-start gap-4">
            <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary">
              <Cpu size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-space font-bold text-2xl text-white">10+</h4>
              <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mt-1">{t('hero.stats.projectsTitle')}</p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="glass-card p-5 rounded-2xl flex items-start gap-4">
            <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary">
              <Cpu size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-space font-bold text-xl text-white">{t('hero.stats.selfTaughtValue')}</h4>
              <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mt-1.5">{t('hero.stats.selfTaughtTitle')}</p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:border-accent-gold/25 transition-all duration-300">
            <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-accent-gold">
              <Award size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-space font-bold text-2xl text-white">POPROV</h4>
              <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mt-1">{t('hero.stats.sportsTitle')}</p>
            </div>
          </div>

          {/* Card 04 */}
          <div className="glass-card p-5 rounded-2xl flex items-start gap-4">
            <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary">
              <Target size={18} />
            </div>
            <div className="text-left">
              <h4 className="font-space font-bold text-xl text-white">{t('hero.stats.futureValue')}</h4>
              <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider mt-1.5">{t('hero.stats.futureTitle')}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dynamic Lanyard System - absolute positioned overlay hanging from top center of Hero viewport */}
      <Lanyard isReady={introComplete} />
    </section>
  );
}
