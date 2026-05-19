'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapConfig';

// Fixed particle positions to avoid hydration mismatch
const PARTICLES = [
  { w: 2.4, h: 2.4, left: 12, top: 8, color: '#6366f1' },
  { w: 1.6, h: 1.6, left: 28, top: 22, color: '#8b5cf6' },
  { w: 3.0, h: 3.0, left: 45, top: 15, color: '#a78bfa' },
  { w: 2.0, h: 2.0, left: 63, top: 40, color: '#6366f1' },
  { w: 1.8, h: 1.8, left: 80, top: 10, color: '#8b5cf6' },
  { w: 2.6, h: 2.6, left: 92, top: 55, color: '#a78bfa' },
  { w: 1.4, h: 1.4, left: 7, top: 70, color: '#6366f1' },
  { w: 2.2, h: 2.2, left: 35, top: 82, color: '#8b5cf6' },
  { w: 1.6, h: 1.6, left: 55, top: 65, color: '#a78bfa' },
  { w: 2.8, h: 2.8, left: 72, top: 88, color: '#6366f1' },
  { w: 1.2, h: 1.2, left: 88, top: 30, color: '#8b5cf6' },
  { w: 2.0, h: 2.0, left: 20, top: 48, color: '#a78bfa' },
  { w: 1.8, h: 1.8, left: 50, top: 33, color: '#6366f1' },
  { w: 2.4, h: 2.4, left: 66, top: 72, color: '#8b5cf6' },
  { w: 1.6, h: 1.6, left: 40, top: 58, color: '#a78bfa' },
  { w: 3.2, h: 3.2, left: 15, top: 90, color: '#6366f1' },
  { w: 1.4, h: 1.4, left: 78, top: 44, color: '#8b5cf6' },
  { w: 2.0, h: 2.0, left: 95, top: 78, color: '#a78bfa' },
];

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      // Animate large orbs
      gsap.to('.orb-1', {
        x: 60,
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.orb-2', {
        x: -50,
        y: 60,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
      gsap.to('.orb-3', {
        x: 30,
        y: 50,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4,
      });

      // Floating micro-particles
      const particles = containerRef.current?.querySelectorAll('.particle');
      particles?.forEach((p, i) => {
        gsap.to(p, {
          y: -30 - (i % 5) * 8,
          x: (i % 2 === 0 ? 1 : -1) * 15,
          opacity: 0.35,
          duration: 3 + (i % 4) * 0.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.25,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Large gradient orbs */}
      <div
        className="orb orb-1"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #6366f1, transparent)',
          top: '-150px',
          left: '-150px',
          opacity: 0.12,
        }}
      />
      <div
        className="orb orb-2"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #8b5cf6, transparent)',
          bottom: '-100px',
          right: '-100px',
          opacity: 0.1,
        }}
      />
      <div
        className="orb orb-3"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, #6366f1, transparent)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          opacity: 0.06,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating micro-particles — rendered client-side only to avoid hydration mismatch */}
      {mounted && PARTICLES.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: `${p.w}px`,
            height: `${p.h}px`,
            borderRadius: '50%',
            background: p.color,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0.15,
          }}
        />
      ))}
    </div>
  );
}
