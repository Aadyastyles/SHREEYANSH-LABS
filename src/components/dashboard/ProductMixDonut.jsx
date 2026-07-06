import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PieActiveShape from './PieActiveShape';
import { productMix } from './DashboardData';

const ProductMixDonut = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, alignSelf: 'flex-start', margin: 0 }}>Product Mix</h3>
      <div className="text-muted text-sm fw-500" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>Hover segments to expand</div>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
          <PieChart style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="pie-grad-pcl3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pcl3)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pcl3)" stopOpacity={0.65} />
              </linearGradient>
              <linearGradient id="pie-grad-pcl5" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pcl5)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pcl5)" stopOpacity={0.65} />
              </linearGradient>
              <linearGradient id="pie-grad-pocl3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pocl3)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pocl3)" stopOpacity={0.65} />
              </linearGradient>
            </defs>
            <Pie 
              activeIndex={activeIndex}
              activeShape={PieActiveShape}
              data={productMix} 
              cx="50%" cy="50%" 
              innerRadius={50} outerRadius={75} 
              paddingAngle={4} 
              dataKey="value" 
              strokeWidth={0}
              onMouseEnter={onPieEnter}
              animationDuration={1500}
              animationBegin={0}
              isAnimationActive={true}
            >
              {productMix.map((entry, i) => {
                const chemKey = entry.name.toLowerCase();
                return (
                  <Cell key={i} fill={`url(#pie-grad-${chemKey})`} style={{ filter: `drop-shadow(0px 2px 4px ${entry.color}40)` }} />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
        {productMix.map((p, idx) => (
          <div 
            key={p.name} 
            style={{ 
              textAlign: 'center', 
              cursor: 'pointer',
              opacity: activeIndex === idx ? 1 : 0.5,
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: p.color }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
              {p.name}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-dark)' }}>{p.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductMixDonut;
