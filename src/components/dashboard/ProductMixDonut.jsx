import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PieActiveShape from './PieActiveShape';
import { dailyData, weeklyData, monthlyData } from './DashboardData';

const computeMix = (period) => {
  const data = period === 'Daily' ? dailyData : (period === 'Weekly' ? weeklyData : monthlyData);
  let pcl3 = 0, pcl5 = 0, pocl3 = 0;
  data.forEach(d => {
    pcl3 += d.PCL3 || 0;
    pcl5 += d.PCL5 || 0;
    pocl3 += d.POCL3 || 0;
  });
  const total = pcl3 + pcl5 + pocl3;
  if (total === 0) return [];
  return [
    { name: 'PCL3', value: Math.round((pcl3 / total) * 100), color: 'var(--color-chem-pcl3)' },
    { name: 'PCL5', value: Math.round((pcl5 / total) * 100), color: 'var(--color-chem-pcl5)' },
    { name: 'POCL3', value: Math.round((pocl3 / total) * 100), color: 'var(--color-chem-pocl3)' },
  ];
};

const getRotationForStream = (stream, mix) => {
  if (!stream || stream === 'YP') return 0;
  let totalValue = mix.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = 90;
  for (let i = 0; i < mix.length; i++) {
    const sliceAngle = (mix[i].value / totalValue) * 360;
    const midPoint = currentAngle - (sliceAngle / 2);
    if (mix[i].name === stream) {
      return 90 - midPoint;
    }
    currentAngle -= sliceAngle;
  }
  return 0;
};

const ProductMixDonut = ({ selectedStream }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [piePeriod, setPiePeriod] = useState('Weekly');
  
  const dynamicMix = useMemo(() => computeMix(piePeriod), [piePeriod]);
  const rotation = getRotationForStream(selectedStream, dynamicMix);

  useEffect(() => {
    if (selectedStream && selectedStream !== 'YP') {
      const idx = dynamicMix.findIndex(p => p.name === selectedStream);
      setActiveIndex(idx !== -1 ? idx : null);
    } else {
      setActiveIndex(null);
    }
  }, [selectedStream, dynamicMix]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const resetToSelectedStream = () => {
    if (selectedStream && selectedStream !== 'YP') {
      const idx = dynamicMix.findIndex(p => p.name === selectedStream);
      setActiveIndex(idx !== -1 ? idx : null);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Product Mix</h3>
          <div className="text-muted text-sm fw-500">Hover segments to expand</div>
        </div>
        <div style={{ background: 'var(--color-bg-light)', padding: '4px', borderRadius: '8px', display: 'flex', gap: '4px' }}>
          {['Daily', 'Weekly', 'Monthly'].map(tab => (
            <button 
              key={tab}
              onClick={() => setPiePeriod(tab)}
              style={{
                padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600, border: 'none', borderRadius: '6px',
                cursor: 'pointer', background: piePeriod === tab ? '#fff' : 'transparent',
                color: piePeriod === tab ? 'var(--color-text-dark)' : 'var(--color-text-muted-dark)',
                boxShadow: piePeriod === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ position: 'relative', width: '100%', height: 190 }} onMouseLeave={resetToSelectedStream}>
        <div style={{ width: '100%', height: '100%', transform: `rotate(${rotation}deg)`, transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
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
              data={dynamicMix} 
              cx="50%" cy="50%" 
              innerRadius={50} outerRadius={75} 
              paddingAngle={4} 
              dataKey="value" 
              strokeWidth={0}
              onMouseEnter={onPieEnter}
              animationDuration={1500}
              animationEasing="ease-in-out"
              animationBegin={0}
              isAnimationActive={true}
            >
              {dynamicMix.map((entry, i) => {
                const chemKey = entry.name.toLowerCase();
                return (
                  <Cell key={i} fill={`url(#pie-grad-${chemKey})`} style={{ filter: `drop-shadow(0px 2px 4px ${entry.color}40)` }} />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        </div>
        
        {/* Absolute static HTML text overlay in the center to prevent text rotating upside down */}
        {activeIndex !== null && dynamicMix[activeIndex] && (
          <div style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease forwards'
          }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: dynamicMix[activeIndex].color }}>
              {dynamicMix[activeIndex].name}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted-dark)', marginTop: '2px' }}>
              {dynamicMix[activeIndex].value}%
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
        {dynamicMix.map((p, idx) => (
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
