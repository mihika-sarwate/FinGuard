import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="rise">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <h1 className="disp" style={{ fontSize: '32px', margin: 0 }}>
          Admin Portal
        </h1>
        <span style={{ 
          background: 'var(--accent)', 
          color: '#2E1A11', 
          padding: '4px 8px', 
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          Administrator
        </span>
      </div>
      
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
        Logged in as {user?.email}
      </p>

      <div style={{
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid var(--accent)',
        background: 'var(--surface)',
        backdropFilter: 'blur(16px)',
      }}>
        <h2 className="disp" style={{ marginTop: 0 }}>System Overview</h2>
        <p style={{ color: 'var(--muted)', margin: 0 }}>
          Admin features (user management, global logs, etc.) will be integrated here.
        </p>
      </div>
    </div>
  );
};
