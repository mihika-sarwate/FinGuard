import React from 'react';
import { 
  ShieldAlert, ShieldCheck, Activity, Target, 
  AlertTriangle, Lock
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';

const attackTrendData = [
  { time: '08:00', attacks: 12 },
  { time: '10:00', attacks: 45 },
  { time: '12:00', attacks: 32 },
  { time: '14:00', attacks: 80 },
  { time: '16:00', attacks: 50 },
  { time: '18:00', attacks: 25 },
  { time: '20:00', attacks: 15 },
];

const layerEffectivenessData = [
  { name: 'L1: Keyword', blocked: 400 },
  { name: 'L2: Heuristics', blocked: 300 },
  { name: 'L3: Model', blocked: 200 },
  { name: 'L4: Intent', blocked: 150 },
  { name: 'L5: Human', blocked: 50 },
];

const recentAttacks = [
  { id: 'ATK-001', time: '10:42 AM', user: 'johndoe', type: 'Email Injection', detectedBy: 'Layer 3', status: 'Blocked', layer: 'Intent Matcher', confidence: '98%' },
  { id: 'ATK-002', time: '09:57 AM', user: 'janedoe', type: 'Webpage Payload', detectedBy: 'Layer 2', status: 'Blocked', layer: 'Heuristics', confidence: '94%' },
  { id: 'ATK-003', time: '09:30 AM', user: 'admin1', type: 'Direct Jailbreak', detectedBy: 'Layer 1', status: 'Blocked', layer: 'Keyword Filter', confidence: '99%' },
  { id: 'ATK-004', time: '08:15 AM', user: 'system', type: 'API Response Poisoning', detectedBy: 'Layer 4', status: 'Escalated', layer: 'Human Confirmation', confidence: '72%' },
];

export const SecurityDashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '28px', margin: 0, fontWeight: 700 }}>Security Dashboard</h1>
          <p style={{ color: 'var(--muted-dark)', margin: '4px 0 0' }}>Real-time threat monitoring and defense analytics</p>
        </div>
      </div>

      {/* Top Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <MetricCard title="Threat Level" value="ELEVATED" icon={<AlertTriangle size={24} color="var(--warn)" />} color="var(--warn)" />
        <MetricCard title="Protected Requests" value="14,239" icon={<ShieldCheck size={24} color="var(--safe)" />} color="var(--safe)" />
        <MetricCard title="Blocked Attacks" value="1,102" icon={<ShieldAlert size={24} color="var(--threat)" />} color="var(--threat)" />
        <MetricCard title="Today's Alerts" value="48" icon={<Activity size={24} color="var(--accent)" />} color="var(--accent)" />
        <MetricCard title="Avg Trust Score" value="94%" icon={<Target size={24} color="var(--safe)" />} color="var(--safe)" />
        <MetricCard title="High Risk Requests" value="12" icon={<Lock size={24} color="var(--threat)" />} color="var(--threat)" />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--muted-dark)' }}>Attack Trend (Last 12 Hours)</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attackTrendData}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--threat)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--threat)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="time" stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px', color: 'var(--text-dark)' }} 
                />
                <Area type="monotone" dataKey="attacks" stroke="var(--threat)" strokeWidth={3} fillOpacity={1} fill="url(#colorAttacks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--muted-dark)' }}>Layer Effectiveness</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={layerEffectivenessData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-dark)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dark)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                <RechartsTooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-card)', borderRadius: '8px' }} />
                <Bar dataKey="blocked" fill="var(--accent)" radius={[0, 4, 4, 0]}>
                  {layerEffectivenessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--safe)' : index === 1 ? 'var(--accent)' : index === 2 ? '#8b5cf6' : index === 3 ? 'var(--warn)' : 'var(--threat)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--muted-dark)' }}>Recent Attacks</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-dark)', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 8px' }}>Time</th>
                <th style={{ padding: '12px 8px' }}>User</th>
                <th style={{ padding: '12px 8px' }}>Attack Type</th>
                <th style={{ padding: '12px 8px' }}>Detected By</th>
                <th style={{ padding: '12px 8px' }}>Layer Blocked</th>
                <th style={{ padding: '12px 8px' }}>Confidence</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAttacks.map((attack) => (
                <tr key={attack.id} style={{ borderBottom: '1px solid var(--border-card)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 8px' }}>{attack.time}</td>
                  <td style={{ padding: '16px 8px' }}>{attack.user}</td>
                  <td style={{ padding: '16px 8px' }}>{attack.type}</td>
                  <td style={{ padding: '16px 8px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>{attack.detectedBy}</td>
                  <td style={{ padding: '16px 8px' }}>{attack.layer}</td>
                  <td style={{ padding: '16px 8px', fontWeight: 600 }}>{attack.confidence}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '99px', 
                      fontSize: '11px', 
                      fontWeight: 600, 
                      textTransform: 'uppercase',
                      background: attack.status === 'Blocked' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: attack.status === 'Blocked' ? 'var(--threat)' : 'var(--warn)',
                      border: `1px solid ${attack.status === 'Blocked' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`
                    }}>
                      {attack.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ 
      width: '48px', height: '48px', borderRadius: '12px', 
      background: `color-mix(in srgb, ${color} 15%, transparent)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted-dark)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
      <h2 className="disp" style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 700, color: 'var(--text-dark)' }}>{value}</h2>
    </div>
  </div>
);
