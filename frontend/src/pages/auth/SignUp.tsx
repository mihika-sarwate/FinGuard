import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthCard } from '../../components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { supabase } from '../../lib/supabase';

export const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
        }
      }
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/verify-email');
    }
  };

  return (
    <div className="rise" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AuthCard title="Create Account" subtitle="Join FinGuard AI for premium banking">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {errorMsg && <Alert type="error" message={errorMsg} />}

          <Input 
            label="Full Name" 
            placeholder="John Doe" 
            required 
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />

          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <PasswordInput 
            label="Password" 
            placeholder="Create a strong password" 
            required 
            minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <PasswordInput 
            label="Confirm Password" 
            placeholder="Re-enter password" 
            required 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />

          <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '8px' }}>
            <UserPlus size={18} />
            Create Account
          </Button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600 }}>
                Login
              </Link>
            </span>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};
