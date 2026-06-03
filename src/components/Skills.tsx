'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { 
  TrendingUp, Lightbulb, CheckCircle, Zap, Shield,
  Layers, FileCode, Cpu, Gamepad2, Smartphone, Terminal, Globe, Paintbrush,
  Compass, Award, Puzzle, Clock, Users, Heart
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const MANAGEMENT_SKILLS = [
    { name: t('skills.managementSkills.skill1.name'), icon: Compass, desc: t('skills.managementSkills.skill1.desc') },
    { name: t('skills.managementSkills.skill2.name'), icon: Puzzle, desc: t('skills.managementSkills.skill2.desc') },
    { name: t('skills.managementSkills.skill3.name'), icon: Award, desc: t('skills.managementSkills.skill3.desc') },
    { name: t('skills.managementSkills.skill4.name'), icon: Users, desc: t('skills.managementSkills.skill4.desc') },
    { name: t('skills.managementSkills.skill5.name'), icon: Heart, desc: t('skills.managementSkills.skill5.desc') },
    { name: t('skills.managementSkills.skill6.name'), icon: Clock, desc: t('skills.managementSkills.skill6.desc') },
  ];

  const TECHNICAL_SKILLS = [
    { name: t('skills.technicalSkills.skill1.name'), icon: FileCode, desc: t('skills.technicalSkills.skill1.desc') },
    { name: t('skills.technicalSkills.skill2.name'), icon: Paintbrush, desc: t('skills.technicalSkills.skill2.desc') },
    { name: t('skills.technicalSkills.skill3.name'), icon: Terminal, desc: t('skills.technicalSkills.skill3.desc') },
    { name: t('skills.technicalSkills.skill4.name'), icon: Smartphone, desc: t('skills.technicalSkills.skill4.desc') },
    { name: t('skills.technicalSkills.skill5.name'), icon: Layers, desc: t('skills.technicalSkills.skill5.desc') },
    { name: t('skills.technicalSkills.skill6.name'), icon: Cpu, desc: t('skills.technicalSkills.skill6.desc') },
    { name: t('skills.technicalSkills.skill7.name'), icon: Gamepad2, desc: t('skills.technicalSkills.skill7.desc') },
    { name: t('skills.technicalSkills.skill8.name'), icon: Globe, desc: t('skills.technicalSkills.skill8.desc') },
  ];

  const SOFT_SKILLS = [
    { name: t('skills.softSkills.skill1.name'), icon: TrendingUp, desc: t('skills.softSkills.skill1.desc') },
    { name: t('skills.softSkills.skill2.name'), icon: CheckCircle, desc: t('skills.softSkills.skill2.desc') },
    { name: t('skills.softSkills.skill3.name'), icon: Zap, desc: t('skills.softSkills.skill3.desc') },
    { name: t('skills.softSkills.skill4.name'), icon: Lightbulb, desc: t('skills.softSkills.skill4.desc') },
    { name: t('skills.softSkills.skill5.name'), icon: Shield, desc: t('skills.softSkills.skill5.desc') },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="skills" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            <TextReveal text={t('skills.sectionTitle')} mode="words" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            <TextReveal text={t('skills.sectionDesc')} mode="fade-up" delay={0.15} />
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="space-y-16">
          {/* 1. Management Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-accent-primary" />
              <h3 className="font-space font-extrabold text-xl md:text-2xl text-white uppercase tracking-wider">
                {t('skills.categories.management')}
              </h3>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {MANAGEMENT_SKILLS.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="glass-card p-6 rounded-2xl flex gap-4 hover:border-white/15 text-left relative overflow-hidden group transition-all"
                  >
                    <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary flex-shrink-0 h-fit">
                      <IconComponent size={18} />
                    </div>
                    <div>
                      <h4 className="font-space font-bold text-white text-base md:text-lg mb-1">{skill.name}</h4>
                      <p className="text-text-secondary text-xs md:text-sm font-sans leading-relaxed">{skill.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 2. Technical Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-accent-secondary" />
              <h3 className="font-space font-extrabold text-xl md:text-2xl text-white uppercase tracking-wider">
                {t('skills.categories.technical')}
              </h3>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TECHNICAL_SKILLS.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="glass-card p-6 rounded-2xl flex flex-col items-start text-left hover:border-white/15 relative overflow-hidden group transition-all"
                  >
                    <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary mb-4 flex-shrink-0">
                      <IconComponent size={18} />
                    </div>
                    <h4 className="font-space font-bold text-white text-base md:text-lg mb-2">{skill.name}</h4>
                    <p className="text-text-secondary text-xs md:text-sm font-sans leading-relaxed">{skill.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 3. Soft Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-white/20" />
              <h3 className="font-space font-extrabold text-xl md:text-2xl text-white uppercase tracking-wider">
                {t('skills.categories.soft')}
              </h3>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {SOFT_SKILLS.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="glass-card p-6 rounded-2xl flex flex-col items-start text-left hover:border-white/15 relative overflow-hidden group transition-all"
                  >
                    <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary mb-4 flex-shrink-0">
                      <IconComponent size={18} />
                    </div>
                    <h4 className="font-space font-bold text-white text-sm md:text-base mb-2">{skill.name}</h4>
                    <p className="text-text-secondary text-xs font-sans leading-relaxed">{skill.desc}</p>
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
