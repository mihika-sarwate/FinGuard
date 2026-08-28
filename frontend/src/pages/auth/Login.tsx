import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { AuthCard } from '../../components/ui/AuthCard';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { supabase } from '../../lib/supabase';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Auto-signup fallback for demo credentials if not yet registered in Supabase
    if (error && (email === 'user@finguard.ai' || email === 'admin@finguard.ai')) {
      const isDemoAdmin = email === 'admin@finguard.ai';
      const signUpRes = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: isDemoAdmin ? 'System Administrator' : 'Demo User'
          }
        }
      });

      if (!signUpRes.error) {
        if (isDemoAdmin && signUpRes.data.user) {
          await supabase.from('profiles').update({ role: 'admin' }).eq('id', signUpRes.data.user.id);
        }
        const retrySignIn = await supabase.auth.signInWithPassword({ email, password });
        error = retrySignIn.error;
      }
    }

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="rise" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AuthCard title="Welcome Back" subtitle="Sign in to your FinGuard account">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {errorMsg && <Alert type="error" message={errorMsg} />}

          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div>
            <PasswordInput 
              label="Password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--accent)', cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Remember me</span>
              </label>
              
              <Link to="/forgot-password" style={{ fontSize: '14px', fontWeight: 500 }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '8px' }}>
            <LogIn size={18} />
            Sign In
          </Button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ color: 'var(--muted)', fontSize: '14px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ fontWeight: 600 }}>
                Create Account
              </Link>
            </span>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};
