import React, { useState } from 'react';
import { 
  Play, Mail, Bot, Shield, ShieldAlert, CheckCircle2, ArrowRight
} from 'lucide-react';

export const AttackDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const runDemo = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 3000);
    setTimeout(() => setStep(4), 4500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center' }}>
        <h1 className="disp" style={{ color: 'var(--text-dark)', fontSize: '32px', margin: 0, fontWeight: 700 }}>Prompt Injection Defense Demo</h1>
        <p style={{ color: 'var(--muted-dark)', margin: '8px 0 0', fontSize: '16px' }}>See how FinGuard AI protects your money from malicious inputs.</p>
      </div>

      <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <div style={{ padding: '12px 24px', background: 'var(--surface-raised)', borderRadius: '99px', fontSize: '14px', fontWeight: 500, color: 'var(--text-dark)' }}>1. Learn about Prompt Injection</div>
          <ArrowRight color="var(--muted-dark)" />
          <div style={{ padding: '12px 24px', background: 'var(--surface-raised)', borderRadius: '99px', fontSize: '14px', fontWeight: 500, color: 'var(--text-dark)' }}>2. Example Attack</div>
          <ArrowRight color="var(--muted-dark)" />
          <div style={{ padding: '12px 24px', background: 'var(--surface-raised)', borderRadius: '99px', fontSize: '14px', fontWeight: 500, color: 'var(--text-dark)' }}>3. How FinGuard Stops It</div>
        </div>

        <button 
          onClick={runDemo}
          disabled={step > 0 && step < 4}
          style={{ 
            padding: '16px 32px', background: 'var(--accent)', color: '#fff', 
            borderRadius: '12px', fontSize: '16px', fontWeight: 600, 
            display: 'flex', alignItems: 'center', gap: '8px', cursor: (step > 0 && step < 4) ? 'not-allowed' : 'pointer',
            opacity: (step > 0 && step < 4) ? 0.7 : 1, transition: 'all 0.2s'
          }}
        >
          {step === 0 ? <><Play size={20} /> Run Demo</> : step === 4 ? <><Play size={20} /> Run Again</> : 'Simulating Attack...'}
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', marginTop: '32px' }}>
          <div style={{ position: 'absolute', top: '40px', left: '60px', right: '60px', height: '4px', background: 'var(--border)' }}></div>
          
          <DemoStep 
            icon={<Mail size={24} />} 
            title="Malicious Email" 
            desc="Attacker sends an email with hidden instructions to transfer funds."
            active={step >= 1}
          />
          <DemoStep 
            icon={<Bot size={24} />} 
            title="AI Reads" 
            desc="AI Assistant reads the email to summarize it for you."
            active={step >= 2}
          />
          <DemoStep 
            icon={<Shield size={24} />} 
            title="Defense Analyzes" 
            desc="FinGuard Multi-Layer Defense scans the AI's internal thoughts."
            active={step >= 3}
          />
          <DemoStep 
            icon={step === 4 ? <ShieldAlert size={24} /> : <CheckCircle2 size={24} />} 
            title="Attack Blocked" 
            desc="Transaction stopped before any money moves."
            active={step >= 4}
            color={step === 4 ? "var(--threat)" : undefined}
          />
        </div>

        {step === 4 && (
          <div className="rise" style={{ marginTop: '32px', padding: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '16px', width: '100%' }}>
            <h3 style={{ margin: '0 0 12px', color: 'var(--threat)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} /> Threat Neutralized
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--text-dark)', lineHeight: 1.6 }}>
              The AI attempted to execute: <code style={{ background: 'var(--surface)', padding: '2px 6px', borderRadius: '4px', color: 'var(--threat)' }}>transfer_funds(amount=500, account=88213)</code> because of a hidden prompt injection in the email.
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--safe)', fontWeight: 600 }}>
              FinGuard's Intent Scanner blocked the API call because it deviated from your original request.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

const DemoStep = ({ icon, title, desc, active, color }: { icon: React.ReactNode, title: string, desc: string, active: boolean, color?: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', zIndex: 1, width: '160px', opacity: active ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
    <div style={{ 
      width: '80px', height: '80px', borderRadius: '50%', 
      background: active ? 'var(--surface)' : 'var(--surface-raised)', 
      border: `4px solid ${active ? (color || 'var(--accent)') : 'var(--border)'}`, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: active ? (color || 'var(--accent)') : 'var(--muted-dark)',
      transition: 'all 0.4s ease'
    }}>
      {icon}
    </div>
    <div style={{ textAlign: 'center' }}>
      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: active ? (color || 'var(--text-dark)') : 'var(--muted-dark)' }}>{title}</h4>
      <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--muted-dark)', lineHeight: 1.4 }}>{desc}</p>
    </div>
  </div>
);
