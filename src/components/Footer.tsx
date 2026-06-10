'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    const lenisInstance = (window as unknown as { 
      lenis?: { 
        scrollTo?: (target: number | string | HTMLElement, options: { offset: number; duration: number; easing: (t: number) => number }) => void 
      } 
    }).lenis;
    if (lenisInstance && lenisInstance.scrollTo) {
      const easeInOutExpo = (t: number) =>
        t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
      lenisInstance.scrollTo(0, {
        offset: 0,
        duration: 1.2,
        easing: easeInOutExpo
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative py-16 border-t border-portfolio-border overflow-hidden bg-[#050505]">
      {/* Ambient glow in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center gap-8">
        
        {/* Top Text Group */}
        <div className="space-y-3">
          <h3 className="font-space font-extrabold text-2xl md:text-3xl tracking-tight text-white">
            {t('footer.title')}
          </h3>
          <p className="text-text-secondary text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            {t('footer.subtitle')}
          </p>
        </div>

        {/* Separator line */}
        <div className="w-full h-[1px] bg-portfolio-border my-4" />

        {/* Bottom row */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left - Copyright Metadata */}
          <div className="text-left order-2 sm:order-1">
            <p className="text-xs font-mono text-text-secondary">
              {t('footer.copyright')}
            </p>
          </div>

          {/* Right - Back to Top Button */}
          <div className="text-right order-1 sm:order-2">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-white glass-card px-4 py-2 rounded-full cursor-pointer transition-all duration-300"
            >
              {t('footer.backToTop')}
              <ArrowUp size={12} className="text-accent-secondary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
