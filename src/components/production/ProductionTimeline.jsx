import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { timelineEntries } from './ProductionData';
import ProductBadge from './ProductBadge';

const ProductionTimeline = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Production Timeline</h3>
          <span className="text-muted text-sm">Recent batch completions</span>
        </div>
        <button className="btn btn-outline text-sm">
          View all <ArrowUpRight size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
        {timelineEntries.map((entry, idx) => (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem 0',
              borderBottom: idx < timelineEntries.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            {/* Timeline dot + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20, paddingTop: '0.2rem' }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: entry.color,
                border: '2px solid var(--color-bg-card)',
                boxShadow: `0 0 0 3px ${entry.color}33`,
                flexShrink: 0,
              }} />
              {idx < timelineEntries.length - 1 && (
                <div style={{
                  width: 2, flex: 1, minHeight: 28,
                  background: 'var(--color-border-light)',
                  marginTop: 4,
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span className="fw-600" style={{ fontSize: '0.9rem' }}>{entry.id}</span>
                <span className="fw-700" style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>{entry.output}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ProductBadge product={entry.product} />
                <span className="text-muted text-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={12} />
                  {entry.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionTimeline;
