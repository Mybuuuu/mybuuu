'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', shortName: 'ID' },
  { code: 'en', name: 'English', flag: '🇺🇸', shortName: 'EN' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', shortName: 'JA' },
  { code: 'zh', name: '中文', flag: '🇨🇳', shortName: 'ZH' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', shortName: 'FR' },
];

export default function Navbar() {
  const { locale, t, changeLanguage } = useLanguage();
  const [activeItem, setActiveItem] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = useMemo(() => [
    { label: t('navbar.home'), id: 'home' },
    { label: t('navbar.journey'), id: 'journey' },
    { label: t('navbar.creativeJourney'), id: 'creative-journey' },
    { label: t('navbar.about'), id: 'about' },
    { label: t('navbar.skills'), id: 'skills' },
    { label: t('navbar.sports'), id: 'sports' },
    { label: t('navbar.projects'), id: 'projects' },
    { label: t('navbar.philosophy'), id: 'philosophy' },
    { label: t('navbar.future'), id: 'future' },
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
  }, [NAV_ITEMS]);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen]);

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

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

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
            MYBUUU
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

          {/* Desktop Language Switcher */}
          <div className="hidden lg:flex items-center relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-portfolio-border bg-portfolio-surface/40 hover:bg-portfolio-surface/80 hover:border-white/15 transition-all text-xs font-space font-semibold uppercase tracking-wider text-text-secondary hover:text-white cursor-pointer z-50 shadow-md"
            >
              <Globe size={13} className="text-accent-secondary" />
              <span className="font-mono">{currentLanguage.flag} {currentLanguage.shortName}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-[#0b0b0d]/95 backdrop-blur-md border border-portfolio-border shadow-2xl p-2 z-50"
                >
                  <div className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/55 px-3 py-1 mb-1 font-space">
                    Language / Bahasa
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-space transition-all cursor-pointer ${
                        locale === lang.code
                          ? 'bg-accent-primary/10 text-white font-extrabold border-l-2 border-accent-primary'
                          : 'text-text-secondary hover:text-white hover:bg-white/5 hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      {locale === lang.code && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button + Current Language Short Display */}
          <div className="flex lg:hidden items-center gap-3">
            <span className="text-[10px] font-bold font-mono border border-portfolio-border bg-portfolio-surface/40 px-2 py-1 rounded-md text-text-secondary">
              {currentLanguage.flag} {currentLanguage.shortName}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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

            <div className="flex flex-col space-y-2 flex-1 overflow-y-auto pr-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeItem === item.id
                      ? 'bg-accent-primary/20 text-white border-l-4 border-accent-primary font-space'
                      : 'text-text-secondary hover:text-white hover:bg-portfolio-border/40 font-space'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Language Switcher inside Drawer */}
              <div className="border-t border-portfolio-border pt-6 mt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 block mb-3 font-space">
                  Language / Bahasa
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-space transition-all cursor-pointer justify-center ${
                        locale === lang.code
                          ? 'border-accent-primary/50 bg-accent-primary/10 text-white font-bold'
                          : 'border-portfolio-border bg-portfolio-surface/40 text-text-secondary hover:text-white hover:border-white/10'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
