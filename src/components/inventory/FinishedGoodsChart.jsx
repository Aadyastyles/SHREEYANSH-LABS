import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
          <AreaChart data={finishedGoodsStock} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chem-pcl3)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chem-pcl3)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPCL5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chem-pcl5)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chem-pcl5)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPOCL3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chem-pocl3)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chem-pocl3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '15px', borderTop: '1px solid var(--color-border-light)', fontSize: '0.85rem' }} iconType="circle" />
            <Area type="monotone" dataKey="PCL3" stroke="var(--color-chem-pcl3)" fillOpacity={1} fill="url(#colorPCL3)" strokeWidth={2} />
            <Area type="monotone" dataKey="PCL5" stroke="var(--color-chem-pcl5)" fillOpacity={1} fill="url(#colorPCL5)" strokeWidth={2} />
            <Area type="monotone" dataKey="POCL3" stroke="var(--color-chem-pocl3)" fillOpacity={1} fill="url(#colorPOCL3)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinishedGoodsChart;
