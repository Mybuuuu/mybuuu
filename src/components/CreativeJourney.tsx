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

const DESIGN_CARDS = [
  {
    icon: MessageSquare,
    title: 'Komunikasi Visual',
    desc: 'Belajar menyampaikan pesan secara jelas melalui desain dan storytelling visual.'
  },
  {
    icon: Lightbulb,
    title: 'Kreativitas',
    desc: 'Mengembangkan pola pikir kreatif dan penyelesaian masalah melalui tantangan visual.'
  },
  {
    icon: Shield,
    title: 'Branding',
    desc: 'Memahami bagaimana identitas visual dapat membentuk persepsi dan rasa percaya.'
  },
  {
    icon: Target,
    title: 'Interaksi Audiens',
    desc: 'Belajar cara menarik perhatian audiens dan menciptakan pengalaman yang berkesan.'
  },
  {
    icon: BookOpen,
    title: 'Storytelling',
    desc: 'Menggunakan elemen desain untuk mengomunikasikan ide, emosi, dan narasi.'
  },
  {
    icon: CheckCircle,
    title: 'Detail yang Presisi',
    desc: 'Membangun kebiasaan fokus pada akurasi dan kualitas di setiap project.'
  }
];

export default function CreativeJourney() {
  const { playHover } = useSoundEffects();

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
            Desain Visual
          </motion.div>
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-6"
          >
            Kreativitas yang Membentuk Sudut Pandangku
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-lg leading-relaxed font-sans"
          >
            Sebelum belajar pemrograman dan membangun website, aku sangat mendalami komunikasi visual dan desain kreatif. Lewat pembuatan poster, infografis, publikasi acara, hingga materi promosi, aku belajar bahwa desain bukan cuma soal estetika visual, tapi tentang menyampaikan gagasan secara efektif dan menciptakan pengalaman yang bermakna. Pengalaman ini terus memengaruhi caraku melihat teknologi, produk digital, dan penyelesaian masalah hari ini.
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
                  Kelas 11 – Kelas 12 (SMA)
                </span>
                <h3 className="font-space font-extrabold text-2xl text-white mt-1">
                  Desain Visual Kreatif
                </h3>
                <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <Users size={14} className="text-accent-primary" />
                  Komunitas Gereja
                </p>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
              Bertanggung jawab membuat aset visual untuk mendukung kegiatan, acara, dan kebutuhan komunikasi gereja.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-portfolio-border">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  Proyek yang Dikerjakan
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  <li>Poster Acara</li>
                  <li>Banner Acara</li>
                  <li>Konten Media Sosial</li>
                  <li>Infografis Informasi</li>
                  <li>Materi Promosi</li>
                  <li>Visual Branding Acara</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  Skill yang Diasah
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  <li>Komunikasi Visual</li>
                  <li>Tipografi</li>
                  <li>Desain Tata Letak</li>
                  <li>Teori Warna</li>
                  <li>Hierarki Visual</li>
                  <li>Branding Acara</li>
                  <li>Cara Berpikir Kreatif</li>
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
                  Masa Kuliah – Sekarang
                </span>
                <h3 className="font-space font-extrabold text-2xl text-white mt-1">
                  Desain Promosi Visual
                </h3>
                <p className="text-text-secondary text-sm font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
                  <ShoppingBag size={14} className="text-accent-secondary" />
                  Tenant Es Teh Poci
                </p>
              </div>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
              Berkontribusi dalam pembuatan materi promosi dan branding untuk outlet Es Teh Poci, salah satu brand minuman paling dikenal oleh masyarakat sekitar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-portfolio-border">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  Proyek yang Dikerjakan
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  <li>Poster Promosi</li>
                  <li>Aset Kampanye Media Sosial</li>
                  <li>Visual Pemasaran</li>
                  <li>Materi Pendukung Penjualan</li>
                  <li>Desain Banner</li>
                  <li>Konten Komunikasi Brand</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                  Skill yang Diasah
                </h4>
                <ul className="space-y-1.5 text-xs text-text-secondary list-disc pl-4 font-sans">
                  <li>Desain Pemasaran</li>
                  <li>Desain Penarik Perhatian Konsumen</li>
                  <li>Visual Branding</li>
                  <li>Desain Komersial</li>
                  <li>Konten Kreator</li>
                  <li>Konsistensi Brand</li>
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
              Apa yang Aku Pelajari dari Desain
            </motion.h3>
            <p className="text-text-secondary text-xs font-bold uppercase tracking-wider font-space">
              Dampak Berpikir Visual pada Pekerjaanku
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
              Dari Desain Visual ke Teknologi
            </h3>

            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-sans">
              Semakin aku mengeksplorasi desain visual, semakin aku penasaran bagaimana sebuah website, aplikasi, dan produk digital sebenarnya dibuat. Desain mengajarkanku cara menciptakan pengalaman yang menarik. Pemrograman mengajarkanku cara menghidupkan pengalaman itu. Sekarang, aku terus mengembangkan kedua skill ini secara bersamaan karena aku percaya produk digital yang hebat butuh kreativitas sekaligus eksekusi teknis.
            </p>

            {/* Formula Visual Grid */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-black/40 px-6 py-4 rounded-2xl border border-portfolio-border shadow-inner max-w-2xl w-full justify-center">
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                🎨 Kreativitas Visual
              </div>
              <span className="text-accent-primary font-bold text-lg">+</span>
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                💻 Logika Pemrograman
              </div>
              <span className="text-accent-secondary font-bold text-lg">+</span>
              <div className="text-xs font-extrabold uppercase tracking-widest text-white font-space">
                📊 Pemikiran Strategis
              </div>
            </div>

            <p className="text-[10px] font-semibold text-accent-secondary uppercase tracking-widest font-mono mt-6">
              Pondasi Kreator Multidisiplin
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
