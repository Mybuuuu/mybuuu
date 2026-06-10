'use client';

import React, { useEffect, useRef } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  shape: 'circle' | 'ring' | 'cross' | 'star';
  rotation: number;
  rotationSpeed: number;
  parallaxFactor: number;
}

export default function BackgroundSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // List of active particles (ambient sparks + cursor sparks)
    let particles: Spark[] = [];
    
    // Color palettes reflecting brand accent colors
    const colors = [
      'rgba(124, 58, 237, ',  // Purple primary
      'rgba(168, 85, 247, ',  // Lavender secondary
      'rgba(59, 130, 246, ',  // Blue accent
      'rgba(255, 255, 255, ',  // White highlight
    ];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    // Helper to spawn a single ambient particle
    const createAmbientSpark = (yPos: number, randomLife = false): Spark => {
      const randVal = Math.random();
      let shape: 'circle' | 'ring' | 'cross' | 'star' = 'circle';
      let size = random(0.5, 2.0);

      // Distribute shapes for rich visual context
      if (randVal > 0.75 && randVal <= 0.88) {
        shape = 'ring';
        size = random(2.0, 4.0);
      } else if (randVal > 0.88 && randVal <= 0.94) {
        shape = 'cross';
        size = random(3.0, 5.5);
      } else if (randVal > 0.94) {
        shape = 'star';
        size = random(3.0, 5.0);
      }

      return {
        x: random(0, width),
        y: yPos,
        vx: random(-0.2, 0.2),
        vy: random(-0.6, -0.15), // slow upward drift
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: shape === 'circle' ? random(0.12, 0.55) : random(0.06, 0.25), // shapes are dimmer and subtle
        life: randomLife ? random(0, 1) : 0,
        maxLife: random(250, 450),
        shape,
        rotation: random(0, Math.PI * 2),
        rotationSpeed: random(-0.015, 0.015),
        parallaxFactor: random(0.04, 0.26), // different depths
      };
    };

    // Initialize ambient background sparks (proportional to screen area)
    const ambientCount = Math.min(50, Math.floor((width * height) / 35000));
    for (let i = 0; i < ambientCount; i++) {
      particles.push(createAmbientSpark(random(0, height), true));
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Dynamic scroll tracking to shift ambient sparks with parallax speed mapping
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Adjust particle heights based on scroll direction & speed
      particles.forEach((p) => {
        if (p.maxLife > 100) {
          p.y -= deltaScroll * p.parallaxFactor;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track mouse position to emit mouse-sparks
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Spawn cursor trail particles on movement
      const dist = Math.hypot(e.clientX - prevX, e.clientY - prevY);
      
      if (dist > 2 && particles.length < 150) {
        const spawnCount = Math.min(2, Math.floor(dist / 12) + 1);
        for (let i = 0; i < spawnCount; i++) {
          particles.push({
            x: e.clientX + random(-3, 3),
            y: e.clientY + random(-3, 3),
            vx: random(-0.6, 0.6),
            vy: random(-0.3, 0.6),
            size: random(0.8, 2.2),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.85,
            life: 1,
            maxLife: random(35, 75),
            shape: 'circle',
            rotation: 0,
            rotationSpeed: 0,
            parallaxFactor: 0,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles = particles.filter((p) => {
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Ambient particles behavior
        if (p.maxLife > 100) {
          p.life += 1;
          
          // Sway slowly
          p.vx += random(-0.012, 0.012);
          p.vx = Math.max(-0.4, Math.min(0.4, p.vx));
          p.rotation += p.rotationSpeed;

          // Compute fade in and fade out
          const currentAlpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.alpha;
          
          if (currentAlpha > 0) {
            const opacityStr = currentAlpha.toFixed(2) + ')';
            
            if (p.shape === 'circle') {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color + opacityStr;
              ctx.fill();
            } else if (p.shape === 'ring') {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.strokeStyle = p.color + opacityStr;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            } else if (p.shape === 'cross') {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.beginPath();
              ctx.moveTo(-p.size, 0);
              ctx.lineTo(p.size, 0);
              ctx.moveTo(0, -p.size);
              ctx.lineTo(0, p.size);
              ctx.strokeStyle = p.color + opacityStr;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.restore();
            } else if (p.shape === 'star') {
              ctx.save();
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.beginPath();
              ctx.moveTo(0, -p.size);
              ctx.lineTo(p.size * 0.7, 0);
              ctx.lineTo(0, p.size);
              ctx.lineTo(-p.size * 0.7, 0);
              ctx.closePath();
              ctx.fillStyle = p.color + opacityStr;
              ctx.fill();
              ctx.restore();
            }
          }

          // Reset if it goes off screen or finishes life
          if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20 || p.y > height + 20) {
            Object.assign(p, createAmbientSpark(height + 15));
          }
          return true;
        } else {
          // Cursor trail sparks decay quickly
          p.life -= 1 / p.maxLife;
          p.vy += 0.012; // light gravity drift

          if (p.life <= 0) return false;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color + (p.alpha * p.life).toFixed(2) + ')';
          ctx.fill();
          return true;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-55"
    />
  );
}
