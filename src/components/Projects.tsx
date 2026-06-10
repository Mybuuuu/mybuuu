'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Code, Layout, Laptop, Gamepad } from 'lucide-react';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

interface ProjectItem {
  id: number;
  title: string;
  tagline: string;
  desc: string;
  tech: string[];
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  demoUrl: string;
  codeUrl: string;
  accentColor: string;
  previewMockup: React.ReactNode;
}

const ProjectCard = React.memo(function ProjectCard({ project, cardVariants }: { project: ProjectItem; cardVariants: import('framer-motion').Variants }) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Easing springs (max 2 degrees tilt for professional feel)
  const rotateX = useSpring(useTransform(y, [0, 1], [2, -2]), { stiffness: 90, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-2, 2]), { stiffness: 90, damping: 20 });

  // Glare position springs
  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), { stiffness: 90, damping: 20 });
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), { stiffness: 90, damping: 20 });
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 90, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
    glareOpacity.set(0.15); // soft subtle glare
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    glareOpacity.set(0);
  };

  const IconComponent = project.icon;

  // Compile gradient glare background
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        willChange: 'transform',
      }}
      className="glass-card rounded-3xl overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col h-full text-left group relative cursor-pointer"
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: glareBg,
          opacity: glareOpacity,
        }}
      />

      {/* Visual Header (Custom CSS Dashboard/Layout Mockup) */}
      <div 
        className="relative h-56 bg-portfolio-bg border-b border-portfolio-border overflow-hidden flex items-end justify-center pt-8 px-8"
        style={{ transform: 'translateZ(5px)', transformStyle: 'preserve-3d' }}
      >
        {project.previewMockup}

        {/* Small Floating Icon Badge */}
        <div 
          className="absolute right-6 top-6 p-2 rounded-xl border border-portfolio-border bg-portfolio-surface-secondary text-white z-10 opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ 
            transform: 'translateZ(15px)'
          }}
        >
          <IconComponent size={14} style={{ color: project.accentColor }} />
        </div>
      </div>

      {/* Card Content body */}
      <div 
        className="p-5 md:p-8 flex flex-col flex-1"
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary">
            {project.tagline}
          </span>
          <span className="text-[10px] font-mono text-text-secondary">
            {t('projects.projectNumberLabel').replace('{id}', String(project.id))}
          </span>
        </div>

        <h3 className="font-space font-extrabold text-xl md:text-2xl text-white mb-3 group-hover:text-accent-secondary transition-colors">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans flex-1">
          {project.desc}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full border border-portfolio-border bg-portfolio-surface/50 text-[10px] font-semibold text-white/80 font-sans"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6 mt-auto border-t border-portfolio-border pt-2 z-30">
          <a
            href={project.demoUrl}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-accent-primary transition-colors cursor-pointer py-3.5 min-h-[48px]"
          >
            <ExternalLink size={14} />
            {t('projects.liveDemo')}
          </a>
          <a
            href={project.codeUrl}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-colors cursor-pointer py-3.5 min-h-[48px]"
          >
            <svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {t('projects.sourceCode')}
          </a>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

