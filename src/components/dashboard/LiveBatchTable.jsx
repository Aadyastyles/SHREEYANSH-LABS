import React from 'react';
import { ArrowUpRight, CircleDot, Loader2 } from 'lucide-react';
import { recentBatches } from './DashboardData';

const LiveBatchTable = () => {
  return (
    <div className="card" style={{ overflow: 'hidden', padding: '0' }}>
      <div style={{ padding: '1.8rem 1.8rem 1rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-text-dark)' }}>Live Batch Tracking</h3>
          <span className="text-muted text-sm fw-500">Real-time status of production batches</span>
        </div>
        <button className="btn btn-outline text-sm">
          View Database <ArrowUpRight size={14} />
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr style={{ background: 'var(--color-bg-main)' }}>
            <th style={{ paddingLeft: '1.8rem' }}>Batch ID</th>
            <th>Stream</th>
            <th>Input (Raw)</th>
            <th>Output (Yield)</th>
            <th>Efficiency</th>
            <th style={{ paddingRight: '1.8rem' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {recentBatches.map(b => (
            <tr key={b.id} style={{ cursor: 'pointer' }}>
              <td style={{ fontWeight: 600, paddingLeft: '1.8rem', color: 'var(--color-brand-blue)' }}>{b.id}</td>
              <td>
                <span className="badge" style={{ background: `color-mix(in srgb, ${b.color} 15%, transparent)`, color: b.color, fontWeight: 700 }}>{b.product}</span>
              </td>
              <td className="fw-500">{b.input}</td>
              <td style={{ fontWeight: 700 }}>{b.output}</td>
              <td style={{ fontWeight: 600, color: parseFloat(b.yield) >= 90 ? 'var(--color-text-dark)' : 'var(--color-warning)' }}>{b.yield}</td>
              <td style={{ paddingRight: '1.8rem' }}>
                <span className={`badge ${b.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                  {b.status === 'Completed' ? <CircleDot size={10} /> : <Loader2 size={10} className="lucide-spin" />}
                  {b.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveBatchTable;
