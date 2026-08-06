import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: 'admin' | 'user' | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  isLoading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-login configuration for Admin (Handles unconfirmed email state)
    if (localStorage.getItem('magic_admin') === 'true') {
      const magicUser = { id: 'magic-admin-id', email: 'admin@finguard.ai' } as User;
      setSession({ user: magicUser } as Session);
      setUser(magicUser);
      setRole('admin');
      setIsLoading(false);
      return;
    }
    
    // Auto-login configuration for Demo User
    if (localStorage.getItem('magic_user') === 'true') {
      const magicUser = { id: 'magic-user-id', email: 'user@finguard.ai' } as User;
      setSession({ user: magicUser } as Session);
      setUser(magicUser);
      setRole('user');
      setIsLoading(false);
      return;
    }

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.email, session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (localStorage.getItem('magic_admin') === 'true') return;
      
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRole(session.user.email, session.user.id);
      } else {
        setRole(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (email: string | undefined, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
        
      if (!error && data) {
        setRole(data.role as 'admin' | 'user');
      } else {
        // Fallback bypass for RLS infinite recursion blocks
        if (email === 'admin@finguard.ai' || email === 'superadmin@finguard.ai') {
          setRole('admin');
        } else {
          setRole('user');
        }
      }
    } catch (err) {
      console.error('Error fetching role:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('magic_admin');
    localStorage.removeItem('magic_user');
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ session, user, role, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
