import React from 'react';
import { ArrowUpRight, Timer } from 'lucide-react';
import { batches } from './ProductionData';
import ProductBadge from './ProductBadge';
import StatusBadge from './StatusBadge';

const BatchesTable = () => {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Recent Batches</h3>
          <span className="text-muted text-sm">Last 8 production runs across all products</span>
        </div>
        <button className="btn btn-outline text-sm">
          View all <ArrowUpRight size={14} />
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Date</th>
              <th>Product</th>
              <th>YP Input (kg)</th>
              <th>Output (kg)</th>
              <th>Yield %</th>
              <th>Duration</th>
              <th>Operator</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {batches.map(b => (
              <tr key={b.id} style={{ cursor: 'pointer' }}>
                <td className="fw-600">{b.id}</td>
                <td className="text-muted">{b.date}</td>
                <td><ProductBadge product={b.product} /></td>
                <td>{b.ypInput.toLocaleString()}</td>
                <td className="fw-500">{b.output.toLocaleString()}</td>
                <td style={{
                  fontWeight: 600,
                  color: b.yield >= 92 ? 'var(--color-primary-muted)' : b.yield >= 89 ? 'var(--color-warning)' : 'var(--color-danger)',
                }}>
                  {b.yield}%
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Timer size={13} style={{ color: 'var(--color-text-muted-dark)' }} />
                    {b.duration}
                  </span>
                </td>
                <td>{b.operator}</td>
                <td><StatusBadge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchesTable;
