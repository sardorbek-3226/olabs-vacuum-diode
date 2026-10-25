import React from 'react';
import { Info } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: '#0f172a',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: 8,
      fontSize: 13.5,
      fontWeight: 600,
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      border: '1px solid #334155',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'slideUp 0.3s ease'
    }}>
      <Info size={18} color="#38bdf8" />
      <span>{message}</span>
    </div>
  );
}
