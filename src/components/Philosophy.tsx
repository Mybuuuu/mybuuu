'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu } from 'lucide-react';
import TextReveal from './TextReveal';

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Lights */}
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] h-[450px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            <TextReveal text="Cara Aku Melihat Proses" mode="words" />
          </motion.h2>
        </div>

        {/* Large Quote Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden mb-12"
        >
          <p className="font-space font-medium italic text-xl md:text-3xl lg:text-4xl text-white leading-relaxed relative z-10 mb-6">
            <TextReveal text='"Jurusan mungkin menentukan tempat kita memulai, tapi bukan menentukan sejauh apa kita bisa berkembang."' mode="words" delay={0.1} />
          </p>
          <span className="text-text-secondary font-bold uppercase tracking-widest text-xs md:text-sm font-space">
            — Keyakinanku
          </span>
        </motion.div>

        {/* Duality Split Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-12 max-w-4xl mx-auto">
          {/* Management Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl text-left flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary w-fit mb-6">
                <Compass size={20} />
              </div>
              <h3 className="font-space font-extrabold text-xl text-white mb-3">Strategi Manajemen</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                Manajemen mengajarkanku cara memahami masalah. Ini memberiku sudut pandang luas tentang strategi operasional, kepemimpinan, dan bagaimana mengelola proyek secara terarah.
              </p>
            </div>
            <div className="mt-8 border-t border-portfolio-border pt-4 text-xs font-bold uppercase tracking-widest text-text-secondary font-space">
              Kerangka Berpikir Strategis
            </div>
          </motion.div>

          {/* Programming Block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl text-left flex flex-col justify-between"
          >
            <div>
              <div className="p-2.5 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl text-text-secondary w-fit mb-6">
                <Cpu size={20} />
              </div>
              <h3 className="font-space font-extrabold text-xl text-white mb-3">Eksekusi Pemrograman</h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans">
                Pemrograman mengajarkanku cara membangun solusi nyata. Ini melatih logika, memecahkan masalah secara taktis, dan mewujudkan ide menjadi produk yang berfungsi dengan baik.
              </p>
            </div>
            <div className="mt-8 border-t border-portfolio-border pt-4 text-xs font-bold uppercase tracking-widest text-text-secondary font-space">
              Eksekusi Teknis
            </div>
          </motion.div>
        </div>

        {/* Closing Foundation Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-text-secondary text-sm md:text-base font-space font-bold uppercase tracking-widest"
        >
          Ketika keduanya digabungkan, aku bisa melihat tantangan dari sudut pandang yang lebih luas.
        </motion.div>
      </div>
    </section>
  );
}
