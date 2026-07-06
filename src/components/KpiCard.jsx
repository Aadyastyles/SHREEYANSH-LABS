import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KpiCard = ({ title, value, unit, trend, trendValue, icon: Icon, variant = 'card-light' }) => {
  const isPositive = trend === 'up';

  return (
    <div className={variant} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minWidth: '240px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.9rem', color: variant === 'card-dark' ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted-dark)', fontWeight: 500, margin: 0 }}>
          {title}
        </h3>
        {Icon && (
          <div style={{ background: variant === 'card-dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
            <Icon size={18} style={{ color: variant === 'card-dark' ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted-dark)' }} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 600 }}>{value}</span>
        {unit && <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{unit}</span>}
      </div>

      {trendValue && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ 
            color: isPositive ? 'var(--color-primary)' : 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontWeight: 500
          }}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </span>
          <span style={{ color: variant === 'card-dark' ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted-dark)' }}>than last month</span>
        </div>
      )}
    </div>
  );
};

export default KpiCard;
