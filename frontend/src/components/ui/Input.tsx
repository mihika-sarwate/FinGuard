import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        <label className="mono" style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--muted)' }}>
          {label}
        </label>
        <input
          ref={ref}
          className={className}
          style={{
            background: 'rgba(0, 0, 0, 0.03)',
            border: `1px solid ${error ? 'var(--threat)' : 'var(--border-card)'}`,
            borderRadius: '8px',
            padding: '12px 14px',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all 0.2s',
            width: '100%',
          }}
          {...props}
        />
        {error && (
          <span style={{ color: 'var(--threat)', fontSize: '12px', marginTop: '4px' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
