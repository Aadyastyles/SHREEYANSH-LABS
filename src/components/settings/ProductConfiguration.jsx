import React from 'react';
import { FlaskConical, Pencil } from 'lucide-react';
import { products } from './SettingsData';

const ProductConfiguration = () => {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <FlaskConical size={17} style={{ color: 'var(--color-primary-muted)' }} />
            Product Configuration
          </h3>
          <span className="text-muted text-sm">Yield ratios, pricing & tax codes</span>
        </div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Yield Ratio (YP:Product)</th>
            <th>Selling Price</th>
            <th>HSN Code</th>
            <th>GST</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.name}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 'var(--radius-xs)',
                    background: 'rgba(20, 221, 60, 0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-primary-muted)',
                  }}>
                    {p.name}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{p.formula}</div>
                  </div>
                </div>
              </td>
              <td style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9rem' }}>{p.yieldRatio}</td>
              <td style={{ fontWeight: 600 }}>{p.price}</td>
              <td>
                <span style={{
                  background: 'var(--color-bg-main)', padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-xs)', fontSize: '0.8rem', fontFamily: 'monospace',
                  border: '1px solid var(--color-border-light)',
                }}>
                  {p.hsn}
                </span>
              </td>
              <td>
                <span className="badge badge-neutral">{p.gst}</span>
              </td>
              <td>
                <button className="btn btn-outline text-sm" style={{ padding: '0.35rem 0.7rem' }}>
                  <Pencil size={13} />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductConfiguration;
