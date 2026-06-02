'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import { Award, ShieldCheck, Dumbbell, Users, Target, Zap, ShieldAlert } from 'lucide-react';

const LESSONS = [
  {
    title: 'Disiplin',
    icon: ShieldCheck,
    desc: 'Latihan fisik keras membentuk disiplin harian, yang kini kuterapkan untuk terus fokus belajar dan menulis kode berkualitas setiap hari.',
  },
  {
    title: 'Konsisten',
    icon: Dumbbell,
    desc: 'Mengulang gerakan olahraga ribuan kali mengajariku bahwa penguasaan teknologi pemrograman kompleks hanya bisa dicapai lewat latihan terus-menerus.',
  },
  {
    title: 'Mental Tangguh',
    icon: ShieldAlert,
    desc: 'Tetap tenang di bawah tekanan kompetisi melatihku untuk berpikir logis dan sistematis saat memecahkan masalah atau memperbaiki bug sistem.',
  },
  {
    title: 'Kerja Sama Tim',
    icon: Users,
    desc: 'Memahami peran pemain dan membangun rasa percaya di lapangan olahraga sama pentingnya dengan berkolaborasi dalam tim developer.',
  },
  {
    title: 'Pantang Menyerah',
    icon: Zap,
    desc: 'Keinginan untuk selalu melampaui batas kemampuan kemarin mendorongku untuk terus mengeksplorasi teknologi modern dan solusi kreatif.',
  },
  {
    title: 'Fokus pada Target',
    icon: Target,
    desc: 'Menentukan langkah taktis untuk memenangkan pertandingan membentuk kebiasaan merencanakan sprint proyek coding secara terarah.',
  },
];

export default function SportsAchievement() {
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
              <TextReveal text="Pelajaran dari Dunia Olahraga" mode="words" />
            </h2>
            
            <div className="glass-card p-6 rounded-2xl mb-6 w-full">
              <h3 className="font-space font-extrabold text-lg text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
                <TextReveal text="Atlet POPROV" mode="words" />
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-sans">
                <TextReveal text="Sebelum mendalami teknologi, aku banyak belajar dari dunia olahraga. Pernah berkompetisi hingga tingkat POPROV dan mendapatkan banyak pelajaran berharga yang masih aku bawa sampai sekarang." mode="fade-up" delay={0.1} />
              </p>
            </div>

            <p className="text-text-secondary text-base leading-relaxed font-sans">
              <TextReveal text="Olahraga mengajariku bahwa kekuatan fisik kalah penting dibanding ketangguhan mental. Aku membawa mentalitas disiplin dan pantang menyerah ini ke dalam dunia coding." mode="fade-up" delay={0.15} />
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
