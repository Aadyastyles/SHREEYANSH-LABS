import React from 'react';
import { activityLog } from './ReportsData';

const ActivityLog = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Day Activity Log</h3>
        <span className="badge badge-neutral">{activityLog.length} entries</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {activityLog.map((entry, i) => {
          const IconComp = entry.icon;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '0.85rem 0',
                borderBottom: i < activityLog.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                borderRadius: 'var(--radius-xs)',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-card-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Timeline dot & line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 36, paddingTop: '0.15rem' }}>
                <div className={`badge ${entry.badge}`} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                  <IconComp size={15} />
                </div>
              </div>

              {/* Time */}
              <div style={{ minWidth: 52, fontWeight: 600, fontSize: '0.9rem', paddingTop: '0.3rem', fontVariantNumeric: 'tabular-nums' }}>
                {entry.time}
              </div>

              {/* Description */}
              <div style={{ flex: 1, fontSize: '0.9rem', color: 'var(--color-text-dark)', lineHeight: 1.5, paddingTop: '0.3rem' }}>
                {entry.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLog;
