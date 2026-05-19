'use client';

import { useEffect, useRef } from 'react';
import { ShoppingBag, Layers, Clock, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { statCards } from '@/lib/mockData';

const iconMap = {
  ShoppingBag,
  Layers,
  Clock,
  CheckCircle,
};

const colorMap: Record<string, { bg: string; icon: string; glow: string }> = {
  indigo: {
    bg: 'rgba(99,102,241,0.1)',
    icon: '#818cf8',
    glow: 'rgba(99,102,241,0.15)',
  },
  violet: {
    bg: 'rgba(139,92,246,0.1)',
    icon: '#a78bfa',
    glow: 'rgba(139,92,246,0.15)',
  },
  amber: {
    bg: 'rgba(245,158,11,0.1)',
    icon: '#fbbf24',
    glow: 'rgba(245,158,11,0.12)',
  },
  green: {
    bg: 'rgba(34,197,94,0.1)',
    icon: '#4ade80',
    glow: 'rgba(34,197,94,0.12)',
  },
};

export default function OverviewCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {statCards.map((card, i) => {
        const Icon = iconMap[card.icon as keyof typeof iconMap];
        const colors = colorMap[card.color];
        return (
          <div
            key={card.id}
            id={`stat-card-${card.id}`}
            className="stat-card card-hover glass"
            style={{
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              cursor: 'default',
              boxShadow: `0 0 0 1px var(--border), 0 8px 32px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Icon + label row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: colors.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 20px ${colors.glow}`,
                }}
              >
                {Icon && <Icon size={20} style={{ color: colors.icon }} />}
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: card.changePositive ? '#4ade80' : '#f87171',
                  background: card.changePositive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${card.changePositive ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: '99px',
                  padding: '0.2rem 0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                {card.changePositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {card.change.split(' ')[0]}
              </span>
            </div>

            {/* Value */}
            <div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  marginBottom: '0.25rem',
                }}
              >
                <AnimatedCounter target={card.value} delay={i * 0.1 + 0.3} />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {card.label}
              </p>
            </div>

            {/* Change text */}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{card.change}</p>
          </div>
        );
      })}
    </div>
  );
}
