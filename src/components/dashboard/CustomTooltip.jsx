import React from 'react';
import { colorMap, labelFormatters } from './DashboardData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  const richLabel = labelFormatters[label] || label;
  
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--color-border-light)',
      borderRadius: '12px',
      padding: '0.85rem 1.2rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    }}>
      <div style={{ color: 'var(--color-text-dark)', fontSize: '0.85rem', marginBottom: '0.6rem', fontWeight: 700 }}>{richLabel}</div>
      {payload.map((entry, i) => {
        const chemColor = colorMap[entry.name] || '#000';
        return (
          <div key={i} style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: chemColor, boxShadow: `0 0 6px ${chemColor}` }} />
            {entry.name}: <span style={{ color: 'var(--color-text-dark)', fontWeight: 700 }}>{entry.value.toLocaleString()} kg</span>
          </div>
        )
      })}
    </div>
  );
};

export default CustomTooltip;
