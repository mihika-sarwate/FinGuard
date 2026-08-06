import React from 'react';
import { Users, Wallet, ArrowRightLeft, Activity, ShieldAlert, Cpu } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const metricCards = [
    { title: 'Total Users', value: '1,248', change: '+12%', icon: <Users size={20} />, color: 'var(--accent)' },
    { title: 'Total Accounts', value: '3,842', change: '+8%', icon: <Wallet size={20} />, color: 'var(--accent)' },
    { title: 'Total Transactions', value: '45,912', change: '+24%', icon: <ArrowRightLeft size={20} />, color: 'var(--accent)' },
    { title: 'Active Sessions', value: '142', change: 'Live', icon: <Activity size={20} />, color: '#10B981' }
  ];

  return (
    <div className="rise">
      <div style={{ marginBottom: '32px' }}>
        <h1 className="disp" style={{ fontSize: '32px', margin: '0 0 8px 0' }}>Platform Overview</h1>
        <p style={{ color: 'var(--muted)', margin: 0 }}>High-level system metrics and operational health.</p>
      </div>

      {/* Metric Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        {metricCards.map((card, i) => (
          <div key={i} className="card" style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '10px', 
                background: 'rgba(212, 175, 55, 0.1)', 
                color: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {card.icon}
              </div>
              <span style={{ 
                fontSize: '12px', fontWeight: 600, color: card.color,
                background: `${card.color}22`, padding: '4px 8px', borderRadius: '12px'
              }}>
                {card.change}
              </span>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>
              {card.title}
            </div>
            <div className="disp" style={{ fontSize: '32px', fontWeight: 400 }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* System Health */}
        <div className="card" style={{
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Activity size={24} style={{ color: 'var(--accent)' }} />
            <h2 className="disp" style={{ margin: 0, fontSize: '20px' }}>System Health</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['API Latency', 'Database Load', 'Auth Services'].map((metric, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text)' }}>{metric}</span>
                <span style={{ color: '#10B981', fontWeight: 600, fontSize: '14px' }}>Operational</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Usage */}
        <div className="card" style={{
          padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Cpu size={24} style={{ color: 'var(--accent)' }} />
            <h2 className="disp" style={{ margin: 0, fontSize: '20px' }}>AI Operations</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>Fraud Detection Model</span>
              <span style={{ color: 'var(--text)' }}>v2.4.1 (Active)</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ color: 'var(--muted)' }}>LLM Inference Requests</span>
              <span style={{ color: 'var(--text)' }}>14.2k / hour</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '45%', height: '100%', background: 'linear-gradient(90deg, var(--accent-dim), var(--accent))' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
