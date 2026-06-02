'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Instantiate Lenis with cast to unknown -> ConstructorParameters to handle type mismatch on touch settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true, // v1.1+ standard touch syncing
      smoothTouch: true, // Legacy option fallback
      touchMultiplier: 1.2,
      wheelMultiplier: 0.9,
      infinite: false,
    } as unknown as ConstructorParameters<typeof Lenis>[0]);

    // Expose lenis instance globally for navbar scrollTo actions
    (window as unknown as { lenis: unknown }).lenis = lenis;

    // requestAnimationFrame scroll sync loop
    let rafId: number;
    const tick = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Clean up
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { lenis: unknown }).lenis = undefined;
    };
  }, []);

  return null;
}
