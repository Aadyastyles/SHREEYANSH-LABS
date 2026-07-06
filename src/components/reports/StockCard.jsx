import React from 'react';
import { Beaker, FlaskConical, Droplets } from 'lucide-react';

const StockCard = ({ title, icon: Icon, data, variant }) => {
  const cls = variant === 'dark' ? 'card-dark' : variant === 'green' ? 'card-green' : 'card';
  const mutedColor = variant === 'dark' ? 'var(--color-text-muted-light)' : 'var(--color-text-muted-dark)';
  const valColor = variant === 'dark' ? 'var(--color-text-white)' : 'var(--color-text-dark)';

  const products = [
    { key: 'PCL3', label: 'PCL3', icon: Beaker, color: '#14DD3C' },
    { key: 'PCL5', label: 'PCL5', icon: FlaskConical, color: '#3BA55C' },
    { key: 'POCL3', label: 'POCL3', icon: Droplets, color: '#B4FAB8' },
  ];

  return (
    <div className={cls} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 'var(--radius-sm)',
          background: variant === 'dark' ? 'rgba(20, 221, 60, 0.12)' : variant === 'green' ? 'rgba(13, 20, 16, 0.08)' : 'rgba(20, 221, 60, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={17} style={{ color: variant === 'dark' ? 'var(--color-primary)' : 'var(--color-primary-muted)' }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {products.map(p => (
          <div key={p.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
              <span style={{ fontSize: '0.85rem', color: mutedColor }}>{p.label}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', color: valColor }}>
              {data[p.key]} <span style={{ fontWeight: 400, fontSize: '0.78rem', color: mutedColor }}>kg</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockCard;
