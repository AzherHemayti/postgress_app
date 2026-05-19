'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        delay,
        ease: 'power2.out',
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
          }
        },
      });
    });
    return () => ctx.revert();
  }, [target, prefix, suffix, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
