'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from '@/lib/gsapConfig';
import { mockOrders, PROCESS_STAGES, Order, ProcessStage } from '@/lib/mockData';
import { ChevronDown } from 'lucide-react';

const stageColors: Record<ProcessStage, { bg: string; color: string; dot: string; border: string }> = {
  Requirements: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', dot: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  Design: { bg: 'rgba(139,92,246,0.12)', color: '#a78bfa', dot: '#8b5cf6', border: 'rgba(139,92,246,0.3)' },
  Development: { bg: 'rgba(59,130,246,0.12)', color: '#60a5fa', dot: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
  Review: { bg: 'rgba(236,72,153,0.12)', color: '#f472b6', dot: '#ec4899', border: 'rgba(236,72,153,0.3)' },
  Testing: { bg: 'rgba(20,184,166,0.12)', color: '#2dd4bf', dot: '#14b8a6', border: 'rgba(20,184,166,0.3)' },
  Delivered: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80', dot: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  'On Hold': { bg: 'rgba(107,114,128,0.12)', color: '#9ca3af', dot: '#6b7280', border: 'rgba(107,114,128,0.3)' },
};

const COLS = ['Project ID', 'Client', 'Service', 'Stage', 'Date', 'Value'];

// ─── Portal Dropdown ─────────────────────────────────────────────────────────
interface PortalDropdownProps {
  orderId: string;
  currentStage: ProcessStage;
  anchorRect: DOMRect;
  onSelect: (stage: ProcessStage) => void;
  onClose: () => void;
}

function PortalDropdown({ orderId, currentStage, anchorRect, onSelect, onClose }: PortalDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Animate in
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: -6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' }
      );
    }
  }, []);

  // Close on outside mousedown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Position: below the anchor button
  const top = anchorRect.bottom + 6;
  const left = anchorRect.left;

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top,
        left,
        zIndex: 99999,
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '0.375rem',
        boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
        minWidth: '160px',
      }}
    >
      {PROCESS_STAGES.map((stage) => {
        const s = stageColors[stage];
        const isActive = currentStage === stage;
        return (
          <button
            key={stage}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(stage);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              background: isActive ? s.bg : 'transparent',
              border: 'none',
              color: isActive ? s.color : 'rgba(255,255,255,0.55)',
              fontSize: '0.8rem',
              fontWeight: isActive ? 600 : 400,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.12s, color 0.12s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = s.bg;
              e.currentTarget.style.color = s.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isActive ? s.bg : 'transparent';
              e.currentTarget.style.color = isActive ? s.color : 'rgba(255,255,255,0.55)';
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
            {stage}
          </button>
        );
      })}
    </div>,
    document.body
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────
export default function OrdersTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [openDropdown, setOpenDropdown] = useState<{ id: string; rect: DOMRect } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.table-row', {
        opacity: 0, y: 16, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.3,
      });
    }, tableRef);
    return () => ctx.revert();
  }, []);

  const handleTriggerClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, orderId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setOpenDropdown((prev) => (prev?.id === orderId ? null : { id: orderId, rect }));
  }, []);

  const updateStage = useCallback((orderId: string, stage: ProcessStage) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, stage } : o)));
    setOpenDropdown(null);
  }, []);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  return (
    <div ref={tableRef} className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Client Projects
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {orders.length} projects · click stage badge to update process
          </p>
        </div>
        <span style={{
          fontSize: '0.72rem', color: '#818cf8',
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '8px', padding: '0.3rem 0.75rem', fontWeight: 500,
        }}>
          CEO View
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {COLS.map((col) => (
                <th key={col} style={{
                  padding: '0.875rem 1.5rem', textAlign: 'left',
                  fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap',
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const s = stageColors[order.stage];
              const isOpen = openDropdown?.id === order.id;

              return (
                <tr
                  key={order.id}
                  className="table-row table-row-hover"
                  style={{ borderBottom: i < orders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                >
                  {/* Project ID */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#818cf8', fontFamily: 'var(--font-geist-mono)' }}>
                      {order.id}
                    </span>
                  </td>

                  {/* Client */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {order.client}
                    </span>
                  </td>

                  {/* Service */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      {order.service}
                    </span>
                  </td>

                  {/* Stage — portal dropdown trigger */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <button
                      onClick={(e) => handleTriggerClick(e, order.id)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.3rem 0.6rem', borderRadius: '99px',
                        background: s.bg, border: `1px solid ${s.border}`,
                        color: s.color, fontSize: '0.75rem', fontWeight: 500,
                        cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                      {order.stage}
                      <ChevronDown size={11} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                    </button>

                    {/* Portal dropdown — rendered at body level, no clipping */}
                    {mounted && isOpen && openDropdown && (
                      <PortalDropdown
                        orderId={order.id}
                        currentStage={order.stage}
                        anchorRect={openDropdown.rect}
                        onSelect={(stage) => updateStage(order.id, stage)}
                        onClose={closeDropdown}
                      />
                    )}
                  </td>

                  {/* Date */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {order.date}
                    </span>
                  </td>

                  {/* Value */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {order.amount}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
