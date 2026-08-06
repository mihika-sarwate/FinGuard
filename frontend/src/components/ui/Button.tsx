import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', isLoading, fullWidth, style, disabled, ...props }, ref) => {
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            background: 'var(--accent)',
            color: '#FFFFFF',
            boxShadow: '0 0 0 1px var(--accent-glow)',
          };
        case 'outline':
          return {
            background: 'var(--surface)',
            border: '1px solid var(--border-card)',
            color: 'var(--text)',
          };
        case 'ghost':
          return {
            background: 'transparent',
            color: 'var(--accent)',
          };
      }
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          borderRadius: '10px',
          fontWeight: 500,
          fontSize: '14px',
          height: '40px',
          padding: '0 16px',
          transition: 'transform .1s, background .15s, opacity .15s',
          opacity: (disabled || isLoading) ? 0.6 : 1,
          pointerEvents: (disabled || isLoading) ? 'none' : 'auto',
          width: fullWidth ? '100%' : 'auto',
          ...getVariantStyles(),
          ...style,
        }}
        {...props}
      >
        {isLoading && <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
