import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, User, MoreVertical, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMsg(`Failed to load users: ${error.message}`);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const handleRoleToggle = async (userId: string, currentRole: 'admin' | 'user') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      setErrorMsg(`Failed to update role: ${error.message}`);
    } else {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rise">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '32px', margin: '0 0 8px 0' }}>User Management</h1>
          <p style={{ color: 'var(--muted)', margin: 0 }}>View and manage all registered accounts.</p>
        </div>
        
        <div style={{ width: '300px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--muted)' }}>
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div style={{ marginBottom: '24px' }}>
          <Alert type="error" message={errorMsg} />
          {errorMsg.includes('policy') || errorMsg.includes('row-level security') ? (
             <p style={{ color: 'var(--threat)', fontSize: '14px', marginTop: '8px' }}>
               Note: You need to apply the Admin RLS SQL script in Supabase to view all users.
             </p>
          ) : null}
        </div>
      )}

      <div className="card" style={{
        padding: 0,
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>User</th>
              <th style={{ padding: '16px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '16px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Joined</th>
              <th style={{ padding: '16px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>Loading users...</td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        background: user.role === 'admin' ? 'linear-gradient(135deg, var(--accent), var(--accent-dim))' : 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: user.role === 'admin' ? '#2E1A11' : 'var(--muted)'
                      }}>
                        {user.role === 'admin' ? <Shield size={20} /> : <User size={20} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{user.full_name || 'Unnamed User'}</div>
                        <div style={{ fontSize: '14px', color: 'var(--muted)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      background: user.role === 'admin' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.05)', 
                      color: user.role === 'admin' ? 'var(--accent)' : 'var(--text)', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      border: user.role === 'admin' ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--muted)', fontSize: '14px' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Button 
                        variant={user.role === 'admin' ? "outline" : "primary"} 
                        style={{ padding: '6px 12px', fontSize: '12px', minHeight: 'auto' }}
                        onClick={() => handleRoleToggle(user.id, user.role)}
                      >
                        {user.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                      </Button>
                      <button style={{ 
                        background: 'transparent', border: 'none', color: 'var(--muted)', 
                        cursor: 'pointer', padding: '6px', borderRadius: '4px' 
                      }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
