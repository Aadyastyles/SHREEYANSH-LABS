import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { finishedGoodsStock, CustomTooltip } from './InventoryData';

const FinishedGoodsChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Finished Goods Stock</h3>
          <span className="text-muted text-sm">Monthly stock levels — Jan to Jun 2026</span>
        </div>
        <button className="btn btn-outline text-sm">
          <Calendar size={14} />
          6 months
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={finishedGoodsStock} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="PCL3" stackId="stock" fill="#14DD3C" radius={[0, 0, 0, 0]} />
            <Bar dataKey="PCL5" stackId="stock" fill="#3BA55C" radius={[0, 0, 0, 0]} />
            <Bar dataKey="POCL3" stackId="stock" fill="#B4FAB8" radius={[4, 4, 0, 0]} />
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

export default FinishedGoodsChart;
