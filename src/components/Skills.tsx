'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  CanvaIcon, PhotoshopIcon, IllustratorIcon, AlightMotionIcon, CapCutIcon, 
  Html5Icon, Css3Icon, JavaScriptIcon, TypeScriptIcon, ReactIcon, NextjsIcon, 
  TailwindIcon, NodejsIcon, GitIcon, GithubIcon, VscodeIcon, VercelIcon, AiSparkIcon 
} from './BrandIcons';
import { ChevronRight, Info, Sparkles } from 'lucide-react';

interface ToolConfig {
  id: string;
  name: string;
  category: 'creative' | 'development' | 'workflow' | 'productivity';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string; // brand primary hex for dynamic glow
  hasStats?: boolean;
}

const ToolCard = React.memo(({ tool }: { tool: ToolConfig }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = tool.icon;
  const desc = t(`skills.ecosystem.tools.${tool.id}.desc`);
  const level = tool.hasStats ? t(`skills.ecosystem.tools.${tool.id}.level`) : null;
  const use = tool.hasStats ? t(`skills.ecosystem.tools.${tool.id}.use`) : null;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="glass-card p-4 sm:p-5 rounded-2xl border border-portfolio-border/60 hover:border-white/15 transition-all text-left flex flex-col justify-between relative overflow-hidden group select-none h-full"
      style={{
        boxShadow: isHovered 
          ? `0 10px 30px -10px rgba(0,0,0,0.8), 0 0 20px -3px ${tool.color}35` 
          : '0 4px 20px rgba(0,0,0,0.3)',
        borderColor: isHovered ? `${tool.color}45` : 'rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Glow backdrop aura */}
      <div 
        className="absolute -right-10 -top-10 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: tool.color }}
      />

      <div>
        {/* Logo container */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="p-2 sm:p-3 bg-portfolio-surface-secondary border border-portfolio-border rounded-xl group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
            style={{ borderColor: isHovered ? `${tool.color}30` : 'rgba(255, 255, 255, 0.08)' }}
          >
            <IconComponent size={16} className="sm:hidden" />
            <IconComponent size={20} className="hidden sm:block group-hover:brightness-110 transition-all" />
          </div>

          {/* Experience mini badge */}
          {tool.hasStats && (
            <span className="text-[8.5px] font-bold font-space uppercase tracking-widest text-text-secondary/60 border border-portfolio-border px-2 py-0.5 rounded-md">
              {level}
            </span>
          )}
        </div>

        <h4 className="font-space font-bold text-white text-sm sm:text-base mb-1.5 group-hover:text-white transition-colors">
          {tool.name}
        </h4>
        
        <p className="text-text-secondary text-[11px] sm:text-xs leading-relaxed font-sans min-h-[3.2em]">
          {desc}
        </p>
      </div>

      {/* Hover overlay detail block */}
      {tool.hasStats && (
        <div className="mt-4 pt-3 border-t border-portfolio-border/40 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-[8px] sm:text-[9px] font-mono text-text-secondary/60">
          <span className="flex items-center gap-1">
            <Info size={9} /> Exp: {level}
          </span>
          <span>Usage: {use}</span>
        </div>
      )}
    </motion.div>
  );
});
ToolCard.displayName = 'ToolCard';

export default function Skills() {
  const { t } = useLanguage();

  // Unified Tool Configs
  const CREATIVE_TOOLS: ToolConfig[] = [
    { id: 'canva', name: 'Canva', category: 'creative', icon: CanvaIcon, color: '#00C4CC', hasStats: true },
    { id: 'photoshop', name: 'Adobe Photoshop', category: 'creative', icon: PhotoshopIcon, color: '#31A8FF', hasStats: true },
    { id: 'illustrator', name: 'Adobe Illustrator', category: 'creative', icon: IllustratorIcon, color: '#FF9A00', hasStats: true },
    { id: 'alight', name: 'Alight Motion', category: 'creative', icon: AlightMotionIcon, color: '#00FF87', hasStats: true },
    { id: 'capcut', name: 'CapCut', category: 'creative', icon: CapCutIcon, color: '#00F0FF', hasStats: true }
  ];

  const DEV_TOOLS: ToolConfig[] = [
    { id: 'html', name: 'HTML5', category: 'development', icon: Html5Icon, color: '#E34F26' },
    { id: 'css', name: 'CSS3', category: 'development', icon: Css3Icon, color: '#1572B6' },
    { id: 'js', name: 'JavaScript', category: 'development', icon: JavaScriptIcon, color: '#F7DF1E' },
    { id: 'ts', name: 'TypeScript', category: 'development', icon: TypeScriptIcon, color: '#3178C6' },
    { id: 'react', name: 'React', category: 'development', icon: ReactIcon, color: '#61DAFB' },
    { id: 'nextjs', name: 'Next.js', category: 'development', icon: NextjsIcon, color: '#FFFFFF' },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'development', icon: TailwindIcon, color: '#38BDF8' },
    { id: 'node', name: 'Node.js', category: 'development', icon: NodejsIcon, color: '#339933' }
  ];

  const WORKFLOW_TOOLS: ToolConfig[] = [
    { id: 'vscode', name: 'VS Code', category: 'workflow', icon: VscodeIcon, color: '#007ACC' },
    { id: 'git', name: 'Git', category: 'workflow', icon: GitIcon, color: '#F05032' },
    { id: 'github', name: 'GitHub', category: 'workflow', icon: GithubIcon, color: '#A3A3A3' },
    { id: 'vercel', name: 'Vercel', category: 'workflow', icon: VercelIcon, color: '#FFFFFF' }
  ];

  const PRODUCTIVITY_TOOLS: ToolConfig[] = [
    { id: 'ai', name: 'AI Assisted Dev', category: 'productivity', icon: AiSparkIcon, color: '#A855F7' }
  ];

  // Learning Journey timeline stages configuration
  const JOURNEY_STAGES = [
    { 
      key: 'stage1', 
      tools: [CanvaIcon, PhotoshopIcon, AlightMotionIcon],
      glow: 'shadow-purple-500/20'
    },
    { 
      key: 'stage2', 
      tools: [CanvaIcon, PhotoshopIcon, CapCutIcon],
      glow: 'shadow-blue-500/20'
    },
    { 
      key: 'stage3', 
      tools: [CanvaIcon, IllustratorIcon, PhotoshopIcon],
      glow: 'shadow-pink-500/20'
    },
    { 
      key: 'stage4', 
      tools: [Html5Icon, Css3Icon, JavaScriptIcon, VscodeIcon],
      glow: 'shadow-yellow-500/20'
    },
    { 
      key: 'stage5', 
      tools: [ReactIcon, NextjsIcon, TailwindIcon, GitIcon, VercelIcon],
      glow: 'shadow-cyan-500/20'
    },
    { 
      key: 'stage6', 
      tools: [AiSparkIcon, NextjsIcon, TailwindIcon, GithubIcon],
      glow: 'shadow-indigo-500/30 border-accent-secondary/50'
    }
  ];

  // Design experiences linking projects to design tools
  const WORKFLOWS = [
    { 
      key: 'poster', 
      tools: [CanvaIcon, PhotoshopIcon],
      desc: 'High-contrast event layouts'
    },
    { 
      key: 'infographic', 
      tools: [CanvaIcon, IllustratorIcon],
      desc: 'Informative vector hierarchies'
    },
    { 
      key: 'social', 
      tools: [CanvaIcon, CapCutIcon],
      desc: 'Engaging feed promotional assets'
    },
    { 
      key: 'motion', 
      tools: [AlightMotionIcon, CapCutIcon],
      desc: 'Animated keyframe effects & transitions'
    },
    { 
      key: 'church', 
      tools: [CanvaIcon, PhotoshopIcon],
      desc: 'Visual publications for church community'
    },
    { 
      key: 'poci', 
      tools: [CanvaIcon, PhotoshopIcon, CapCutIcon],
      desc: 'Branding, banners & social marketing'
    }
  ];



  return (
    <section id="skills" className="relative py-24 border-b border-portfolio-border overflow-hidden">
      {/* Ambient Radial Lights */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-portfolio-border bg-portfolio-surface text-[9px] tracking-wider sm:text-[10px] sm:tracking-widest font-bold text-text-secondary uppercase font-space mb-6"
          >
            <Sparkles size={10} className="text-accent-secondary animate-pulse" />
            {t('skills.sectionTitle')}
          </motion.div>

          <h2 className="font-space font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-4">
            {t('skills.sectionTitle')}
          </h2>
          
          <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            {t('skills.sectionDesc')}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1. LEARNING JOURNEY PROGRESSION TIMELINE */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-12 justify-center lg:justify-start">
            <span className="h-px w-8 bg-accent-primary" />
            <h3 className="font-space font-extrabold text-lg md:text-xl text-white uppercase tracking-wider">
              {t('skills.ecosystem.journey.title')}
            </h3>
          </div>

          <div className="relative pl-10 md:pl-0">
            {/* Center Vertical Connect Line (Desktop: center, Mobile: left) */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-portfolio-border -translate-x-1/2 z-0" />

            <div className="space-y-12">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isEven = idx % 2 === 0;
                const title = t(`skills.ecosystem.journey.${stage.key}.title`);
                const desc = t(`skills.ecosystem.journey.${stage.key}.desc`);

                return (
                  <div 
                    key={stage.key} 
                    className={`relative flex flex-col md:flex-row items-start z-10 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Stage Timeline Center Node */}
                    <div className={`absolute left-[20px] md:left-1/2 top-1 w-8 h-8 rounded-full flex items-center justify-center border border-portfolio-border bg-[#0F0F0F] text-xs font-mono font-bold text-text-secondary z-20 -translate-x-1/2 shadow-lg ${stage.glow}`}>
                      0{idx + 1}
                    </div>

                    {/* Spacer for desktop alignment */}
                    <div className="hidden md:block w-1/2" />

                    {/* Stage Content Card */}
                    <div className="w-full md:w-[45%] glass-card p-6 rounded-2xl text-left relative overflow-hidden group hover:border-accent-primary/20 transition-all duration-300">
                      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-accent-primary to-accent-secondary opacity-60" />
                      
                      <h4 className="font-space font-bold text-white text-base md:text-lg mb-2">
                        {title}
                      </h4>
                      <p className="text-text-secondary text-xs md:text-sm font-sans leading-relaxed mb-4">
                        {desc}
                      </p>

                      {/* Tool mini icons utilized during this stage */}
                      <div className="flex flex-wrap gap-2.5 pt-3 border-t border-portfolio-border/40">
                        {stage.tools.map((MiniIcon, iconIdx) => (
                          <div 
                            key={iconIdx} 
                            className="p-1.5 rounded-lg border border-portfolio-border bg-portfolio-surface-secondary flex items-center justify-center shadow-inner"
                          >
                            <MiniIcon size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DESIGN WORKFLOW CONNECTIONS */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10 justify-center lg:justify-start">
            <span className="h-px w-8 bg-accent-secondary" />
            <h3 className="font-space font-extrabold text-lg md:text-xl text-white uppercase tracking-wider">
              {t('skills.ecosystem.workflows.title')}
            </h3>
          </div>

          <p className="text-text-secondary text-xs md:text-sm font-sans mb-8 text-center lg:text-left max-w-2xl">
            {t('skills.ecosystem.workflows.desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOWS.map((wf) => {
              const label = t(`skills.ecosystem.workflows.${wf.key}`);
              return (
                <div 
                  key={wf.key}
                  className="glass-card p-5 rounded-2xl border border-portfolio-border/50 text-left flex items-center justify-between relative overflow-hidden group hover:border-white/10 transition-all duration-300"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-secondary font-mono">
                      Project Link
                    </span>
                    <h4 className="font-space font-extrabold text-sm text-white">
                      {label}
                    </h4>
                    <p className="text-[10px] text-text-secondary font-sans leading-tight">
                      {wf.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Horizontal stack of tools */}
                    <div className="flex -space-x-2.5 overflow-hidden">
                      {wf.tools.map((ToolIcon, idx) => (
                        <div 
                          key={idx}
                          className="w-8 h-8 rounded-full border border-portfolio-bg bg-portfolio-surface-secondary flex items-center justify-center shadow-md ring-2 ring-portfolio-bg/20"
                        >
                          <ToolIcon size={14} />
                        </div>
                      ))}
                    </div>

                    <span className="text-white/20 group-hover:text-accent-secondary transition-colors duration-300">
                      <ChevronRight size={14} className="translate-x-1 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TOOLKIT CATEGORIES GRIDS */}
        {/* ========================================================================= */}
        <div className="space-y-16">
          
          {/* Creative Design Subsection */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-accent-primary/60" />
              <h3 className="font-space font-extrabold text-base md:text-lg text-white uppercase tracking-wider">
                {t('skills.ecosystem.categories.creative')}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CREATIVE_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* Development Stack Subsection */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-accent-secondary/60" />
              <h3 className="font-space font-extrabold text-base md:text-lg text-white uppercase tracking-wider">
                {t('skills.ecosystem.categories.development')}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {DEV_TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* Workflow & Productivity Subsection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workflow stack */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-white/20" />
                <h3 className="font-space font-extrabold text-base md:text-lg text-white uppercase tracking-wider">
                  {t('skills.ecosystem.categories.workflow')}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WORKFLOW_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

            {/* Productivity/AI stack */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-6 bg-accent-gold/40" />
                <h3 className="font-space font-extrabold text-base md:text-lg text-white uppercase tracking-wider">
                  {t('skills.ecosystem.categories.productivity')}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {PRODUCTIVITY_TOOLS.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
