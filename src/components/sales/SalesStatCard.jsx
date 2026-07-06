import React from 'react';

const SalesStatCard = ({ label, value, icon: Icon, accent, badgeClass, badgeText }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent || 'rgba(20, 221, 60, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: accent ? '#fff' : 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
      {badgeText && <span className={badgeClass}>{badgeText}</span>}
    </div>
  </div>
);

export default SalesStatCard;
