import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardKpi = ({ label, value, unit, trend, trendVal, icon: Icon, colorClass, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Combine active and hovered states for elevation
  const isElevated = isActive || isHovered;

  return (
    <div 
      className="card" 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.8rem', 
        cursor: 'pointer',
        transform: isElevated ? 'translateY(-4px)' : 'none',
        boxShadow: isElevated ? `0 12px 24px rgba(0, 0, 0, 0.1)` : 'var(--shadow-sm)',
        transition: 'all 0.2s ease-in-out',
        borderBottom: isActive ? `1px solid color-mix(in srgb, ${colorClass} 40%, transparent)` : '1px solid var(--color-border-light)',
        borderLeft: isActive ? `1px solid color-mix(in srgb, ${colorClass} 40%, transparent)` : '1px solid var(--color-border-light)',
        borderRight: isActive ? `1px solid color-mix(in srgb, ${colorClass} 40%, transparent)` : '1px solid var(--color-border-light)',
        borderTop: `4px solid ${colorClass}` 
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="text-muted text-sm fw-600" style={{ letterSpacing: '0.5px', textTransform: 'uppercase', color: isActive ? 'var(--color-text-dark)' : 'var(--color-text-muted-dark)' }}>{label}</span>
        <div style={{
          width: 38, height: 38, borderRadius: '12px',
          background: `color-mix(in srgb, ${colorClass} 15%, transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isElevated ? `0 4px 12px rgba(0, 0, 0, 0.1)` : `0 4px 12px color-mix(in srgb, ${colorClass} 20%, transparent)`,
          transition: 'all 0.2s ease-in-out'
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
};

export default DashboardKpi;
