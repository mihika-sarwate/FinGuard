import React from 'react';
import { 
  ShieldCheck, Shield, Key, Smartphone, AlertTriangle, 
  Activity, CheckCircle2, Lock, Eye
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const Security: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Security Center</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Monitor account safety and AI defense systems</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px' }}>
        
        {/* Left Column: Core Score & Prompt Injection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card rise" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--surface) 0%, rgba(34, 197, 94, 0.05) 100%)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ value: 92 }, { value: 8 }]} cx="50%" cy="50%" innerRadius={65} outerRadius={80} startAngle={90} endAngle={-270} stroke="none" dataKey="value">
                    <Cell fill="var(--safe)" />
                    <Cell fill="var(--surface-raised)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={32} color="var(--safe)" style={{ marginBottom: '4px' }} />
                <h2 className="disp" style={{ margin: 0, fontSize: '32px', fontWeight: 700, color: 'var(--text-dark)' }}>92%</h2>
              </div>
            </div>
            <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--safe)' }}>Excellent</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted-dark)', textAlign: 'center' }}>Your account is highly protected against both conventional and AI threats.</p>
          </div>

          <div className="card" style={{ padding: '24px', background: 'var(--surface-raised)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '8px', background: 'var(--accent)', borderRadius: '8px', color: '#fff' }}>
                <Lock size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Prompt Injection Defense</h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted-dark)' }}>FinGuard AI active protection</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--muted-dark)' }}>Status</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--safe)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> Enabled</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--muted-dark)' }}>Last Scan</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)' }}>5 mins ago</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--muted-dark)' }}>Threats Blocked</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--threat)' }}>32</span>
              </div>
            </div>
            <button style={{ width: '100%', marginTop: '20px', padding: '10px', background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', cursor: 'pointer' }}>
              View Threat Log
            </button>
          </div>

        </div>

        {/* Right Column: Cards & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <SecuritySettingCard icon={<Key size={20}/>} title="Password Strength" status="Strong" color="var(--safe)" />
            <SecuritySettingCard icon={<Smartphone size={20}/>} title="Two-Factor Auth" status="Enabled" color="var(--safe)" />
            <SecuritySettingCard icon={<Activity size={20}/>} title="Last Login" status="Today, Mumbai" color="var(--text-dark)" />
            <SecuritySettingCard icon={<Eye size={20}/>} title="Trusted Devices" status="2 Active" color="var(--text-dark)" />
          </div>

          <div className="card" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: 'var(--text-dark)' }}>Recent Security Events</h3>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', height: '2px', background: 'var(--border)' }}></div>
                
                <TimelineStep icon={<Activity size={18} />} title="Login" time="Yesterday" />
                <TimelineStep icon={<AlertTriangle size={18} />} title="Bill Payment" time="Yesterday" />
                <TimelineStep icon={<Shield size={18} />} title="Email Scan" time="10:42 AM" highlight />
                <TimelineStep icon={<ShieldCheck size={18} />} title="Protected" time="10:43 AM" highlight color="var(--safe)" />
              </div>
            </div>

            <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={24} color="var(--safe)" />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--safe)', fontWeight: 600 }}>No Immediate Threats</h4>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted-dark)' }}>Your system is continuously monitored by AI.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const SecuritySettingCard = ({ icon, title, status, color }: { icon: React.ReactNode, title: string, status: string, color: string }) => (
  <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ padding: '12px', background: 'var(--surface-raised)', borderRadius: '10px', color: 'var(--muted-dark)' }}>
      {icon}
    </div>
    <div>
      <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--muted-dark)', fontWeight: 500 }}>{title}</h4>
      <p style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 600, color }}>{status}</p>
    </div>
  </div>
);

const TimelineStep = ({ icon, title, time, highlight, color }: { icon: React.ReactNode, title: string, time: string, highlight?: boolean, color?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 1, background: 'var(--surface)', padding: '0 8px' }}>
    <div style={{ 
      width: '48px', height: '48px', borderRadius: '50%', 
      background: highlight ? 'var(--surface)' : 'var(--surface-raised)', 
      border: `2px solid ${highlight ? (color || 'var(--accent)') : 'var(--border)'}`, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: highlight ? (color || 'var(--accent)') : 'var(--muted-dark)'
    }}>
      {icon}
    </div>
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: highlight ? (color || 'var(--text-dark)') : 'var(--muted-dark)' }}>{title}</h4>
      <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--muted-dark)' }}>{time}</p>
    </div>
  </div>
);
