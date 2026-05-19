'use client';


import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';

export default function LoginCard() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // ─── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(cardRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
      });
      tl.from(
        '.login-field',
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    });
    return () => ctx.revert();
  }, []);

  // ─── Button hover ──────────────────────────────────────────────────────────
  const handleBtnEnter = () => {
    if (loading) return;
    gsap.to(btnRef.current, { scale: 1.03, duration: 0.2, ease: 'power2.out' });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' });
  };

  // ─── Login ────────────────────────────────────────────────────────



  const handleLogin = async () => {

      console.log("EMAIL:", email);
console.log("PASSWORD:", password);

  if (loading) return;

  setLoading(true);

  try {

    const response = await fetch(
      'http://localhost:3001/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

  

    const data = await response.json();


console.log("BACKEND RESPONSE:", data);

    if (!data.success) {

      alert('You are not a CEO of DevDigitalWorld');

      setLoading(false);

      return;
    }

    localStorage.setItem('token', data.token);

    gsap.to(btnRef.current, {
      scale: 0.98,
      duration: 0.1,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        router.push('/dashboard');
      },
    });

    tl.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.6,
      ease: 'power4.inOut',
      transformOrigin: 'bottom center',
    });

  } catch (error) {

    console.log(error);

    alert('Server Error');

    setLoading(false);

  }
};

    

  return (
    <>
      {/* Page transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#080808',
          zIndex: 9999,
          transform: 'scaleY(0)',
        }}
      />

      <div
        ref={cardRef}
        className="glass-strong relative w-full max-w-md mx-4"
        style={{
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 32px 96px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div className="login-field flex items-center justify-center mb-8">
          <Image
            src="/company_logo.png"
            alt="DevDigitalWorld Logo"
            width={300}
            height={200}
            style={{ objectFit: 'contain', maxHeight: '100px' }}
            priority
          />
        </div>

        {/* Heading */}
        <div className="login-field mb-8 text-center">
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '0.4rem',
            }}
          >
            CEO Project Dashboard
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Sign in to manage your orders and projects
          </p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div className="login-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="email"
                className="input-base"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.75rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Password
              </label>
              <button
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent-start)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-base"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div
            className="login-field"
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
          >
            <input
              id="remember"
              type="checkbox"
              className="custom-checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
              Remember me for 30 days
            </label>
          </div>

          {/* Submit button */}
          <button
            ref={btnRef}
            id="login-btn"
            className="login-field gradient-bg"
            onClick={handleLogin}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem 1.5rem',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.25rem',
              boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
                Signing in...
              </>
            ) : (
              <>
                Login to Dashboard
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {/* Footer note */}
        <p
          className="login-field"
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: '1.5rem',
          }}
        >
          By signing in, you agree to our{' '}
          <span style={{ color: 'var(--accent-start)', cursor: 'pointer' }}>Terms of Service</span>
        </p>
      </div>
    </>
  );
}
