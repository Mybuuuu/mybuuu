'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { 
  TrendingUp, Lightbulb, CheckCircle, Zap, Shield,
  Layers, FileCode, Cpu, Gamepad2, Smartphone, Terminal, Globe, Paintbrush,
  Compass, Award, Puzzle, Clock, Users, Heart
} from 'lucide-react';

const MANAGEMENT_SKILLS = [
  { name: 'Pemikiran Strategis', icon: Compass, desc: 'Merencanakan dan menskalakan solusi bisnis.' },
  { name: 'Penyelesaian Masalah', icon: Puzzle, desc: 'Memecahkan hambatan secara sistematis.' },
  { name: 'Pengambilan Keputusan', icon: Award, desc: 'Menganalisis data kompleks untuk mengambil tindakan.' },
  { name: 'Kepemimpinan', icon: Users, desc: 'Memberdayakan tim untuk berkolaborasi dan memberikan hasil.' },
  { name: 'Manajemen Tim', icon: Heart, desc: 'Membangun budaya tim yang kompak dan komunikatif.' },
  { name: 'Manajemen Waktu', icon: Clock, desc: 'Memaksimalkan hasil melalui jadwal berbasis sprint.' },
];

const TECHNICAL_SKILLS = [
  { name: 'HTML & Kode Semantik', icon: FileCode, desc: 'Struktur standar untuk halaman web.' },
  { name: 'CSS Modern & Layout', icon: Paintbrush, desc: 'Responsive styling, Flexbox, Grid, Tailwind CSS.' },
  { name: 'JavaScript ES6+', icon: Terminal, desc: 'Logika dinamis pada client, closures, dan async data.' },
  { name: 'Desain Responsif', icon: Smartphone, desc: 'Tampilan sempurna di desktop, tablet, dan HP.' },
  { name: 'Dasar UI/UX', icon: Layers, desc: 'Hierarki informasi bersih, keseimbangan visual, mikro-interaksi.' },
  { name: 'AI Assisted Development', icon: Cpu, desc: 'Memanfaatkan AI LLM untuk mempercepat debugging.' },
  { name: 'Roblox Lua Scripting', icon: Gamepad2, desc: 'Scripting event-driven, array, 3D math, mekanik game.' },
  { name: 'Website Building', icon: Globe, desc: 'Membangun website statis dan dinamis secara fungsional.' },
];

const SOFT_SKILLS = [
  { name: 'Adaptabilitas', icon: TrendingUp, desc: 'Cepat menyesuaikan diri saat teknologi dan target bergeser.' },
  { name: 'Konsistensi', icon: CheckCircle, desc: 'Berkomitmen latihan setiap hari untuk menguasai skill baru.' },
  { name: 'Belajar Cepat', icon: Zap, desc: 'Memahami konsep dan dokumentasi dalam waktu singkat.' },
  { name: 'Kreativitas', icon: Lightbulb, desc: 'Merancang solusi visual dan struktural yang unik.' },
  { name: 'Disiplin', icon: Shield, desc: 'Fokus belajar secara mandiri dengan jadwal yang disiplin.' },
];

export default function Skills() {
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
            <TextReveal text="Skill yang Sedang Aku Asah" mode="words" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            <TextReveal text="Aku percaya bahwa proses belajar nggak pernah benar-benar selesai. Setiap project adalah kesempatan untuk berkembang lebih jauh." mode="fade-up" delay={0.15} />
          </motion.p>
        </div>

        {/* Categories grid */}
        <div className="space-y-16">
          {/* 1. Management Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-accent-primary" />
              <h3 className="font-space font-extrabold text-xl md:text-2xl text-white uppercase tracking-wider">
                Management Skills
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
                Technical Skills
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
                Soft Skills
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
