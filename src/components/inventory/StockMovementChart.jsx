import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { stockMovement, CustomTooltip } from './InventoryData';

const StockMovementChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Stock Movement</h3>
          <span className="text-muted text-sm">Daily inward vs outward — June 2026</span>
        </div>
        <button className="btn btn-outline text-sm">
          <Calendar size={14} />
          This month
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stockMovement} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inwardGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#14DD3C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outwardGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D94F4F" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#D94F4F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inward" name="Inward" stroke="#14DD3C" strokeWidth={2} fill="url(#inwardGrad)" />
            <Area type="monotone" dataKey="outward" name="Outward" stroke="#D94F4F" strokeWidth={2} fill="url(#outwardGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
        {[
          { label: 'Inward (Production / Receipts)', color: '#14DD3C' },
          { label: 'Outward (Sales / Dispatch)', color: '#D94F4F' },
        ].map(p => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockMovementChart;
