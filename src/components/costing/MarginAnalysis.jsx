import React from 'react';
import { ArrowUpRight, FlaskConical } from 'lucide-react';
import { productCosting, productColors, getMarginBadge, getMarginLabel, getProgressColor } from './CostingData';

const MarginAnalysis = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Margin Analysis</h3>
          <span className="text-muted text-sm">Gross margin % by product</span>
        </div>
        <span className="badge badge-green">
          <ArrowUpRight size={12} />
          All above 20%
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', flex: 1, justifyContent: 'center' }}>
        {productCosting.map((row) => (
          <div key={row.product}>
            {/* Label row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: 3,
                  background: productColors[row.product],
                }} />
                <span className="fw-600" style={{ fontSize: '0.9rem' }}>{row.product}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{row.margin}%</span>
                <span className={getMarginBadge(row.margin)} style={{ fontSize: '0.7rem' }}>
                  {getMarginLabel(row.margin)}
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="progress-track" style={{ height: 10, borderRadius: 6 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(row.margin / 60 * 100, 100)}%`,
                  background: getProgressColor(row.margin),
                  borderRadius: 6,
                }}
              />
            </div>
            {/* Cost breakdown mini */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem' }}>
              <span className="text-muted text-xs">Cost: ₹{row.totalCost}/kg</span>
              <span className="text-muted text-xs">Sell: ₹{row.sellingPrice}/kg</span>
              <span className="text-muted text-xs">Spread: ₹{row.sellingPrice - row.totalCost}/kg</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom summary */}
      <div style={{
        marginTop: '1.5rem', paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-border-light)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span className="text-muted text-sm">Best margin product</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FlaskConical size={14} style={{ color: 'var(--color-primary-muted)' }} />
          <span className="fw-700" style={{ fontSize: '0.95rem' }}>POCL3</span>
          <span className="badge badge-green">45.2%</span>
        </div>
      </div>
    </div>
  );
};

export default MarginAnalysis;
