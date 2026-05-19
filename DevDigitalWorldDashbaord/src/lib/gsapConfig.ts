import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins (safe to call multiple times)
export function registerGSAP() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
  }
}

// Default eases
export const ease = {
  smooth: 'power2.out',
  snappy: 'power3.out',
  elastic: 'elastic.out(1, 0.5)',
  back: 'back.out(1.7)',
} as const;

// Common animation presets
export const presets = {
  fadeUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.7, ease: ease.smooth },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.5, ease: ease.smooth },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1, duration: 0.5, ease: ease.back },
  },
} as const;

export { gsap, ScrollTrigger };
