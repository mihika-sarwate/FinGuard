import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="rise card" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '400px',
      textAlign: 'center',
      padding: '40px'
    }}>
      <Construction size={48} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
      <h1 className="disp" style={{ color: 'var(--text)', fontSize: '24px', marginBottom: '8px' }}>
        {title}
      </h1>
      <p style={{ maxWidth: '400px', color: 'var(--muted)' }}>
        This administration module is scheduled for development in the upcoming phases.
      </p>
    </div>
  );
};
