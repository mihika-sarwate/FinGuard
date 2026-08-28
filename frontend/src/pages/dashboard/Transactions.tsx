import React, { useState } from 'react';
import { 
  Search, Filter, ArrowDown, ArrowUp, Zap, Sparkles, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const categoryData = [
  { name: 'Food', value: 12500, color: '#f97316' },
  { name: 'Shopping', value: 8200, color: '#ec4899' },
  { name: 'Bills', value: 15400, color: '#3b82f6' },
  { name: 'Transport', value: 4100, color: '#8b5cf6' },
  { name: 'Entertainment', value: 3500, color: '#10b981' },
];

const monthlySpending = [
  { name: 'Week 1', amount: 8400 },
  { name: 'Week 2', amount: 12500 },
  { name: 'Week 3', amount: 9200 },
  { name: 'Week 4', amount: 13600 },
];

export const Transactions: React.FC = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!user?.id) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('occurred_at', { ascending: false });

    if (!error && data) {
      setTransactions(data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTransactions();
    window.addEventListener('mockDataUpdated', fetchTransactions);
    return () => window.removeEventListener('mockDataUpdated', fetchTransactions);
  }, [user?.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Transactions</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>View, search, and analyze your financial activity</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Transactions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Search & Filters */}
          <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} color="var(--muted-dark)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search by Merchant, Amount, or Date..." 
                  style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-raised)', fontSize: '14px', color: 'var(--text-dark)', outline: 'none' }}
                />
              </div>
              <button style={{ padding: '0 20px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-dark)' }}>
                <Filter size={16} /> Filters
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {['All', 'Income', 'Expense', 'Transfer', 'Bills', 'AI Generated'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  style={{ 
                    padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    background: activeFilter === filter ? 'var(--accent)' : 'var(--surface-raised)',
                    color: activeFilter === filter ? '#fff' : 'var(--text-dark)',
                    border: `1px solid ${activeFilter === filter ? 'var(--accent)' : 'var(--border)'}`,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="card" style={{ padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-dark)', fontSize: '12px', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Merchant</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx: any, idx: number) => {
                  const formattedDate = tx.occurred_at
                    ? new Date(tx.occurred_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : tx.date || 'Recent';
                  return (
                    <TransactionRow 
                      key={tx.id || idx}
                      date={formattedDate} 
                      merchant={tx.description} 
                      category={tx.category} 
                      amount={`${tx.amount > 0 ? '+' : '-'}₹${Math.abs(tx.amount).toLocaleString('en-IN')}`} 
                      type={tx.type === 'credit' ? 'income' : 'expense'} 
                      status="Completed" 
                      isAI={tx.is_ai || tx.isAI} 
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Analytics & AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <PieChartIcon size={20} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Spending by Category</h3>
            </div>
            <div style={{ height: '220px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RechartsTooltip formatter={(value) => `₹${value}`} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Monthly Trend</h3>
            </div>
            <div style={{ height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySpending} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-dark)' }} dy={10} />
                  <RechartsTooltip formatter={(value) => `₹${value}`} cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                  <Bar dataKey="amount" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', background: 'linear-gradient(145deg, rgba(29, 78, 216, 0.05), transparent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={20} color="var(--accent)" />
              <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--accent)' }}>AI Insights</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', borderLeft: `3px solid var(--warn)`, fontSize: '13px', color: 'var(--text-dark)' }}>
                You spent <strong>12% more</strong> on food this month compared to your usual average.
              </div>
              <div style={{ padding: '12px', background: 'var(--surface)', borderRadius: '8px', borderLeft: `3px solid var(--safe)`, fontSize: '13px', color: 'var(--text-dark)' }}>
                Great job! Entertainment expenses <strong>decreased by ₹1,200</strong> this month.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const TransactionRow = ({ date, merchant, category, amount, type, status, isAI }: { date: string, merchant: string, category: string, amount: string, type: 'income' | 'expense', status: string, isAI?: boolean }) => (
  <tr style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
    <td style={{ padding: '16px 8px', color: 'var(--muted-dark)', fontSize: '13px' }}>{date}</td>
    <td style={{ padding: '16px 8px', fontWeight: 600, color: 'var(--text-dark)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {merchant}
        {isAI && <span title="AI Generated" style={{ display: 'inline-flex', padding: '2px', background: 'rgba(29, 78, 216, 0.1)', color: 'var(--accent)', borderRadius: '4px' }}><Zap size={12} /></span>}
      </div>
    </td>
    <td style={{ padding: '16px 8px' }}>
      <span style={{ padding: '4px 8px', background: 'var(--surface-raised)', borderRadius: '6px', fontSize: '12px', color: 'var(--muted-dark)' }}>{category}</span>
    </td>
    <td style={{ padding: '16px 8px', fontWeight: 600, textAlign: 'right', color: type === 'income' ? 'var(--safe)' : 'var(--text-dark)' }}>{amount}</td>
    <td style={{ padding: '16px 8px', textAlign: 'right' }}>
      <span style={{ color: 'var(--safe)', fontSize: '12px', fontWeight: 600 }}>{status}</span>
    </td>
  </tr>
);
