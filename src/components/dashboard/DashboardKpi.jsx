import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardKpi = ({ label, value, unit, trend, trendVal, icon: Icon, colorClass }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: `4px solid ${colorClass}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-600" style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</span>
      <div style={{
        width: 38, height: 38, borderRadius: '12px',
        background: `color-mix(in srgb, ${colorClass} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px color-mix(in srgb, ${colorClass} 20%, transparent)`
      }}>
        <Icon size={20} style={{ color: colorClass }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
      {unit && <span className="text-muted text-sm fw-500">{unit}</span>}
    </div>
    {trendVal && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', marginTop: 'auto' }}>
        <span className={trend === 'up' ? 'badge badge-green' : 'badge badge-red'}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendVal}
        </span>
        <span className="text-muted fw-500">vs last month</span>
      </div>
    )}
  </div>
);

export default DashboardKpi;
