import React from 'react';

const InventoryStatCard = ({ label, value, sub, icon: Icon, accent, iconColor }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', padding: '1.25rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-600">{label}</span>
      <div style={{
        width: 32, height: 32, borderRadius: 'var(--radius-sm)',
        background: accent || 'var(--color-primary-pale)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={16} style={{ color: iconColor || 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
    </div>
    {sub && <span className="text-muted text-sm fw-500" style={{ color: 'var(--color-text-muted-dark)' }}>{sub}</span>}
  </div>
);

export default InventoryStatCard;
