import React from 'react';
import { 
  User, Shield, Bell, Globe, Building, Bot, 
  EyeOff, Smartphone, LogOut, ChevronRight
} from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Settings</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Manage your account preferences and AI configurations</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Profile & Security */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Account & Security
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsRow icon={<User size={18}/>} title="Profile Details" desc="Update your name, email, and contact info" />
            <SettingsRow icon={<Shield size={18}/>} title="Password & Authentication" desc="Change password or enable Two-Factor Auth (2FA)" status="2FA Enabled" statusColor="var(--safe)" />
            <SettingsRow icon={<Building size={18}/>} title="Default Bank Account" desc="HDFC Bank (XXXX1234)" />
          </div>
        </div>

        {/* AI & Privacy */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            FinGuard AI & Privacy
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsRow icon={<Bot size={18}/>} title="AI Assistant Settings" desc="Configure tone, auto-pay thresholds, and permissions" />
            <SettingsRow icon={<EyeOff size={18}/>} title="Privacy & Data Sharing" desc="Manage what data is shared with ML models" status="Strict" statusColor="var(--accent)" />
          </div>
        </div>

        {/* Preferences */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Preferences
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsRow icon={<Bell size={18}/>} title="Notifications" desc="Push, Email, and SMS alerts" />
            <SettingsRow icon={<Globe size={18}/>} title="Language & Region" desc="English (India), INR (₹)" />
          </div>
        </div>

        {/* Devices */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: 'var(--surface-raised)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Device Management
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsRow icon={<Smartphone size={18}/>} title="Connected Devices" desc="2 Active Sessions (MacBook Pro, iPhone 14)" />
            
            <button style={{ 
              display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', 
              background: 'transparent', border: 'none', borderTop: '1px solid var(--border-card)', 
              cursor: 'pointer', textAlign: 'left', width: '100%', color: 'var(--threat)'
            }}>
              <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', color: 'var(--threat)' }}>
                <LogOut size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Logout All Devices</h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--threat)', opacity: 0.8 }}>Instantly sign out from everywhere</p>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const SettingsRow = ({ icon, title, desc, status, statusColor }: { icon: React.ReactNode, title: string, desc: string, status?: string, statusColor?: string }) => (
  <button style={{ 
    display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', 
    background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-card)', 
    cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'background 0.2s'
  }} className="hover:bg-surface-raised">
    <div style={{ padding: '10px', background: 'var(--surface-raised)', borderRadius: '10px', color: 'var(--text-dark)', border: '1px solid var(--border)' }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--text-dark)' }}>{title}</h4>
      <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted-dark)' }}>{desc}</p>
    </div>
    {status && (
      <span style={{ fontSize: '12px', fontWeight: 600, color: statusColor, padding: '4px 10px', background: `color-mix(in srgb, ${statusColor} 10%, transparent)`, borderRadius: '99px' }}>
        {status}
      </span>
    )}
    <ChevronRight size={18} color="var(--muted-dark)" />
  </button>
);
