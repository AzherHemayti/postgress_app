'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import OverviewCards from '@/components/dashboard/OverviewCards';
import OrdersTable from '@/components/dashboard/OrdersTable';
import { Calendar, ArrowRight } from 'lucide-react';

const SIDEBAR_EXPANDED = '260px';
const SIDEBAR_COLLAPSED = '68px';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const contentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  // Page entrance animation
  useEffect(() => {
    if (!mainRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(mainRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.from('.dash-heading', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        delay: 0.15,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  // Re-animate content when section changes
  const handleNavigate = (id: string) => {
    if (id === activeSection) return;
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          setActiveSection(id);
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    } else {
      setActiveSection(id);
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      ref={mainRef}
      style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex' }}
    >
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />

      {/* Main area */}
      <div
        style={{
          marginLeft: sidebarWidth,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left var(--transition-slow) cubic-bezier(0.4,0,0.2,1)',
          minWidth: 0,
        }}
      >
        {/* Navbar */}
        <Navbar sidebarWidth={sidebarWidth} />

        {/* Scrollable content */}
        <main
          style={{
            flex: 1,
            paddingTop: 'var(--navbar-height)',
            overflowY: 'auto',
          }}
        >
          <div
            ref={contentRef}
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '2rem 1.5rem 4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* ─── Dashboard Overview ─────────────────────────────── */}
            {(activeSection === 'dashboard' || activeSection === 'orders' || activeSection === 'settings') && (
              <>
                {/* Page heading */}
                <div
                  className="dash-heading"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#818cf8',
                          background: 'rgba(99,102,241,0.1)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          borderRadius: '99px',
                          padding: '0.15rem 0.625rem',
                          fontWeight: 500,
                        }}
                      >
                        {activeSection === 'dashboard' ? 'Overview' : activeSection === 'orders' ? 'Orders' : 'Settings'}
                      </span>
                    </div>
                    <h1
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      {getGreeting()}, Abdul Wahab 👋
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Here&apos;s what&apos;s happening with your projects today.
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.875rem',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                    }}
                  >
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{today}</span>
                  </div>
                </div>

                {/* Stat cards */}
                <OverviewCards />

                {/* Quick actions */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {[
                    { label: 'New Order', desc: 'Start a fresh request', color: '#6366f1' },
                    { label: 'View Reports', desc: 'Analytics & insights', color: '#8b5cf6' },
                    { label: 'Contact Team', desc: 'Get support instantly', color: '#a78bfa' },
                  ].map((action) => (
                    <button
                      key={action.label}
                      className="card-hover"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '0.5rem',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                          {action.label}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{action.desc}</p>
                      </div>
                      <ArrowRight size={16} style={{ color: action.color, flexShrink: 0 }} />
                    </button>
                  ))}
                </div>

                {/* Orders Table */}
                <OrdersTable />
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
