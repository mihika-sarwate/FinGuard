import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthCard } from '../../components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { supabase } from '../../lib/supabase';

export const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="rise" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AuthCard title="Reset Password" subtitle="Enter your email to receive a reset link">
        {success ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Alert 
              type="success" 
              message="If an account exists for that email, we have sent a reset link." 
            />
            <Button variant="outline" fullWidth onClick={() => window.location.href = '/login'}>
              <ArrowLeft size={18} />
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {errorMsg && <Alert type="error" message={errorMsg} />}

            <Input 
              label="Email Address" 
              type="email" 
              placeholder="john@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button type="submit" fullWidth isLoading={isLoading}>
              <Mail size={18} />
              Send Reset Link
            </Button>

            <div style={{ textAlign: 'center' }}>
              <Link to="/login" style={{ fontSize: '14px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </div>
  );
};
