import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { yieldTrend } from './DashboardData';

const YieldTrendChart = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, var(--color-bg-dark), var(--color-bg-dark-raised))', color: '#fff', border: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--color-text-white)' }}>Average Yield</h3>
          <div className="text-sm" style={{ color: 'var(--color-text-muted-light)' }}>Plant-wide efficiency</div>
        </div>
        <span className="badge badge-green" style={{ background: 'rgba(14, 165, 233, 0.2)', color: 'var(--color-chem-pcl3)' }}>95% latest</span>
      </div>
      <div style={{ flex: 1, minHeight: 100, marginTop: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={yieldTrend} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pcl3)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chem-pcl3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={10} dy={5} />
            <YAxis domain={[80, 100]} stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={10} />
            <Area type="monotone" dataKey="yield" stroke="var(--color-chem-pcl3)" strokeWidth={3} fill="url(#yieldGrad)" animationDuration={2000} isAnimationActive={true} animationBegin={0} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default YieldTrendChart;
