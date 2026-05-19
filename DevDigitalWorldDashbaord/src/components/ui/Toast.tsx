'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Toast({ message, visible, onHide }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      const tl = gsap.timeline();
      tl.fromTo(
        ref.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
      tl.to(ref.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        delay: 2.5,
        onComplete: onHide,
      });
    }
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div className="toast">
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'var(--bg-elevated)',
          border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: '12px',
          padding: '0.875rem 1.25rem',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.1)',
          minWidth: '260px',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'rgba(34,197,94,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <CheckCircle size={16} style={{ color: '#22c55e' }} />
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>
            Success!
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
