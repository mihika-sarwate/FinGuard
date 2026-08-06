import React from 'react';
import { 
  Zap, Droplets, Wifi, Smartphone, CreditCard, Shield, 
  Calendar, CheckCircle2, AlertTriangle, ArrowRight, Sparkles
} from 'lucide-react';

export const Payments: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Payments & Bill Center</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Manage utilities, transfers, and upcoming due dates</p>
      </div>

      {/* Quick Pay Buttons */}
      <div>
        <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Pay</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          <QuickPayBtn icon={<Zap size={24} />} label="Electricity" />
          <QuickPayBtn icon={<Droplets size={24} />} label="Water" />
          <QuickPayBtn icon={<Wifi size={24} />} label="Internet" />
          <QuickPayBtn icon={<Smartphone size={24} />} label="Mobile" />
          <QuickPayBtn icon={<CreditCard size={24} />} label="Credit Card" />
          <QuickPayBtn icon={<Shield size={24} />} label="Insurance" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="var(--accent)" /> Scheduled Payments
              </h3>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-dark)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Bill</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Due Date</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>AutoPay</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Wifi size={16} color="var(--muted-dark)"/> Jio Fiber</td>
                  <td style={{ padding: '16px 8px', color: 'var(--threat)', fontWeight: 600 }}>Tomorrow</td>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹999</td>
                  <td style={{ padding: '16px 8px' }}>
                    <div style={{ width: '36px', height: '20px', background: 'var(--accent)', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><CreditCard size={16} color="var(--muted-dark)"/> HDFC Card</td>
                  <td style={{ padding: '16px 8px' }}>Aug 12</td>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹12,450</td>
                  <td style={{ padding: '16px 8px' }}>
                    <div style={{ width: '36px', height: '20px', background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ width: '16px', height: '16px', background: 'var(--muted-dark)', borderRadius: '50%', position: 'absolute', left: '2px', top: '1px' }}></div>
                    </div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={16} color="var(--muted-dark)"/> LIC Premium</td>
                  <td style={{ padding: '16px 8px' }}>Aug 28</td>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹4,500</td>
                  <td style={{ padding: '16px 8px' }}>
                    <div style={{ width: '36px', height: '20px', background: 'var(--accent)', borderRadius: '10px', position: 'relative' }}>
                      <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--muted-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>Recent Payments</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={16} color="var(--accent)" />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Electricity</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--muted-dark)' }}>Yesterday</span>
                </div>
                <h2 className="disp" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>₹3,200</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--safe)', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> Paid Successfully
                </div>
              </div>

              <div className="card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Smartphone size={16} color="var(--accent)" />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Mobile Postpaid</span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--muted-dark)' }}>Aug 1</span>
                </div>
                <h2 className="disp" style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>₹799</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--safe)', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> Paid Successfully
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Suggestions */}
        <div className="card" style={{ padding: '24px', height: 'fit-content', background: 'linear-gradient(180deg, var(--surface) 0%, rgba(29, 78, 216, 0.02) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Sparkles size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>FinGuard AI Insights</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--warn)', marginBottom: '8px' }}>
                <AlertTriangle size={16} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Usage Alert</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                Your <strong>Electricity bill</strong> increased by <strong>18%</strong> compared to last month.
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', color: 'var(--accent)', marginBottom: '8px' }}>
                <Calendar size={16} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Upcoming Due</span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                Your <strong>Internet bill</strong> (Jio Fiber) is due tomorrow. 
              </p>
              <button style={{ marginTop: '12px', background: 'var(--accent)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                Pay Now ₹999 <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                You frequently pay your HDFC Credit Card manually. Would you like to enable AutoPay?
              </p>
              <button style={{ width: '100%', background: 'var(--surface-raised)', color: 'var(--text-dark)', border: '1px solid var(--border-card)', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Enable AutoPay
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const QuickPayBtn = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="card rise" style={{ 
    padding: '20px 12px', 
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
    background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '12px',
    cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text-dark)'
  }}>
    <div style={{ 
      width: '48px', height: '48px', borderRadius: '50%', 
      background: 'rgba(29, 78, 216, 0.08)', color: 'var(--accent)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {icon}
    </div>
    <span style={{ fontSize: '13px', fontWeight: 500 }}>{label}</span>
  </button>
);
