import React, { useState, useEffect, useMemo } from 'react';
import { dailyData, weeklyData, monthlyData } from './DashboardData';

/* ── helpers ─────────────────────────────────────────────────── */

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
    { name: 'PCL3', value: Math.round((pcl3 / total) * 100), color: 'var(--color-chem-pcl3)', hex: '#2563EB' },
    { name: 'PCL5', value: Math.round((pcl5 / total) * 100), color: 'var(--color-chem-pcl5)', hex: '#16A34A' },
    { name: 'POCL3', value: Math.round((pocl3 / total) * 100), color: 'var(--color-chem-pocl3)', hex: '#EA580C' },
  ];
};

const degToRad = (deg) => (deg * Math.PI) / 180;

// Build an SVG arc path for a donut sector
const describeArc = (cx, cy, innerR, outerR, startAngle, endAngle) => {
  const startOuter = { x: cx + outerR * Math.cos(degToRad(startAngle)), y: cy + outerR * Math.sin(degToRad(startAngle)) };
  const endOuter   = { x: cx + outerR * Math.cos(degToRad(endAngle)),   y: cy + outerR * Math.sin(degToRad(endAngle)) };
  const startInner = { x: cx + innerR * Math.cos(degToRad(endAngle)),   y: cy + innerR * Math.sin(degToRad(endAngle)) };
  const endInner   = { x: cx + innerR * Math.cos(degToRad(startAngle)), y: cy + innerR * Math.sin(degToRad(startAngle)) };
  const largeArc   = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    'Z',
  ].join(' ');
};

const getRotationForStream = (stream, mix) => {
  if (!stream || stream === 'YP') return 0;
  const totalValue = mix.reduce((acc, curr) => acc + curr.value, 0);
  let currentAngle = -90; // start at top
  for (let i = 0; i < mix.length; i++) {
    const sliceAngle = (mix[i].value / totalValue) * 360;
    const midPoint = currentAngle + sliceAngle / 2;
    if (mix[i].name === stream) {
      return -midPoint - 90; // rotate so midpoint lands at top (-90deg)
    }
    currentAngle += sliceAngle;
  }
  return 0;
};

/* ── component ───────────────────────────────────────────────── */

const ProductMixDonut = ({ selectedStream }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [piePeriod, setPiePeriod] = useState('Weekly');

  const dynamicMix = useMemo(() => computeMix(piePeriod), [piePeriod]);
  const rotation = getRotationForStream(selectedStream, dynamicMix);

  // When a KPI block is clicked, clear pop then pop after rotation ends
  useEffect(() => {
    setActiveIndex(null);
    if (selectedStream && selectedStream !== 'YP') {
      const idx = dynamicMix.findIndex(p => p.name === selectedStream);
      const timer = setTimeout(() => {
        setActiveIndex(idx !== -1 ? idx : null);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [selectedStream, dynamicMix]);

  const onSliceEnter = (idx) => setActiveIndex(idx);
  const resetToSelectedStream = () => {
    if (selectedStream && selectedStream !== 'YP') {
      const idx = dynamicMix.findIndex(p => p.name === selectedStream);
      setActiveIndex(idx !== -1 ? idx : null);
    } else {
      setActiveIndex(null);
    }
  };

  // Geometry
  const size = 190;
  const cx = size / 2;
  const cy = size / 2;
  const innerR = 50;
  const outerR = 75;
  const popExtra = 12;      // extra radius when popped
  const ringGap = 3;        // small outer ring
  const padAngle = 3;       // degrees gap between slices

  const totalValue = dynamicMix.reduce((acc, c) => acc + c.value, 0);

  // Compute each slice's start/end angles
  const slices = [];
  let angle = -90; // start from top
  dynamicMix.forEach((entry, i) => {
    const sweep = (entry.value / totalValue) * 360;
    slices.push({
      ...entry,
      startAngle: angle + padAngle / 2,
      endAngle: angle + sweep - padAngle / 2,
      index: i,
    });
    angle += sweep;
  });

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      {/* Header + tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Product Mix</h3>
          <div className="text-muted text-sm fw-500">Click blocks to highlight</div>
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
                boxShadow: piePeriod === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.2s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pie area */}
      <div style={{ position: 'relative', width: size, height: size }} onMouseLeave={resetToSelectedStream}>
        {/* Rotating wrapper */}
        <svg
          width={size} height={size}
          viewBox={`-10 -10 ${size + 20} ${size + 20}`}
          style={{
            overflow: 'visible',
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <defs>
            <linearGradient id="pie-g-pcl3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
              <stop offset="100%" stopColor="#2563EB" stopOpacity={0.65} />
            </linearGradient>
            <linearGradient id="pie-g-pcl5" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity={1} />
              <stop offset="100%" stopColor="#16A34A" stopOpacity={0.65} />
            </linearGradient>
            <linearGradient id="pie-g-pocl3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EA580C" stopOpacity={1} />
              <stop offset="100%" stopColor="#EA580C" stopOpacity={0.65} />
            </linearGradient>
          </defs>

          {slices.map((s) => {
            const isActive = activeIndex === s.index;
            const r = isActive ? outerR + popExtra : outerR;
            const gradId = `pie-g-${s.name.toLowerCase()}`;

            return (
              <g key={s.name}>
                {/* Main slice */}
                <path
                  d={describeArc(cx, cy, innerR, r, s.startAngle, s.endAngle)}
                  fill={`url(#${gradId})`}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={() => onSliceEnter(s.index)}
                />
                {/* Outer ring for popped slice */}
                {isActive && (
                  <path
                    d={describeArc(cx, cy, r + 3, r + 6, s.startAngle, s.endAngle)}
                    fill={`url(#${gradId})`}
                    style={{ opacity: 0.5, transition: 'all 0.3s ease' }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Static center text (never rotates) */}
        {activeIndex !== null && dynamicMix[activeIndex] && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
            animation: 'fadeIn 0.25s ease forwards',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: dynamicMix[activeIndex].hex }}>
              {dynamicMix[activeIndex].name}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted-dark)', marginTop: '2px' }}>
              {dynamicMix[activeIndex].value}%
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
        {dynamicMix.map((p, idx) => (
          <div
            key={p.name}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              opacity: activeIndex === idx ? 1 : 0.5,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: p.hex }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: p.hex }} />
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
