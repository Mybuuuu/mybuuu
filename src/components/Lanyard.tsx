'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProfileImage from './ProfileImage';
import { useLanguage } from '../context/LanguageContext';

interface Point {
  x: number;
  y: number;
  px: number;
  py: number;
  isPin: boolean;
}

interface Constraint {
  p1: Point;
  p2: Point;
  length: number;
}

interface LanyardProps {
  isReady?: boolean;
}

export default function Lanyard({ isReady = true }: LanyardProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Track pointer dragging state
  const isDragging = useRef(false);
  const pointerPos = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!canvas || !container || !badge) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive size initialization (full-width viewport layout)
    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Responsive segments and iterations: Higher stiffness & segments on desktop for non-elastic fabric behavior
    let ropeSegments = 20;
    let segmentLength = 12;
    let iterations = 12; // High iteration steps for stiff, physical fabric tension

    if (width < 768) {
      ropeSegments = 9;
      segmentLength = 24;
      iterations = 4;
    } else if (width < 1024) {
      ropeSegments = 14;
      segmentLength = 16;
      iterations = 8;
    }

    const handleResize = () => {
      if (!container || !canvas) return;
      
      const oldPinX = canvas.width >= 1024 ? canvas.width * 0.65 : (canvas.width >= 768 ? canvas.width * 0.58 : canvas.width / 2);
      
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newPinX = width >= 1024 ? width * 0.65 : (width >= 768 ? width * 0.58 : width / 2);
      const dx = newPinX - oldPinX;
      
      // Shift all points to avoid physics explosion/stretching on resize
      points.forEach((p) => {
        p.x += dx;
        p.px += dx;
      });
    };
    window.addEventListener('resize', handleResize);

    // Verlet Physics rope data initialization
    const gravity = 0.52; // realistic downward weight
    const friction = 0.983; // high damping for heavy polyester material feel
    const points: Point[] = [];
    const constraints: Constraint[] = [];

    // Pin position (hanging from the top center or offset right on desktop)
    let initialPinX = width / 2;
    if (width >= 1024) {
      initialPinX = width * 0.65;
    } else if (width >= 768) {
      initialPinX = width * 0.58;
    }

    for (let i = 0; i < ropeSegments; i++) {
      const x = initialPinX;
      // Initialize all points relaxed and hanging straight down from -600px
      // This ensures 0 initial constraint tension to prevent physics engine explosion (NaN values)
      const y = -600 + i * segmentLength;
      points.push({
        x,
        y,
        px: x,
        py: y,
        isPin: i === 0,
      });
    }

    for (let i = 0; i < ropeSegments - 1; i++) {
      constraints.push({
        p1: points[i],
        p2: points[i + 1],
        length: segmentLength,
      });
    }

    const lastNode = points[points.length - 1];
    let badgeX = lastNode.x;
    let badgeY = lastNode.y;
    let badgeAngle = 0;

    // Redesigned Segment Drawing System: Renders flat fabric straps using local coordinates
    const strapWidth = 14; // Premium wide corporate strap (14px)

    const drawStrapShadowSegment = (p1: Point, p2: Point) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const angle = Math.atan2(dy, dx);

      ctx.save();
      // Offset drop shadows Y & X to project depth from a top-left soft studio light source
      ctx.translate(p1.x + 14, p1.y + 18);
      ctx.rotate(angle);

      // Outer soft ambient shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(-1.5, -strapWidth / 2 - 2, len + 3, strapWidth + 4);

      // Inner contact shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, -strapWidth / 2, len + 1, strapWidth);

      ctx.restore();
    };

    const drawStrapSegment = (p1: Point, p2: Point, idx: number) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const angle = Math.atan2(dy, dx);

      ctx.save();
      ctx.translate(p1.x, p1.y);
      ctx.rotate(angle);

      // 1. Base Strap Ribbon Fill (3D cylinder shading gradient)
      const baseGrad = ctx.createLinearGradient(0, -strapWidth / 2, 0, strapWidth / 2);
      baseGrad.addColorStop(0, '#0a0a0c'); // top dark fold
      baseGrad.addColorStop(0.3, '#141416'); // main charcoal body
      baseGrad.addColorStop(0.7, '#1b1b1f'); // center highlight
      baseGrad.addColorStop(1, '#050507'); // bottom edge fold
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, -strapWidth / 2, len + 1.2, strapWidth);

      // 2. High-Density Woven Polyester Fabric Grain (Micro-weave lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.5;
      const fiberSpacing = 2.2;
      for (let x = 0; x < len + 1; x += fiberSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, -strapWidth / 2);
        ctx.lineTo(x + 2.5, strapWidth / 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'; // weave shadow
        ctx.beginPath();
        ctx.moveTo(x + 1.1, strapWidth / 2);
        ctx.lineTo(x + 3.6, -strapWidth / 2);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      }

      // 3. Sublimated Premium Patterning
      // Accent Gold Border Striping (sublimated premium look)
      ctx.fillStyle = '#F59E0B'; // Accent Gold
      ctx.fillRect(0, -strapWidth / 2 + 1.2, len + 1.2, 1.0); // top gold border

      // Flowing geometric brand shapes wrapping the ribbon
      const stripeInterval = 28;
      const offset = (idx * len) % stripeInterval;
      ctx.fillStyle = 'rgba(124, 58, 237, 0.42)'; // Accent Purple
      
      ctx.beginPath();
      ctx.moveTo(offset, -strapWidth / 2 + 2.2);
      ctx.lineTo(offset + 7, -strapWidth / 2 + 2.2);
      ctx.lineTo(offset + 12, strapWidth / 2 - 2.2);
      ctx.lineTo(offset + 5, strapWidth / 2 - 2.2);
      ctx.closePath();
      ctx.fill();

      // Vector branding typography fragments conformed to curvature
      if (idx % 5 === 1) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.72)';
        ctx.font = 'bold 7px "Space Grotesk", sans-serif';
        ctx.fillText('MYBUUU', len / 2 - 14, 2.2);
      } else if (idx % 5 === 3) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.55)'; // Lavender branding accent
        ctx.font = 'bold 6.5px "Space Grotesk", sans-serif';
        ctx.fillText('STUDIO PASS', len / 2 - 20, 2.2);
      }

      // 4. Thread Edge Stitching Details (Double-dashed woven borders)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 0.7;
      ctx.setLineDash([1.5, 2]);
      
      // Top Stitch line
      ctx.beginPath();
      ctx.moveTo(0, -strapWidth / 2 + 0.6);
      ctx.lineTo(len + 1.2, -strapWidth / 2 + 0.6);
      ctx.stroke();

      // Bottom Stitch line
      ctx.beginPath();
      ctx.moveTo(0, strapWidth / 2 - 0.6);
      ctx.lineTo(len + 1.2, strapWidth / 2 - 0.6);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // 5. Specular Studio Glare Reflection Overlay
      const glareGrad = ctx.createLinearGradient(0, -strapWidth / 2, 0, strapWidth / 2);
      glareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      glareGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.0)');
      glareGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.07)');
      glareGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = glareGrad;
      ctx.fillRect(0, -strapWidth / 2, len + 1.2, strapWidth);

      ctx.restore();
    };

    let animationId: number;

    const updatePhysics = () => {
      let currentPinX = canvas.width / 2;
      if (canvas.width >= 1024) {
        currentPinX = canvas.width * 0.65; // Shifted right on desktop to prevent covering text
      } else if (canvas.width >= 768) {
        currentPinX = canvas.width * 0.58; // Shifted slightly on tablet
      }
      points[0].x = currentPinX;

      // Handle pin Y position transition for smooth physical drop
      if (!isReady) {
        points[0].y = -600;
        for (let i = 1; i < points.length; i++) {
          points[i].x = currentPinX;
          points[i].y = points[0].y + i * segmentLength;
          points[i].px = points[i].x;
          points[i].py = points[i].y;
        }
      } else {
        // Smoothly glide the pin to y = 0
        if (points[0].y < -0.1) {
          points[0].y += (0 - points[0].y) * 0.08;
        } else {
          points[0].y = 0;
        }
      }

      // 1. Verlet Integration (Points)
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.isPin) continue;

        // If not ready, skip updating physics to keep nodes perfectly at locked coordinates
        if (!isReady) continue;

        if (i === points.length - 1 && isDragging.current) {
          p.x = pointerPos.current.x;
          p.y = pointerPos.current.y;
          p.px = p.x;
          p.py = p.y;
          continue;
        }

        const vx = (p.x - p.px) * friction;
        const vy = (p.y - p.py) * friction;

        p.px = p.x;
        p.py = p.y;

        p.x += vx;
        p.y += vy + gravity;
      }

      // 2. Solve Constraints (Distance Links)
      if (isReady) {
        for (let step = 0; step < iterations; step++) {
          for (let i = 0; i < constraints.length; i++) {
            const c = constraints[i];
            const dx = c.p2.x - c.p1.x;
            const dy = c.p2.y - c.p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const diff = c.length - dist;
            const percent = (diff / dist) * 0.5;
            const offsetX = dx * percent;
            const offsetY = dy * percent;

            if (!c.p1.isPin) {
              c.p1.x -= offsetX;
              c.p1.y -= offsetY;
            }
            c.p2.x += offsetX;
            c.p2.y += offsetY;
          }
        }
      }

      // 3. Render Canvas (Dual-Pass Segment Layout)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pass 1: Render realistic drop shadows
      for (let i = 0; i < points.length - 1; i++) {
        drawStrapShadowSegment(points[i], points[i + 1]);
      }

      // Pass 2: Render textured fabric ribbon segments
      for (let i = 0; i < points.length - 1; i++) {
        drawStrapSegment(points[i], points[i + 1], i);
      }

      // 4. Update Badge Card DOM position
      const secondLastNode = points[points.length - 2];
      const dxBadge = lastNode.x - secondLastNode.x;
      const dyBadge = lastNode.y - secondLastNode.y;
      
      badgeX = lastNode.x;
      badgeY = lastNode.y;
      
      const targetAngle = Math.atan2(dxBadge, dyBadge) * -(180 / Math.PI) * 0.44;
      badgeAngle += (targetAngle - badgeAngle) * 0.15; // smooth rotation damping

      badge.style.transform = `translate3d(${badgeX}px, ${badgeY}px, 0) translate(-50%, 0) rotate(${badgeAngle}deg)`;

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);

    // Draggable Input Coordinate Handlers
    const getPointerCoords = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      pointerPos.current = getPointerCoords(e);
      if (e.cancelable) e.preventDefault();
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    // Listeners on window to ensure seamless drag releases even off-badge
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [mounted, isReady]);

  // Handle local pointer start action directly on the badge element
  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    isDragging.current = true;
    
    // Extract native events
    const nativeEvent = e.nativeEvent;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in nativeEvent ? nativeEvent.touches[0].clientX : (nativeEvent as MouseEvent).clientX;
    const clientY = 'touches' in nativeEvent ? nativeEvent.touches[0].clientY : (nativeEvent as MouseEvent).clientY;
    
    pointerPos.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  if (!mounted) {
    return <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none" />;
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-visible z-20"
    >
      {/* Verlet Simulation Ribbon Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* Floating Realistic Corporate ID Pass Mockup Card */}
      <div
        ref={badgeRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        className="absolute top-0 left-0 z-20 w-[185px] h-[260px] rounded-[24px] bg-white/[0.03] border border-white/12 backdrop-blur-[1.5px] shadow-[14px_22px_32px_rgba(0,0,0,0.65)] hover:border-white/20 active:cursor-grabbing cursor-grab select-none pointer-events-auto transform-gpu"
        style={{
          transformOrigin: 'top center',
          willChange: 'transform',
        }}
      >
        {/* Specular Gloss Highlight Overlay (Creates a realistic plastic sleeve glaze) */}
        <div 
          className="absolute inset-0 rounded-[24px] pointer-events-none z-30" 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.05) 100%)',
          }}
        />

        {/* Buckle & Hook Clasp Assembly (Mockup Quality Hardware) */}
        <div className="absolute top-[-44px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30 select-none">
          {/* Woven strap loop folding around the buckle bar */}
          <div className="w-[15px] h-[12px] bg-[#1b1b1f] border-x border-white/5 shadow-sm rounded-t-sm" />
          
          {/* Premium Matte-Black Plastic Buckle Clasp (Quick-release mechanism) */}
          <div className="w-[26px] h-[18px] bg-[#121214] border border-white/8 rounded-[4px] shadow-md flex items-center justify-between px-1.5 -mt-0.5 relative z-20">
            {/* Buckle side release tabs details */}
            <div className="w-[2px] h-[10px] bg-zinc-800 rounded-sm" />
            {/* Center buckle slot lines */}
            <div className="flex flex-col gap-0.5 w-[10px] items-center">
              <div className="w-full h-[1.5px] bg-zinc-900 rounded-sm" />
              <div className="w-full h-[1.5px] bg-zinc-900 rounded-sm" />
            </div>
            <div className="w-[2px] h-[10px] bg-zinc-800 rounded-sm" />
          </div>
          
          {/* Metal Swivel ring attachment */}
          <div className="w-[14px] h-[14px] rounded-full border border-white/20 bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-600 shadow flex items-center justify-center -mt-1 z-10">
            <div className="w-[8px] h-[8px] rounded-full bg-zinc-900" />
          </div>

          {/* Brushed Gunmetal Carabiner Clasp Hook */}
          <div className="w-[8px] h-[18px] bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-700 rounded-sm shadow-sm -mt-0.5 z-20 border border-zinc-500/30 flex flex-col items-center">
            <div className="w-[5px] h-[3px] bg-zinc-800 rounded-sm mt-[2px]" />
            <div className="w-[3px] h-[8px] bg-zinc-700 rounded-sm mt-[2px]" />
          </div>
        </div>

        {/* Cutout slot hole in the Plastic Sleeve */}
        <div className="w-[28px] h-[9px] bg-zinc-950/80 rounded-full border border-white/8 mx-auto mt-2.5 relative flex items-center justify-center">
          {/* Clasp hook lip passing from back to front of cutout */}
          <div className="w-[5px] h-[12px] bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-sm -mt-2 z-30 border border-zinc-500 shadow-sm" />
        </div>

        {/* Premium Matte-Black Inner ID Pass Card (Margin simulates transparent sleeve edges) */}
        <div className="absolute top-[26px] left-[6px] right-[6px] bottom-[6px] bg-[#0c0c0e] rounded-[18px] border border-white/5 shadow-inner flex flex-col justify-between p-3 overflow-hidden select-none"
             style={{
               background: 'radial-gradient(circle at 50% 20%, #17171c 0%, #0c0c0e 100%)',
             }}
        >
          {/* Vertical Holographic Brand Accent Strip */}
          <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-gold opacity-95" />

          {/* Header branding */}
          <div className="text-center flex justify-between items-center px-1">
            <div className="text-[5.5px] font-mono text-text-secondary/60 tracking-[0.25em] uppercase font-bold leading-none">
              Pass 2026
            </div>
            <div className="text-[5.5px] font-space font-extrabold text-accent-gold border border-accent-gold/25 bg-accent-gold/5 px-1.5 py-[0.5px] rounded-[2px] uppercase scale-90 leading-none">
              {t('lanyard.goldPass')}
            </div>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mt-1" />

          {/* Profile Photo Block */}
          <div className="flex flex-col items-center mt-1">
            {/* avatar inside chrome bezel */}
            <div className="w-[74px] h-[74px] rounded-full p-[2px] bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-black/60">
                <ProfileImage className="w-full h-full scale-[1.03]" />
              </div>
            </div>
            
            {/* Primary Name */}
            <h3 className="font-space font-black text-sm text-white mt-2.5 tracking-wider leading-none">
              MYBUUU
            </h3>
          </div>

          {/* Professional Credentials Tags */}
          <div className="flex flex-col gap-1 items-center mt-1.5">
            <span className="text-[6.5px] font-space font-bold bg-accent-primary/10 text-accent-primary border border-accent-primary/15 px-2 py-[1px] rounded-[4px] uppercase tracking-wider leading-none">
              {t('lanyard.visualDesigner')}
            </span>
            <span className="text-[6.5px] font-space font-bold bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/15 px-2 py-[1px] rounded-[4px] uppercase tracking-wider leading-none">
              {t('lanyard.managementStudent')}
            </span>
            <span className="text-[6.5px] font-space font-bold bg-white/5 text-white/60 border border-white/8 px-2 py-[1px] rounded-[4px] uppercase tracking-wider leading-none">
              {t('lanyard.developer')}
            </span>
          </div>

          {/* Barcode Footer & Credentials Details */}
          <div className="mt-2 text-center">
            {/* Decorative layout tagline */}
            <div className="text-[5.5px] text-text-secondary/55 font-sans leading-snug px-1.5 mb-1.5 max-w-[130px] mx-auto italic">
              {"\"" + t('lanyard.tagline') + "\""}
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full mb-1.5" />
            
            {/* Barcode strips */}
            <div className="flex items-center justify-center gap-[1px] h-[10px] opacity-60">
              <div className="h-full w-[2px] bg-white" />
              <div className="h-full w-[4px] bg-white" />
              <div className="h-full w-[1px] bg-white" />
              <div className="h-full w-[3px] bg-white" />
              <div className="h-full w-[5px] bg-white" />
              <div className="h-full w-[1px] bg-white" />
              <div className="h-full w-[3px] bg-white" />
              <div className="h-full w-[2px] bg-white" />
              <div className="h-full w-[1px] bg-white" />
              <div className="h-full w-[4px] bg-white" />
              <div className="h-full w-[2px] bg-white" />
            </div>

            <div className="flex justify-between w-full text-[5px] font-mono text-text-secondary/70 mt-1 leading-none px-1 tracking-wider">
              <span>ID: #88-MB-99</span>
              <span>{t('lanyard.access')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
