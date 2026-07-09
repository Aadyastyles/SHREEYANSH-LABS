import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import GlassBar from './GlassBar';
import BuildingBar from './BuildingBar';
import CustomDatePicker from './CustomDatePicker';
import { weeklyData, monthlyData, getDynamicDailyData } from './DashboardData';

const ProductionChart = ({ selectedStream = 'ALL' }) => {
  const [chartMode, setChartMode] = useState('weekly');
  const [dailyStartDate, setDailyStartDate] = useState('2026-07-01');
  const [activeBarKey, setActiveBarKey] = useState(null);

  const chartData = chartMode === 'daily' ? getDynamicDailyData(dailyStartDate) : (chartMode === 'weekly' ? weeklyData : monthlyData);

  const isPCL3Only = selectedStream === 'PCL3';
  // Slice to 6 ranges for PCL3 as suggested to fill space better
  const displayData = isPCL3Only ? chartData.slice(-6) : chartData;

  // Exact Y-Axis scaling per user request
  let yAxisTicks = undefined;
  let domainMax = undefined;
  if (isPCL3Only) {
    if (chartMode === 'daily') {
      yAxisTicks = [0, 5000, 10000];
      domainMax = 15000; // Compress height by raising the ceiling without adding a tick
    } else if (chartMode === 'weekly') {
      yAxisTicks = [0, 10000, 20000];
      domainMax = 30000;
    } else if (chartMode === 'monthly') {
      yAxisTicks = [0, 15000, 30000, 45000];
      domainMax = 45000; // Monthly was fine
    }
  }

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            {isPCL3Only ? 'PCL3 Production Output' : 'Daily Production Output'}
          </h2>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.2rem' }}>
            {chartMode === 'daily' ? '8-day rolling window' : (chartMode === 'weekly' ? 'Weekly aggregated output' : 'Monthly aggregated output')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {chartMode === 'daily' && (
            <CustomDatePicker 
              selectedDate={dailyStartDate} 
              onChange={setDailyStartDate} 
            />
          )}
          <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '24px', gap: '4px' }}>
            <button 
              onClick={() => setChartMode('daily')}
              style={{ border: 'none', background: chartMode === 'daily' ? '#FFFFFF' : 'transparent', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: chartMode === 'daily' ? 600 : 500, color: chartMode === 'daily' ? 'var(--color-brand-blue)' : 'var(--color-text-muted-dark)', boxShadow: chartMode === 'daily' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>Daily</button>
            <button 
              onClick={() => setChartMode('weekly')}
              style={{ border: 'none', background: chartMode === 'weekly' ? '#FFFFFF' : 'transparent', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: chartMode === 'weekly' ? 600 : 500, color: chartMode === 'weekly' ? 'var(--color-brand-blue)' : 'var(--color-text-muted-dark)', boxShadow: chartMode === 'weekly' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>Weekly</button>
            <button 
              onClick={() => setChartMode('monthly')}
              style={{ border: 'none', background: chartMode === 'monthly' ? '#FFFFFF' : 'transparent', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: chartMode === 'monthly' ? 600 : 500, color: chartMode === 'monthly' ? 'var(--color-brand-blue)' : 'var(--color-text-muted-dark)', boxShadow: chartMode === 'monthly' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>Monthly</button>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 240, marginTop: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            key={`${chartMode}-${selectedStream}`}
            data={displayData} 
            margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
            barCategoryGap={0}
            onMouseMove={(state) => {
              if (state && state.activeLabel) {
                setActiveBarKey(state.activeLabel);
              } else {
                setActiveBarKey(null);
              }
            }}
            onMouseLeave={() => setActiveBarKey(null)}
          >
            <defs>
              {/* Base fade gradients */}
              <linearGradient id="grad-pcl3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pcl3)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pcl3)" stopOpacity={0.15} />
              </linearGradient>
              <linearGradient id="grad-pcl5" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pcl5)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pcl5)" stopOpacity={0.15} />
              </linearGradient>
              <linearGradient id="grad-pocl3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chem-pocl3)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--color-chem-pocl3)" stopOpacity={0.15} />
              </linearGradient>
              
              {/* Universal diagonal stripe pattern */}
              <pattern id="diagonal-stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="3" />
              </pattern>
            </defs>
            <XAxis 
              dataKey="label" 
              stroke="var(--color-text-muted-dark)" 
              tickLine={{ stroke: '#CBD5E1' }} 
              axisLine={isPCL3Only ? { stroke: '#CBD5E1', strokeWidth: 1 } : { stroke: '#CBD5E1', strokeWidth: 1.5 }} 
              fontSize={13} 
              dy={10} 
            />
            <YAxis 
              type="number"
              allowDataOverflow={true}
              width={80}
              stroke="var(--color-text-muted-dark)" 
              tickLine={isPCL3Only ? { stroke: '#CBD5E1' } : { stroke: '#CBD5E1' }} 
              axisLine={isPCL3Only ? false : { stroke: '#CBD5E1', strokeWidth: 1.5 }} 
              fontSize={13} 
              dx={-5} 
              ticks={yAxisTicks}
              domain={isPCL3Only ? [0, domainMax] : undefined}
              tickFormatter={(val) => isPCL3Only ? (val / 1000) + ' Tons' : val}
            />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)', radius: [4,4,0,0] }} content={<CustomTooltip />} />
            
            {isPCL3Only ? (
              <Bar 
                dataKey="PCL3" 
                name="PCL3 (Phosphorus Trichloride)" 
                shape={(props) => <BuildingBar {...props} isAnyHovered={!!activeBarKey} />}
                activeBar={(props) => <BuildingBar {...props} active={true} isAnyHovered={!!activeBarKey} />}
                background={{ fill: 'none' }}
                animationDuration={1500} 
                isAnimationActive={true}
              />
            ) : (
              <>
                <Bar dataKey="PCL3" shape={<GlassBar activeBarKey={activeBarKey} dataKey="PCL3" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
                <Bar dataKey="PCL5" shape={<GlassBar activeBarKey={activeBarKey} dataKey="PCL5" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
                <Bar dataKey="POCL3" shape={<GlassBar activeBarKey={activeBarKey} dataKey="POCL3" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
              </>
            )}
            
            {/* Global Cloudy Fog Overlay at bottom */}
            {isPCL3Only && (
              <>
                <defs>
                  <linearGradient id="fog-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
                    <stop offset="40%" stopColor="#ffffff" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <rect x="0" y="80%" width="100%" height="20%" fill="url(#fog-grad)" style={{ pointerEvents: 'none' }} />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      {!isPCL3Only && (
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
          {[
            { label: 'PCL3 (Phosphorus Trichloride)', color: 'var(--color-chem-pcl3)' },
            { label: 'PCL5 (Phosphorus Pentachloride)', color: 'var(--color-chem-pcl5)' },
            { label: 'POCL3 (Phosphoryl Chloride)', color: 'var(--color-chem-pocl3)' },
          ].map(p => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-dark)' }}>
              <div style={{ width: 12, height: 12, borderRadius: 4, background: p.color, boxShadow: `0 2px 6px ${p.color}80` }} />
              {p.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionChart;
