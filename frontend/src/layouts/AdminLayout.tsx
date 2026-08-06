import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, Shield, LayoutDashboard, Users, ShieldAlert, 
  Target, FileText, BarChart3, PlaySquare, Activity,
  Wallet, ArrowRightLeft, Receipt, Settings, Cpu
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navGroups = [
    {
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> }
      ]
    },
    {
      items: [
        { name: 'User Management', path: '/admin/users', icon: <Users size={18} /> },
        { name: 'System Accounts', path: '/admin/accounts', icon: <Wallet size={18} /> },
        { name: 'Global Transactions', path: '/admin/transactions', icon: <ArrowRightLeft size={18} /> },
        { name: 'Billing Engine', path: '/admin/bills', icon: <Receipt size={18} /> },
      ]
    },
    {
      items: [
        { name: 'Security Dashboard', path: '/admin/security', icon: <ShieldAlert size={18} /> },
        { name: 'Attack Lab', path: '/admin/attack-lab', icon: <Target size={18} /> },
        { name: 'Content Inspector', path: '/admin/content', icon: <FileText size={18} /> },
        { name: 'Session Replay', path: '/admin/sessions', icon: <PlaySquare size={18} /> },
        { name: 'System Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> },
      ]
    },
    {
      items: [
        { name: 'System Monitoring', path: '/admin/monitoring', icon: <Cpu size={18} /> },
        { name: 'Platform Settings', path: '/admin/settings', icon: <Settings size={18} /> },
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '16px 32px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
          }}>
            <Shield size={20} />
          </div>
          <span className="disp" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-dark)' }}>
            FinGuard<span style={{ color: 'var(--accent)' }}>AI</span>
          </span>
          <span style={{ 
            background: 'var(--accent)', 
            color: '#FFFFFF', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginLeft: '8px'
          }}>
            Admin Portal
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'var(--muted-dark)' }}>
              {user?.email}
            </span>
            <button 
              onClick={signOut}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--threat)' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ 
          width: '260px', 
          borderRight: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '0 24px', marginBottom: '16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Platform Controls
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px' }}>
            {navGroups.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                {group.items.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        color: isActive ? '#FFFFFF' : 'var(--text-dark)',
                        background: isActive ? 'var(--accent)' : 'transparent',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 400,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                })}
                {groupIdx < navGroups.length - 1 && (
                  <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
                )}
              </React.Fragment>
            ))}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

