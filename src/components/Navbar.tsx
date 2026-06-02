'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Beranda', id: 'home' },
  { label: 'Perjalanan', id: 'journey' },
  { label: 'Desain Visual', id: 'creative-journey' },
  { label: 'Tentang', id: 'about' },
  { label: 'Skill', id: 'skills' },
  { label: 'Olahraga', id: 'sports' },
  { label: 'Project', id: 'projects' },
  { label: 'Filosofi', id: 'philosophy' },
  { label: 'Target', id: 'future' },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background styling on scroll
      setIsScrolled(window.scrollY > 20);

      // Simple robust section tracker
      const scrollPos = window.scrollY + 150;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const lenisInstance = (window as unknown as { 
        lenis?: { 
          scrollTo?: (target: HTMLElement, options: { offset: number; duration: number; easing: (t: number) => number }) => void 
        } 
      }).lenis;
      if (lenisInstance && lenisInstance.scrollTo) {
        const easeInOutExpo = (t: number) =>
          t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
        lenisInstance.scrollTo(el, {
          offset: -90,
          duration: 1.2,
          easing: easeInOutExpo
        });
      } else {
        window.scrollTo({
          top: el.offsetTop - 90,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-[#050505]/70 backdrop-blur-md border-b border-portfolio-border shadow-lg shadow-black/20' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="font-space font-bold text-2xl tracking-wider bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
          >
            MYBUU
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 glass-card px-3 py-1.5 rounded-full bg-portfolio-surface/40">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors font-space cursor-pointer ${
                  activeItem === item.id ? 'text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {activeItem === item.id && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </div>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs z-50 bg-portfolio-surface border-l border-portfolio-border backdrop-blur-lg flex flex-col p-6 shadow-2xl shadow-black/80 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-portfolio-border pb-4 mb-6">
              <span className="font-space font-bold text-xl tracking-wider bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                MENU
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-text-secondary hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-3 flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-md font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeItem === item.id
                      ? 'bg-accent-primary/20 text-white border-l-4 border-accent-primary font-space'
                      : 'text-text-secondary hover:text-white hover:bg-portfolio-border/40 font-space'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
