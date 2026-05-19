'use client';

import { useState, useRef } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';
import { serviceTypes } from '@/lib/mockData';
import Toast from '@/components/ui/Toast';

export default function SubmitOrderForm() {
  const [projectName, setProjectName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (submitted) return;

    // Button press
    gsap.to(btnRef.current, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Short delay then success state
    setTimeout(() => {
      setSubmitted(true);
      setToastVisible(true);

      // Animate success icon
      setTimeout(() => {
        if (checkRef.current) {
          gsap.fromTo(
            checkRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      }, 50);

      // Reset after 4s
      setTimeout(() => {
        if (formRef.current) {
          gsap.to(formRef.current, {
            opacity: 0.5,
            duration: 0.3,
            onComplete: () => {
              setSubmitted(false);
              setProjectName('');
              setServiceType('');
              setDescription('');
              setFileName('');
              gsap.to(formRef.current, { opacity: 1, duration: 0.3 });
            },
          });
        }
      }, 3500);
    }, 400);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <>
      <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            Submit New Request
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Tell us what you need — we&apos;ll get back to you within 24 hours
          </p>
        </div>

        {/* Form body */}
        <div ref={formRef} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Row: Project Name + Service Type */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
            className="form-grid"
          >
            {/* Project Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Project Name
              </label>
              <input
                type="text"
                className="input-base"
                placeholder="e.g. Company Website Redesign"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={submitted}
              />
            </div>

            {/* Service Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Service Type
              </label>
              <select
                className="input-base"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                disabled={submitted}
              >
                <option value="" disabled>Select a service...</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Project Description
            </label>
            <textarea
              className="input-base"
              placeholder="Describe your project goals, requirements, timeline, and any references you have..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitted}
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
          </div>

          {/* File Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Attachments (optional)
            </label>
            <div
              className="drop-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
              />
              {fileName ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: '#22c55e' }} />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{fileName}</span>
                </div>
              ) : (
                <>
                  <Upload size={22} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Drop files here or click to browse
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    PDF, PNG, JPG, ZIP up to 20MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Submit */}
          {submitted ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
              }}
            >
              <div ref={checkRef}>
                <CheckCircle size={20} style={{ color: '#22c55e' }} />
              </div>
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#4ade80' }}>
                Request submitted successfully!
              </span>
            </div>
          ) : (
            <button
              ref={btnRef}
              id="submit-order-btn"
              onClick={handleSubmit}
              className="gradient-bg"
              style={{
                padding: '0.875rem 2rem',
                borderRadius: '12px',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9375rem',
                cursor: 'pointer',
                alignSelf: 'flex-start',
                boxShadow: '0 8px 32px rgba(99,102,241,0.3)',
                transition: 'box-shadow var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 });
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.45)';
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.3)';
              }}
            >
              Submit Request
            </button>
          )}
        </div>
      </div>

      <Toast
        message="Your request has been submitted. We'll respond within 24 hours."
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />

    </>
  );
}
