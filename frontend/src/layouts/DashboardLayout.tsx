import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, Shield, LayoutDashboard, Settings, Wallet, 
  CreditCard, ArrowRightLeft, ShieldCheck, Target, Bot,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'AI Assistant', path: '/dashboard/assistant', icon: <Bot size={18} /> },
    { name: 'Accounts', path: '/dashboard/accounts', icon: <Wallet size={18} /> },
    { name: 'Payments', path: '/dashboard/payments', icon: <CreditCard size={18} /> },
    { name: 'Transactions', path: '/dashboard/transactions', icon: <ArrowRightLeft size={18} /> },
    { name: 'Security', path: '/dashboard/security', icon: <ShieldCheck size={18} /> },
    { name: 'Attack Demo', path: '/dashboard/attack-demo', icon: <Target size={18} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '16px 32px',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(20px)',
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
            background: 'var(--safe)', 
            color: '#FFFFFF', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginLeft: '8px'
          }}>
            Secure
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {role === 'admin' && (
            <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--accent)', fontWeight: 600 }}>
              <Settings size={18} />
              Admin Portal
            </Link>
          )}

          {role === 'admin' && <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />}
          
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

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <aside style={{ 
          width: isCollapsed ? '80px' : '260px', 
          borderRight: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.3s ease'
        }}>
          <div style={{ padding: isCollapsed ? '0 16px' : '0 24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
            {!isCollapsed && <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              My Finance
            </span>}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: isCollapsed ? '0 12px' : '0 16px' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: isCollapsed ? '10px' : '10px 16px',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    borderRadius: '8px',
                    color: isActive ? '#FFFFFF' : 'var(--text-dark)',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div style={{ flexShrink: 0 }}>{item.icon}</div>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto', background: 'transparent' }}>
          <Outlet />
        </main>
        
        {/* Floating AI Assistant Button */}
        {location.pathname !== '/dashboard/assistant' && (
          <Link 
            to="/dashboard/assistant"
            className="rise"
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              width: '56px',
              height: '56px',
              borderRadius: '28px',
              background: 'var(--accent)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(29, 78, 216, 0.3)',
              cursor: 'pointer',
              zIndex: 100,
              border: '2px solid rgba(255,255,255,0.2)'
            }}
            title="Open AI Assistant"
          >
            <Bot size={28} />
          </Link>
        )}
      </div>
    </div>
  );
};
