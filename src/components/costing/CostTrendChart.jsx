import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import { costTrendData, productColors } from './CostingData';

const CostTooltip = ({ active, payload, label }) => {
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
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>₹{entry.value}/kg</span>
        </div>
      ))}
    </div>
  );
};

const CostTrendChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Cost Trend</h3>
          <span className="text-muted text-sm">Cost/kg over last 6 months</span>
        </div>
        <button className="btn btn-outline text-sm" style={{ cursor: 'pointer' }}>
          <Calendar size={14} />
          6 months
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={costTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradPCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#14DD3C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPCL5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3BA55C" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3BA55C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPOCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B4FAB8" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#B4FAB8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} domain={[300, 370]} tickFormatter={(v) => `₹${v}`} />
            <Tooltip content={<CostTooltip />} />
            <Area type="monotone" dataKey="PCL3" stroke="#14DD3C" strokeWidth={2.5} fill="url(#gradPCL3)" />
            <Area type="monotone" dataKey="PCL5" stroke="#3BA55C" strokeWidth={2.5} fill="url(#gradPCL5)" />
            <Area type="monotone" dataKey="POCL3" stroke="#B4FAB8" strokeWidth={2.5} fill="url(#gradPOCL3)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
        {Object.entries(productColors).map(([label, color]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostTrendChart;
