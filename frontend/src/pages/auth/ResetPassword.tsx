import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { AuthCard } from '../../components/ui/AuthCard';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { supabase } from '../../lib/supabase';

export const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="rise" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AuthCard title="New Password" subtitle="Enter your new secure password">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {errorMsg && <Alert type="error" message={errorMsg} />}

          <PasswordInput 
            label="New Password" 
            placeholder="Create a strong password" 
            required 
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput 
            label="Confirm New Password" 
            placeholder="Re-enter password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <Button type="submit" fullWidth isLoading={isLoading}>
            <KeyRound size={18} />
            Reset Password
          </Button>
        </form>
      </AuthCard>
    </div>
  );
};
