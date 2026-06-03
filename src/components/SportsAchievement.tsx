'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { Award, ShieldCheck, Dumbbell, Users, Target, Zap, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SportsAchievement() {
  const { t } = useLanguage();

  const LESSONS = [
    {
      title: t('sports.lessons.lesson1.title'),
      icon: ShieldCheck,
      desc: t('sports.lessons.lesson1.desc'),
    },
    {
      title: t('sports.lessons.lesson2.title'),
      icon: Dumbbell,
      desc: t('sports.lessons.lesson2.desc'),
    },
    {
      title: t('sports.lessons.lesson3.title'),
      icon: ShieldAlert,
      desc: t('sports.lessons.lesson3.desc'),
    },
    {
      title: t('sports.lessons.lesson4.title'),
      icon: Users,
      desc: t('sports.lessons.lesson4.desc'),
    },
    {
      title: t('sports.lessons.lesson5.title'),
      icon: Zap,
      desc: t('sports.lessons.lesson5.desc'),
    },
    {
      title: t('sports.lessons.lesson6.title'),
      icon: Target,
      desc: t('sports.lessons.lesson6.desc'),
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="sports" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-[30%] left-[5%] w-[350px] h-[350px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Summary Info Card */}
          <div className="col-span-1 lg:col-span-5 text-left flex flex-col items-start">
            <div className="p-3 bg-portfolio-surface border border-portfolio-border rounded-2xl text-text-secondary mb-6">
              <Award size={28} />
            </div>
            
            <h2 className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-6">
              <TextReveal text={t('sports.sectionTitle')} mode="words" />
            </h2>
            
            <div className="glass-card p-6 rounded-2xl mb-6 w-full">
              <h3 className="font-space font-extrabold text-lg text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
                <TextReveal text={t('sports.cardTitle')} mode="words" />
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-sans">
                <TextReveal text={t('sports.cardDesc')} mode="fade-up" delay={0.1} />
              </p>
            </div>

            <p className="text-text-secondary text-base leading-relaxed font-sans">
              <TextReveal text={t('sports.sidebarDesc')} mode="fade-up" delay={0.15} />
            </p>
          </div>

          {/* Right Lessons Grid */}
          <div className="col-span-1 lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {LESSONS.map((lesson, idx) => {
                const IconComponent = lesson.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="glass-card p-6 rounded-2xl text-left relative overflow-hidden group hover:border-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="p-2 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary flex-shrink-0">
                        <IconComponent size={16} />
                      </div>
                      <h4 className="font-space font-bold text-white text-base md:text-lg">
                        {lesson.title}
                      </h4>
                    </div>
                    <p className="text-text-secondary text-xs md:text-sm font-sans leading-relaxed">
                      {lesson.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
