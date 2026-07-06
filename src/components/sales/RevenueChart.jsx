import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';
import { revenueByProduct } from './SalesData';

const ChartTooltip = ({ active, payload, label }) => {
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
        <div key={i} style={{ color: entry.color, fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>₹{entry.value}L</span>
        </div>
      ))}
    </div>
  );
};

const RevenueChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Revenue by Product</h3>
          <span className="text-muted text-sm">Monthly breakdown — last 6 months (₹ Lakhs)</span>
        </div>
        <button className="btn btn-outline text-sm">
          <Clock size={14} />
          6 months
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueByProduct} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradPCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#14DD3C" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradPCL5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BA55C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3BA55C" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradPOCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B4FAB8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#B4FAB8" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="PCL3" stackId="1" stroke="#14DD3C" strokeWidth={2} fill="url(#gradPCL3)" />
            <Area type="monotone" dataKey="PCL5" stackId="1" stroke="#3BA55C" strokeWidth={2} fill="url(#gradPCL5)" />
            <Area type="monotone" dataKey="POCL3" stackId="1" stroke="#B4FAB8" strokeWidth={2} fill="url(#gradPOCL3)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
        {[
          { label: 'PCL3', color: '#14DD3C' },
          { label: 'PCL5', color: '#3BA55C' },
          { label: 'POCL3', color: '#B4FAB8' },
        ].map((p) => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