export default function Projects() {
  const { t } = useLanguage();

  const PROJECTS = useMemo(() => [
    {
      id: 1,
      title: t('projects.projectList.project1.title'),
      tagline: t('projects.projectList.project1.tagline'),
      desc: t('projects.projectList.project1.desc'),
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Framer Motion'],
      icon: Laptop,
      demoUrl: '#',
      codeUrl: '#',
      accentColor: '#7C3AED',
      previewMockup: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0F0F0F] rounded-t-2xl relative overflow-hidden border-t border-x border-portfolio-border select-none">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-portfolio-border">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-20 h-2.5 rounded bg-white/5 ml-2" />
          </div>
          {/* Content Layout */}
          <div className="flex-1 flex gap-3 pt-3">
            {/* Mini Sidebar */}
            <div className="w-1/4 h-full bg-white/[0.01] border border-portfolio-border rounded-lg p-1.5 flex flex-col gap-1.5">
              <div className="w-full h-2 rounded bg-white/10" />
              <div className="w-full h-2 rounded bg-white/5" />
              <div className="w-full h-2 rounded bg-white/5" />
            </div>
            {/* Mini Hero Area */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="w-3/4 h-3.5 rounded bg-accent-primary/20 border border-accent-primary/25" />
              <div className="w-full h-10 rounded bg-white/[0.01] border border-portfolio-border p-1.5 flex flex-col gap-1">
                <div className="w-full h-1.5 rounded bg-white/10" />
                <div className="w-2/3 h-1.5 rounded bg-white/5" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 rounded bg-white/[0.01] border border-portfolio-border" />
                <div className="h-8 rounded bg-white/[0.01] border border-portfolio-border" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: t('projects.projectList.project2.title'),
      tagline: t('projects.projectList.project2.tagline'),
      desc: t('projects.projectList.project2.desc'),
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
      icon: Layout,
      demoUrl: '#',
      codeUrl: '#',
      accentColor: '#A855F7',
      previewMockup: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0F0F0F] rounded-t-2xl relative overflow-hidden border-t border-x border-portfolio-border select-none">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-portfolio-border">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-20 h-2.5 rounded bg-white/5 ml-2" />
          </div>
          {/* Hero Section Mockup */}
          <div className="flex-1 flex flex-col justify-center items-center gap-3 pt-4 px-6 text-center">
            <div className="w-full h-4 rounded bg-accent-secondary/20 border border-accent-secondary/25" />
            <div className="w-4/5 h-2 rounded bg-white/10" />
            <div className="w-3/5 h-2 rounded bg-white/5" />
            <div className="w-24 h-6 rounded-full bg-white/10 border border-white/15 mt-1" />
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: t('projects.projectList.project3.title'),
      tagline: t('projects.projectList.project3.tagline'),
      desc: t('projects.projectList.project3.desc'),
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Next.js'],
      icon: Code,
      demoUrl: '#',
      codeUrl: '#',
      accentColor: '#7C3AED',
      previewMockup: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0F0F0F] rounded-t-2xl relative overflow-hidden border-t border-x border-portfolio-border select-none">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-portfolio-border">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-20 h-2.5 rounded bg-white/5 ml-2" />
          </div>
          {/* Dashboard Content Mockup */}
          <div className="flex-1 pt-3 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 rounded bg-white/[0.01] border border-portfolio-border p-1">
                <div className="w-full h-1 bg-white/10 rounded mb-1" />
                <div className="w-2/3 h-2 bg-accent-primary/20 rounded" />
              </div>
              <div className="h-8 rounded bg-white/[0.01] border border-portfolio-border p-1">
                <div className="w-full h-1 bg-white/10 rounded mb-1" />
                <div className="w-2/3 h-2 bg-white/10 rounded" />
              </div>
              <div className="h-8 rounded bg-white/[0.01] border border-portfolio-border p-1">
                <div className="w-full h-1 bg-white/10 rounded mb-1" />
                <div className="w-2/3 h-2 bg-white/10 rounded" />
              </div>
            </div>
            {/* Minimal Line Chart Visual */}
            <div className="flex-1 border border-portfolio-border rounded-lg bg-white/[0.01] p-2 flex items-end gap-2.5 relative">
              <div className="absolute top-2 left-2 w-12 h-2 bg-white/10 rounded" />
              <div className="w-full h-[1px] bg-white/5 absolute bottom-5 left-0" />
              <div className="w-full h-[1px] bg-white/5 absolute bottom-10 left-0" />
              
              <div className="w-full h-10 flex items-end justify-between px-2 gap-1.5 z-10">
                <div className="w-full bg-white/5 rounded-t" style={{ height: '30%' }} />
                <div className="w-full bg-accent-primary/20 rounded-t" style={{ height: '60%' }} />
                <div className="w-full bg-white/5 rounded-t" style={{ height: '45%' }} />
                <div className="w-full bg-accent-secondary/20 rounded-t" style={{ height: '80%' }} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: t('projects.projectList.project4.title'),
      tagline: t('projects.projectList.project4.tagline'),
      desc: t('projects.projectList.project4.desc'),
      tech: ['Lua Scripting', 'Roblox Studio', 'Vector Physics', 'Game Loops'],
      icon: Gamepad,
      demoUrl: '#',
      codeUrl: '#',
      accentColor: '#A855F7',
      previewMockup: (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-[#0F0F0F] rounded-t-2xl relative overflow-hidden border-t border-x border-portfolio-border select-none">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 pb-3 border-b border-portfolio-border">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-20 h-2.5 rounded bg-white/5 ml-2" />
          </div>
          {/* Code Editor Mockup */}
          <div className="flex-1 flex gap-2 pt-3">
            {/* File Explorer */}
            <div className="w-16 h-full bg-[#151515] border border-portfolio-border rounded-lg p-1.5 flex flex-col gap-1.5">
              <div className="w-full h-1 bg-white/20 rounded" />
              <div className="w-3/4 h-1 bg-white/10 rounded" />
              <div className="w-2/3 h-1 bg-white/10 rounded" />
            </div>
            {/* Code Area */}
            <div className="flex-1 h-full bg-black/40 border border-portfolio-border rounded-lg p-2 font-mono text-[8px] leading-relaxed flex flex-col gap-1 text-left">
              <div className="flex gap-1.5">
                <span className="text-accent-secondary">local</span>
                <span className="text-white">player = game.Players</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-accent-primary">function</span>
                <span className="text-white">onTouched(part)</span>
              </div>
              <div className="flex gap-1.5 pl-3">
                <span className="text-accent-secondary">if</span>
                <span className="text-white">part:Destroy()</span>
              </div>
              <div className="w-1/2 h-1 bg-white/10 rounded pl-6" />
              <div className="flex gap-1.5 pl-3">
                <span className="text-accent-primary">end</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-accent-primary">end</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ], [t]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="projects" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Lights */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4"
          >
            <TextReveal text={t('projects.sectionTitle')} mode="words" />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary text-base md:text-lg font-sans"
          >
            <TextReveal text={t('projects.sectionDesc')} mode="fade-up" delay={0.15} />
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} cardVariants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
