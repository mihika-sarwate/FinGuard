import React from 'react';
import { 
  Wallet, Plus, Link as LinkIcon, Download, 
  Snowflake, ArrowDown, ArrowUp, CreditCard
} from 'lucide-react';

export const Accounts: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>My Accounts</h1>
          <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Manage your balances and linked bank accounts</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-dark)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <LinkIcon size={16} /> Link Bank
          </button>
          <button style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Account
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <SummaryCard title="Total Balance" value="₹2,84,000" icon={<Wallet size={20} color="var(--accent)" />} color="var(--accent)" />
        <SummaryCard title="Total Savings" value="₹82,540" icon={<ArrowUp size={20} color="var(--safe)" />} color="var(--safe)" />
        <SummaryCard title="Monthly Income" value="₹1,25,000" icon={<ArrowDown size={20} color="var(--safe)" />} color="var(--safe)" />
        <SummaryCard title="Monthly Expenses" value="₹34,000" icon={<CreditCard size={20} color="var(--threat)" />} color="var(--threat)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Accounts Table */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: 'var(--text-dark)' }}>Active Accounts</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-dark)', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Account</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Number</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Balance</th>
                <th style={{ padding: '12px 8px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                <td style={{ padding: '16px 8px', fontWeight: 500 }}>Main Salary</td>
                <td style={{ padding: '16px 8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-dark)' }}>XXXX1234</td>
                <td style={{ padding: '16px 8px' }}>Current</td>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹1,25,000</td>
                <td style={{ padding: '16px 8px' }}><span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--safe)', padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600 }}>Active</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                <td style={{ padding: '16px 8px', fontWeight: 500 }}>Emergency Fund</td>
                <td style={{ padding: '16px 8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-dark)' }}>XXXX4567</td>
                <td style={{ padding: '16px 8px' }}>Savings</td>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹82,540</td>
                <td style={{ padding: '16px 8px' }}><span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--safe)', padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600 }}>Active</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                <td style={{ padding: '16px 8px', fontWeight: 500 }}>Investments</td>
                <td style={{ padding: '16px 8px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-dark)' }}>XXXX9901</td>
                <td style={{ padding: '16px 8px' }}>Brokerage</td>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>₹76,460</td>
                <td style={{ padding: '16px 8px' }}><span style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--safe)', padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 600 }}>Active</span></td>
              </tr>
            </tbody>
          </table>
          
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-card)', background: 'var(--surface-raised)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Download size={16} /> Download Statement
            </button>
            <button style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--threat)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Snowflake size={16} /> Freeze Card
            </button>
          </div>
        </div>

        {/* Right Side Activity Timeline */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '16px', color: 'var(--text-dark)' }}>Account Flow</h3>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '16px' }}>
            <div style={{ position: 'absolute', left: '23px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border)' }}></div>
            
            <TimelineItem title="Salary Credited" desc="+₹1,25,000 to Main Salary" active />
            <TimelineItem title="Interest Added" desc="+₹210 to Emergency Fund" />
            <TimelineItem title="Debit Card Purchase" desc="-₹850 at Coffee Shop" />
            <TimelineItem title="UPI Payment" desc="-₹3,200 to Adani Power" />
          </div>
        </div>

      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ 
        width: '36px', height: '36px', borderRadius: '10px', 
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </div>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted-dark)', fontWeight: 500 }}>{title}</p>
    </div>
    <h2 className="disp" style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)' }}>{value}</h2>
  </div>
);

const TimelineItem = ({ title, desc, active }: { title: string, desc: string, active?: boolean }) => (
  <div style={{ position: 'relative', paddingLeft: '24px' }}>
    <div style={{ 
      position: 'absolute', left: '-1px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
      background: active ? 'var(--surface)' : 'var(--surface-raised)',
      border: `3px solid ${active ? 'var(--accent)' : 'var(--border-card)'}`,
      transform: 'translateX(-50%)', zIndex: 1
    }}></div>
    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: active ? 'var(--text-dark)' : 'var(--muted-dark)' }}>{title}</h4>
    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted-dark)' }}>{desc}</p>
  </div>
);
