'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Sparkles } from 'lucide-react';
import useSoundEffects from '../hooks/useSoundEffects';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const { playHover, playClick } = useSoundEffects();
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.email || !formData.pesan) return;
    
    playClick();
    setIsSubmitting(true);
    
    // Simulate API call for premium UI experience
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ nama: '', email: '', pesan: '' });
  };

  return (
    <section id="contact" className="relative py-24 border-b border-portfolio-border overflow-hidden bg-portfolio-bg">
      {/* Ambient glows */}
      <div className="absolute top-[10%] left-[-5%] w-[350px] h-[350px] bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-primary/30 bg-accent-primary/5 text-xs font-semibold tracking-widest text-accent-secondary uppercase font-space mb-6"
          >
            <Mail size={12} className="animate-pulse" />
            {t('contact.badge')}
          </motion.div>
 
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            {t('contact.sectionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            {t('contact.sectionDesc')}
          </motion.p>
        </div>

        {/* Contact Form Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10"
            >
              <div className="p-4 bg-accent-primary/10 rounded-full text-accent-secondary mb-6">
                <Sparkles size={36} className="animate-bounce" />
              </div>
              <h3 className="font-space font-extrabold text-2xl text-white mb-3">
                {t('contact.success.title')}
              </h3>
              <p className="text-text-secondary text-sm md:text-base font-sans max-w-md mb-8">
                {t('contact.success.desc')}
              </p>
              <button
                onClick={() => {
                  playClick();
                  setIsSubmitted(false);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold font-space uppercase tracking-widest bg-portfolio-surface border border-portfolio-border hover:border-accent-primary/40 hover:text-white text-text-secondary transition-all cursor-pointer"
              >
                {t('contact.success.resetBtn')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Nama input */}
                <div className="space-y-2">
                  <label htmlFor="nama" className="text-xs font-bold uppercase tracking-widest text-white/70 font-space block">
                    {t('contact.form.nameLabel')}
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      id="nama"
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      onMouseEnter={playHover}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-portfolio-border focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/40 focus:outline-none text-white text-sm font-sans placeholder:text-white/30 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/70 font-space block">
                    {t('contact.form.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onMouseEnter={playHover}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/40 border border-portfolio-border focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/40 focus:outline-none text-white text-sm font-sans placeholder:text-white/30 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Pesan input */}
              <div className="space-y-2">
                <label htmlFor="pesan" className="text-xs font-bold uppercase tracking-widest text-white/70 font-space block">
                  {t('contact.form.messageLabel')}
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-4 top-5 text-text-secondary" />
                  <textarea
                    id="pesan"
                    required
                    rows={5}
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    onMouseEnter={playHover}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/40 border border-portfolio-border focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/40 focus:outline-none text-white text-sm font-sans placeholder:text-white/30 transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-bold font-space uppercase tracking-widest text-white bg-gradient-to-r from-accent-primary to-accent-secondary hover:brightness-110 shadow-lg shadow-accent-primary/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      {t('contact.form.submittingBtn')}
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      {t('contact.form.submitBtn')}
                      <Send size={12} />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
