'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Layers, 
  MessageSquare, 
  Lightbulb, 
  Shield, 
  Target, 
  BookOpen, 
  CheckCircle,
  Users,
  ShoppingBag
} from 'lucide-react';
import useSoundEffects from '../hooks/useSoundEffects';
import { useLanguage } from '../context/LanguageContext';

export default function CreativeJourney() {
  const { t } = useLanguage();
  const { playHover } = useSoundEffects();

  const DESIGN_CARDS = [
    {
      icon: MessageSquare,
      title: t('creativeJourney.designCards.card1.title'),
      desc: t('creativeJourney.designCards.card1.desc')
    },
    {
      icon: Lightbulb,
      title: t('creativeJourney.designCards.card2.title'),
      desc: t('creativeJourney.designCards.card2.desc')
    },
    {
      icon: Shield,
      title: t('creativeJourney.designCards.card3.title'),
      desc: t('creativeJourney.designCards.card3.desc')
    },
    {
      icon: Target,
      title: t('creativeJourney.designCards.card4.title'),
      desc: t('creativeJourney.designCards.card4.desc')
    },
    {
      icon: BookOpen,
      title: t('creativeJourney.designCards.card5.title'),
      desc: t('creativeJourney.designCards.card5.desc')
    },
    {
      icon: CheckCircle,
      title: t('creativeJourney.designCards.card6.title'),
      desc: t('creativeJourney.designCards.card6.desc')
    }
  ];

  const card1Projects = [0, 1, 2, 3, 4, 5].map(i => t(`creativeJourney.experienceCard1.projects.${i}`));
  const card1Skills = [0, 1, 2, 3, 4, 5, 6].map(i => t(`creativeJourney.experienceCard1.skills.${i}`));
  
  const card2Projects = [0, 1, 2, 3, 4, 5].map(i => t(`creativeJourney.experienceCard2.projects.${i}`));
  const card2Skills = [0, 1, 2, 3, 4, 5].map(i => t(`creativeJourney.experienceCard2.skills.${i}`));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="creative-journey" className="relative py-24 border-b border-portfolio-border overflow-hidden bg-portfolio-bg">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-portfolio-border bg-portfolio-surface text-[10px] font-bold tracking-widest text-text-secondary uppercase font-space mb-6"
          >
            <Palette size={10} />
            {t('creativeJourney.badge')}
          </motion.div>
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            {t('creativeJourney.sectionTitle')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed font-sans"
          >
            {t('creativeJourney.sectionDesc')}
          </motion.p>
        </div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
        >
          {/* Experience Card 01 - Church Community */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={playHover}
            className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-portfolio-border hover:border-white/15 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary font-mono">
                  {t('creativeJourney.experienceCard1.timeline')}
                </span>
                <h3 className="font-space font-extrabold text-2xl text-white mt-1">
                  {t('creativeJourney.experienceCard1.title')}
                </h3>
                <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <Users size={14} className="text-accent-primary" />
                  {t('creativeJourney.experienceCard1.location')}
                </p>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
              {t('creativeJourney.experienceCard1.desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-portfolio-border">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  {t('creativeJourney.experienceCard1.projectListTitle')}
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  {card1Projects.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  {t('creativeJourney.experienceCard1.skillsTitle')}
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  {card1Skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Experience Card 02 - Es Teh Poci */}
          <motion.div
            variants={itemVariants}
            onMouseEnter={playHover}
            className="glass-card p-8 rounded-3xl relative overflow-hidden group border border-portfolio-border hover:border-white/15 transition-all duration-300 text-left"
          >
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary font-mono">
                  {t('creativeJourney.experienceCard2.timeline')}
                </span>
                <h3 className="font-space font-extrabold text-2xl text-white mt-1">
                  {t('creativeJourney.experienceCard2.title')}
                </h3>
                <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-accent-secondary" />
                  {t('creativeJourney.experienceCard2.location')}
                </p>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
              {t('creativeJourney.experienceCard2.desc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-portfolio-border">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  {t('creativeJourney.experienceCard2.projectListTitle')}
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  {card2Projects.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  {t('creativeJourney.experienceCard2.skillsTitle')}
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  {card2Skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Design Impact Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-space font-extrabold text-3xl tracking-tight text-white mb-4"
            >
              {t('creativeJourney.lessonsTitle')}
            </motion.h3>
            <p className="text-text-secondary text-xs font-bold uppercase tracking-wider font-space">
              {t('creativeJourney.lessonsSubtitle')}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {DESIGN_CARDS.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  onMouseEnter={playHover}
                  className="glass-card p-6 rounded-2xl border border-portfolio-border hover:border-accent-primary/25 hover:translate-y-[-5px] transition-all duration-300 text-left flex flex-col items-start"
                >
                  <div className="p-3 bg-accent-primary/10 text-accent-secondary rounded-xl mb-4">
                    <IconComp size={20} />
                  </div>
                  <h4 className="font-space font-bold text-lg text-white mb-2">
                    {card.title}
                  </h4>
                  <p className="text-text-secondary text-xs leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Connection to Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12 rounded-3xl border border-portfolio-border/60 bg-gradient-to-br from-portfolio-surface/50 to-portfolio-bg relative overflow-hidden"
        >
          <div className="absolute -top-[100px] -left-[100px] w-[250px] h-[250px] bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-[100px] -right-[100px] w-[250px] h-[250px] bg-accent-secondary/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="p-3 bg-portfolio-surface border border-portfolio-border rounded-full text-text-secondary mb-6"
            >
              <Layers size={22} />
            </motion.div>

            <h3 className="font-space font-extrabold text-3xl md:text-4xl text-white mb-6">
              {t('creativeJourney.techTitle')}
            </h3>

            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-sans">
              {t('creativeJourney.techDesc')}
            </p>

            {/* Formula Visual Grid */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-black/40 px-6 py-4 rounded-2xl border border-portfolio-border shadow-inner max-w-2xl w-full justify-center">
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                {t('creativeJourney.formula.creativity')}
              </div>
              <span className="text-accent-primary font-bold text-lg">+</span>
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                {t('creativeJourney.formula.logic')}
              </div>
              <span className="text-accent-secondary font-bold text-lg">+</span>
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                {t('creativeJourney.formula.strategic')}
              </div>
            </div>

            <p className="text-[10px] font-semibold text-accent-secondary uppercase tracking-widest font-mono mt-6">
              {t('creativeJourney.formulaCaption')}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
