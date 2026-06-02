'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Rocket, Zap } from 'lucide-react';
import TextReveal from './TextReveal';

const GOALS = [
  {
    year: '2025',
    title: 'Memperdalam Skill Web Development',
    icon: Zap,
    desc: 'Menguasai framework modern (Next.js, React), styling layers (Tailwind, CSS), dan logika pemrograman. Berkomitmen menulis kode yang terstandarisasi dan bersih.',
  },
  {
    year: '2026',
    title: 'Mengerjakan Proyek Nyata',
    icon: Compass,
    desc: 'Mengerjakan project yang digunakan oleh banyak orang. Menangani optimasi performa, kecepatan rendering, dan integrasi data yang stabil.',
  },
  {
    year: '2027',
    title: 'Menggabungkan Bisnis & Teknologi',
    icon: Target,
    desc: 'Menggabungkan strategi bisnis manajemen dengan pengembangan software secara langsung untuk membangun solusi digital yang nyata dan strategis.',
  },
  {
    year: 'Masa Depan',
    title: 'Membangun Produk Digital Berdampak',
    icon: Rocket,
    desc: 'Membangun produk digital mandiri yang memberikan dampak positif luas bagi masyarakat, industri, dan mempermudah kehidupan sehari-hari.',
  },
];

export default function FutureGoals() {
  return (
    <section id="future" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            <TextReveal text="Target Selanjutnya" mode="words" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            <TextReveal text="Rencana strategis untuk pencapaian dan ambisi teknologi saya ke depan." mode="fade-up" delay={0.15} />
          </motion.p>
        </div>

        {/* Goals Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {GOALS.map((goal, idx) => {
            const IconComponent = goal.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-3xl text-left flex flex-col justify-between relative overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                <div>
                  {/* Badge */}
                  <span className="inline-block px-2.5 py-1 rounded-full bg-portfolio-surface-secondary border border-portfolio-border text-[10px] font-bold text-text-secondary font-space mb-6">
                    {goal.year}
                  </span>

                  <h3 className="font-space font-bold text-lg md:text-xl text-white mb-4 leading-snug">
                    {goal.title}
                  </h3>

                  <p className="text-text-secondary text-xs md:text-sm font-sans leading-relaxed">
                    {goal.desc}
                  </p>
                </div>

                {/* Footer Icon Indicator */}
                <div className="mt-8 border-t border-portfolio-border pt-4 flex items-center justify-between text-text-secondary group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest font-space">
                    Target Node
                  </span>
                  <IconComponent size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
