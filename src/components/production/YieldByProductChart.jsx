import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';
import { yieldByProduct } from './ProductionData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: 'var(--color-bg-dark-raised)',
      border: '1px solid var(--color-border-dark)',
      borderRadius: '12px',
      padding: '0.75rem 1rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      <div style={{ color: 'var(--color-text-muted-light)', fontSize: '0.75rem', marginBottom: '0.4rem' }}>{label}</div>
      {payload.map((entry, i) => (
        entry.value != null && (
          <div key={i} style={{ color: entry.color, fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
            {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value}%</span>
          </div>
        )
      ))}
    </div>
  );
};

const YieldByProductChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Yield by Product</h3>
          <span className="text-muted text-sm">Grouped comparison — last 6 batches</span>
        </div>
        <button className="btn btn-outline text-sm">
          <Clock size={14} />
          6 batches
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yieldByProduct} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="batch" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis domain={[80, 100]} stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="PCL3" fill="#14DD3C" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="PCL5" fill="#3BA55C" radius={[4, 4, 0, 0]} barSize={28} />
            <Bar dataKey="POCL3" fill="#B4FAB8" radius={[4, 4, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
        {[
          { label: 'PCL3', color: '#14DD3C' },
          { label: 'PCL5', color: '#3BA55C' },
          { label: 'POCL3', color: '#B4FAB8' },
        ].map(p => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldByProductChart;
