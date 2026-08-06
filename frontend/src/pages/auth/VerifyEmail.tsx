import React from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowRight } from 'lucide-react';
import { AuthCard } from '../../components/ui/AuthCard';
import { Button } from '../../components/ui/Button';

export const VerifyEmail: React.FC = () => {
  return (
    <div className="rise" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AuthCard>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '16px 0' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--surface-raised)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            marginBottom: '8px'
          }}>
            <MailCheck size={32} />
          </div>
          
          <h2 className="disp" style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
            Check your email
          </h2>
          
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.5', maxWidth: '300px' }}>
            We've sent a verification link to your email address. Please verify your account to continue.
          </p>

          <div style={{ width: '100%', marginTop: '16px' }}>
            <Link to="/login" style={{ width: '100%' }}>
              <Button variant="outline" fullWidth>
                Return to Login
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
};
