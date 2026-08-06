import React from 'react';
import { BarChart3, Activity, PieChart as PieChartIcon } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';

const successRateData = [
  { name: 'Without Defense', attackSuccess: 68, taskSuccess: 95 },
  { name: 'With Defense', attackSuccess: 8, taskSuccess: 92 },
];

const errorRatesData = [
  { name: 'False Positives', rate: 4 },
  { name: 'False Negatives', rate: 2 },
];

const latencyData = [
  { time: '1', without: 2.1, with: 2.8 },
  { time: '2', without: 2.3, with: 3.1 },
  { time: '3', without: 2.2, with: 3.0 },
  { time: '4', without: 2.4, with: 3.2 },
  { time: '5', without: 2.1, with: 2.9 },
  { time: '6', without: 2.5, with: 3.3 },
];

const trustScoreDistribution = [
  { name: '0-20 (Critical)', value: 15 },
  { name: '21-40 (High Risk)', value: 10 },
  { name: '41-60 (Medium Risk)', value: 15 },
  { name: '61-80 (Safe)', value: 20 },
  { name: '81-100 (Trusted)', value: 40 },
];
const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

export const SystemAnalytics: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>System Analytics</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Research evaluation metrics and defense layer performance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Success Rates (Before vs After) */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Attack vs. Legitimate Success Rates</h3>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successRateData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="attackSuccess" name="Attack Success %" fill="var(--threat)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="taskSuccess" name="Task Success %" fill="var(--safe)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latency Impact */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Activity size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Response Time Impact (Seconds)</h3>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 'dataMax + 1']} />
                <RechartsTooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="without" name="Without Defense" stroke="var(--muted-dark)" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="with" name="With Defense" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trust Score Distribution */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PieChartIcon size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Trust Score Distribution</h3>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trustScoreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trustScoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px' }} />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Errors & Accuracy */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Activity size={20} color="var(--accent)" />
            <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-dark)' }}>Error Rates (With Defense)</h3>
          </div>
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', padding: '0 40px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                <span>False Positives (Legitimate blocked)</span>
                <span style={{ color: 'var(--warn)' }}>4.0%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'var(--surface-raised)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '4%', height: '100%', background: 'var(--warn)' }}></div>
              </div>
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                <span>False Negatives (Attacks allowed)</span>
                <span style={{ color: 'var(--threat)' }}>2.0%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'var(--surface-raised)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '2%', height: '100%', background: 'var(--threat)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                <span>Overall Accuracy</span>
                <span style={{ color: 'var(--safe)' }}>94.0%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'var(--surface-raised)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', background: 'var(--safe)' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
