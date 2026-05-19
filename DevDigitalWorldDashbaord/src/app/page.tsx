import type { Metadata } from 'next';
import ParticleBackground from '@/components/login/ParticleBackground';
import LoginCard from '@/components/login/LoginCard';

export const metadata: Metadata = {
  title: 'Login | DevDigitalWorld Client Portal',
  description: 'Sign in to the DevDigitalWorld client portal to manage your orders and projects.',
};

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <LoginCard />
      </div>
    </main>
  );
}
