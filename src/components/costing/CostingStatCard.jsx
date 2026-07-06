import React from 'react';

const CostingStatCard = ({ label, value, sub, icon: Icon, accent, badge }) => (
  <div className={accent ? 'card-green' : 'card'} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent ? 'rgba(20, 221, 60, 0.18)' : 'rgba(20, 221, 60, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
      {badge && <span className={badge.cls}>{badge.icon}{badge.text}</span>}
      {sub && <span className="text-muted">{sub}</span>}
    </div>
  </div>
);

export default CostingStatCard;
