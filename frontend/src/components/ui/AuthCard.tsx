import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="card" style={{
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      width: '100%',
      maxWidth: '460px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          {title && (
            <h2 className="disp" style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 600 }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
