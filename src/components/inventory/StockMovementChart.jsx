import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
                <stop offset="0%" stopColor="var(--color-chem-pcl5)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--color-chem-pcl5)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outwardGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-danger)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--color-danger)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '15px', borderTop: '1px solid var(--color-border-light)', fontSize: '0.85rem' }} iconType="circle" />
            <Area type="monotone" dataKey="inward" name="Inward (Production / Receipts)" stroke="var(--color-chem-pcl5)" strokeWidth={2} fill="url(#inwardGrad)" />
            <Area type="monotone" dataKey="outward" name="Outward (Sales / Dispatch)" stroke="var(--color-danger)" strokeWidth={2} fill="url(#outwardGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockMovementChart;
