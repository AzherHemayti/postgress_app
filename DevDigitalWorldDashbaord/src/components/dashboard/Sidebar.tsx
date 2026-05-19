'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Projects', icon: ShoppingBag },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeSection, onNavigate, collapsed, onToggle }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stagger animate nav items on mount
  useEffect(() => {
    if (!mounted || !itemsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.nav-item-inner', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.3,
      });
    }, itemsRef);
    return () => ctx.revert();
  }, [mounted]);

  return (
    <aside
      ref={sidebarRef}
      className="sidebar-transition"
      style={{
        width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo area */}
      <div
        style={{
          padding: collapsed ? '1.25rem 0' : '1.25rem 1.25rem',
          borderBottom: '1px solid var(--border)',
          height: 'var(--navbar-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'padding var(--transition-slow) cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {collapsed ? (
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.875rem' }}>D</span>
          </div>
        ) : (
          <div style={{ position: 'relative', width: '150px', height: '56px', flexShrink: 0 }}>
            <Image
              src="/company_logo.png"
              alt="DevDigitalWorld"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav
        ref={itemsRef}
        style={{
          flex: 1,
          padding: '1rem 0.625rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`nav-item nav-item-inner ${isActive ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: collapsed ? '0.75rem' : '0.75rem 1rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'color var(--transition-fast)',
                position: 'relative',
                borderRadius: '10px',
              }}
            >
              <span className="nav-highlight" />
              <Icon
                size={18}
                style={{
                  flexShrink: 0,
                  color: isActive ? '#818cf8' : 'var(--text-muted)',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {!collapsed && (
                <span style={{ position: 'relative', zIndex: 1, whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
              )}
              {isActive && !collapsed && (
                <span
                  style={{
                    marginLeft: 'auto',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#6366f1',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div
        style={{
          padding: '1rem 0.625rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end',
        }}
      >
        <button
          id="sidebar-toggle"
          onClick={onToggle}
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast), color var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.15)';
            (e.currentTarget as HTMLButtonElement).style.color = '#818cf8';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
