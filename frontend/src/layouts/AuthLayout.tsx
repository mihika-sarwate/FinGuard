import React from 'react';
import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'var(--accent)',
        filter: 'blur(160px)',
        opacity: 0.1,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '300px',
        height: '300px',
        background: '#3DDC84',
        filter: 'blur(160px)',
        opacity: 0.05,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      {/* Brand Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '40px',
        zIndex: 1
      }} className="rise">
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2E1A11',
          boxShadow: '0 8px 24px var(--accent-glow)'
        }}>
          <Shield size={28} />
        </div>
        <span className="disp" style={{
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '-0.5px'
        }}>
          FinGuard<span style={{ color: 'var(--accent)' }}>AI</span>
        </span>
      </div>

      {/* Auth Content */}
      <div style={{ zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </div>
    </div>
  );
};
