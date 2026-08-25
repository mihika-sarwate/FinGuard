import React from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, ShieldCheck, 
  Target, Activity, Sparkles, ArrowRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const chartData = [
  { name: 'Jan', balance: 220000 },
  { name: 'Feb', balance: 235000 },
  { name: 'Mar', balance: 242000 },
  { name: 'Apr', balance: 238000 },
  { name: 'May', balance: 265000 },
  { name: 'Jun', balance: 275000 },
  { name: 'Jul', balance: 284000 },
];

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState<number | null>(284000);

  const fetchBalance = async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('accounts')
      .select('balance')
      .eq('user_id', user.id)
      .single();
    if (data && data.balance !== undefined) {
      setBalance(Number(data.balance));
    }
  };

  useEffect(() => {
    fetchBalance();
    window.addEventListener('mockDataUpdated', fetchBalance);
    return () => window.removeEventListener('mockDataUpdated', fetchBalance);
  }, [user?.id]);

  const formattedBalance = balance !== null ? `₹${balance.toLocaleString('en-IN')}` : '₹2,84,000';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Overview</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Welcome back to FinGuard AI</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <MetricCard title="Total Balance" value={formattedBalance} icon={<Wallet size={24} color="var(--accent)" />} color="var(--accent)" />
        <MetricCard title="Spent (This Month)" value="₹34,000" icon={<TrendingDown size={24} color="var(--threat)" />} color="var(--threat)" />
        <MetricCard title="Saved (This Month)" value="₹18,000" icon={<TrendingUp size={24} color="var(--safe)" />} color="var(--safe)" />
        <MetricCard title="Trust Score" value="96%" icon={<ShieldCheck size={24} color="var(--safe)" />} color="var(--safe)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Main Chart */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Wealth Growth</h3>
            <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface-raised)', fontSize: '12px' }}>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-dark)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--muted-dark)' }} dx={-10} tickFormatter={(val) => `₹${val/1000}k`} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                <Area type="monotone" dataKey="balance" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals & Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Target size={20} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Monthly Budget</h3>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                <span>₹34,000 / ₹42,000</span>
                <span style={{ color: 'var(--warn)' }}>82%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'var(--surface-raised)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '82%', height: '100%', background: 'var(--warn)' }}></div>
              </div>
              <p style={{ margin: '12px 0 0', fontSize: '13px', color: 'var(--muted-dark)' }}>You are on track, but spending is slightly elevated this week.</p>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', flex: 1, background: 'linear-gradient(145deg, rgba(29, 78, 216, 0.05), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={20} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--accent)' }}>AI Suggestions</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <AiSuggestion text="You may exceed your food budget." type="warn" />
              <AiSuggestion text="Electricity bill is due tomorrow." type="alert" />
              <AiSuggestion text="Investment opportunity detected in mutual funds." type="safe" />
            </div>
          </div>
          
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Recent Activity</h3>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            View All <ArrowRight size={14} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ActivityRow title="Bill Paid" desc="Electricity (Adani Power)" amount="-₹3,200" date="Today, 10:42 AM" type="expense" />
          <ActivityRow title="Salary Received" desc="TechCorp Inc." amount="+₹1,25,000" date="Yesterday" type="income" />
          <ActivityRow title="Security Alert" desc="Prompt Injection Blocked" amount="" date="Yesterday" type="neutral" isAlert />
          <ActivityRow title="Statement Downloaded" desc="July 2026 Statement" amount="" date="Aug 3" type="neutral" />
        </div>
      </div>

    </div>
  );
};

const MetricCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ 
        width: '48px', height: '48px', borderRadius: '12px', 
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
    <div>
      <p style={{ margin: '0 0 4px', fontSize: '13px', color: 'var(--muted-dark)', fontWeight: 500 }}>{title}</p>
      <h2 className="disp" style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: 'var(--text-dark)' }}>{value}</h2>
    </div>
  </div>
);

const AiSuggestion = ({ text, type }: { text: string, type: 'warn' | 'alert' | 'safe' }) => {
  const color = type === 'warn' ? 'var(--warn)' : type === 'alert' ? 'var(--threat)' : 'var(--safe)';
  return (
    <div style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', borderLeft: `3px solid ${color}`, fontSize: '13px', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Activity size={14} color={color} />
      {text}
    </div>
  );
}

const ActivityRow = ({ title, desc, amount, date, type, isAlert }: { title: string, desc: string, amount: string, date: string, type: 'income' | 'expense' | 'neutral', isAlert?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', background: isAlert ? 'rgba(239, 68, 68, 0.05)' : 'transparent', border: isAlert ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent', transition: 'background 0.2s' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ 
        width: '40px', height: '40px', borderRadius: '50%', 
        background: isAlert ? 'var(--threat)' : 'var(--surface-raised)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isAlert ? '#fff' : 'var(--muted-dark)'
      }}>
        {isAlert ? <ShieldCheck size={18} /> : <Activity size={18} />}
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: isAlert ? 'var(--threat)' : 'var(--text-dark)' }}>{title}</h4>
        <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--muted-dark)' }}>{desc}</p>
      </div>
    </div>
    <div style={{ textAlign: 'right' }}>
      {amount && <div style={{ fontSize: '14px', fontWeight: 600, color: type === 'income' ? 'var(--safe)' : 'var(--text-dark)' }}>{amount}</div>}
      <div style={{ fontSize: '12px', color: 'var(--muted-dark)', marginTop: amount ? '4px' : '0' }}>{date}</div>
    </div>
  </div>
);
