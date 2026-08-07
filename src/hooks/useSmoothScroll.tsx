import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
};
