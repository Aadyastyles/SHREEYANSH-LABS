import React from 'react';
import { Truck, MapPin, CircleDot, Pencil } from 'lucide-react';
import { suppliers } from './SettingsData';

const SupplierDefaults = () => {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Truck size={17} style={{ color: 'var(--color-primary-muted)' }} />
            YP Supplier Defaults
          </h3>
          <span className="text-muted text-sm">Yellow Phosphorus procurement partners</span>
        </div>
        <button className="btn btn-outline text-sm">
          + Add Supplier
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {suppliers.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-light)',
              background: 'var(--color-bg-main)',
              transition: 'all 0.2s ease', cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-muted)',
              }}>
                {s.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</div>
                <div className="text-muted text-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={11} /> {s.location}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.rate}</div>
                <div className="text-muted text-xs">{s.terms}</div>
              </div>
              <span className="badge badge-green">
                <CircleDot size={8} />
                {s.status}
              </span>
              <button className="btn btn-outline text-sm" style={{ padding: '0.3rem 0.6rem' }}>
                <Pencil size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDefaults;
