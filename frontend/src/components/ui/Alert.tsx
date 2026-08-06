import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

const icons = {
  error: <XCircle size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const colors = {
  error: 'var(--threat)',
  success: 'var(--safe)',
  warning: 'var(--warn)',
  info: 'var(--accent)',
};

const bgColors = {
  error: 'rgba(165, 35, 35, 0.1)',
  success: 'rgba(61, 220, 132, 0.1)',
  warning: 'rgba(234, 179, 8, 0.1)',
  info: 'rgba(180, 142, 67, 0.1)',
};

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      background: bgColors[type],
      border: `1px solid ${colors[type]}`,
      color: colors[type],
      fontSize: '14px'
    }} className="rise">
      <div style={{ flexShrink: 0, display: 'flex' }}>
        {icons[type]}
      </div>
      <div>{message}</div>
    </div>
  );
};
