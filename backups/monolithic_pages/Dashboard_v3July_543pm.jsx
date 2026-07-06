import React, { useState } from 'react';
import {
  Package, Beaker, ShoppingCart, TrendingUp, TrendingDown,
  ArrowUpRight, Droplets, FlaskConical, Gauge, CircleDot,
  Calendar, Clock, Loader2, Download, Layers
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Sector,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/* â”€â”€ Data â”€â”€ */
const dailyData = [
  { label: 'Jul 1', PCL3: 620, PCL5: 280, POCL3: 410 },
  { label: 'Jul 2', PCL3: 580, PCL5: 310, POCL3: 450 },
  { label: 'Jul 3', PCL3: 710, PCL5: 380, POCL3: 320 },
  { label: 'Jul 4', PCL3: 660, PCL5: 420, POCL3: 390 },
  { label: 'Jul 5', PCL3: 590, PCL5: 340, POCL3: 440 },
  { label: 'Jul 6', PCL3: 640, PCL5: 290, POCL3: 380 },
  { label: 'Jul 7', PCL3: 720, PCL5: 360, POCL3: 420 },
  { label: 'Jul 8', PCL3: 680, PCL5: 400, POCL3: 370 },
];

const weeklyData = [
  { label: 'W1', PCL3: 4200, PCL5: 1800, POCL3: 2600 },
  { label: 'W2', PCL3: 3800, PCL5: 2100, POCL3: 3100 },
  { label: 'W3', PCL3: 5100, PCL5: 2800, POCL3: 2200 },
  { label: 'W4', PCL3: 4600, PCL5: 3200, POCL3: 2900 },
  { label: 'W5', PCL3: 3900, PCL5: 2400, POCL3: 3400 },
  { label: 'W6', PCL3: 4400, PCL5: 1900, POCL3: 2800 },
  { label: 'W7', PCL3: 5200, PCL5: 2600, POCL3: 3200 },
  { label: 'W8', PCL3: 4800, PCL5: 3000, POCL3: 2700 },
];

const monthlyData = [
  { label: 'Jan', PCL3: 18200, PCL5: 8400, POCL3: 12100 },
  { label: 'Feb', PCL3: 17800, PCL5: 9100, POCL3: 13500 },
  { label: 'Mar', PCL3: 19100, PCL5: 8800, POCL3: 12200 },
  { label: 'Apr', PCL3: 18600, PCL5: 9200, POCL3: 12900 },
  { label: 'May', PCL3: 17900, PCL5: 8400, POCL3: 13400 },
  { label: 'Jun', PCL3: 19400, PCL5: 8900, POCL3: 12800 },
  { label: 'Jul', PCL3: 20200, PCL5: 9600, POCL3: 14200 },
  { label: 'Aug', PCL3: 19800, PCL5: 9000, POCL3: 13700 },
];

// Using our new aesthetic chemical color palette
const productMix = [
  { name: 'PCL3', value: 45, color: 'var(--color-chem-pcl3)' },
  { name: 'PCL5', value: 28, color: 'var(--color-chem-pcl5)' },
  { name: 'POCL3', value: 27, color: 'var(--color-chem-pocl3)' },
];

const yieldTrend = [
  { month: 'Jan', yield: 88 },
  { month: 'Feb', yield: 91 },
  { month: 'Mar', yield: 87 },
  { month: 'Apr', yield: 93 },
  { month: 'May', yield: 90 },
  { month: 'Jun', yield: 95 },
];

const recentBatches = [
  { id: 'B-1042', product: 'PCL3', input: '850 kg YP', output: '2,380 kg', yield: '93.2%', status: 'Completed', color: 'var(--color-chem-pcl3)' },
  { id: 'B-1041', product: 'POCL3', input: '620 kg YP', output: '1,740 kg', yield: '91.1%', status: 'Completed', color: 'var(--color-chem-pocl3)' },
  { id: 'B-1040', product: 'PCL5', input: '430 kg YP', output: '1,190 kg', yield: '88.7%', status: 'Completed', color: 'var(--color-chem-pcl5)' },
  { id: 'B-1039', product: 'PCL3', input: '900 kg YP', output: '2,510 kg', yield: '94.1%', status: 'In Progress', color: 'var(--color-chem-pcl3)' },
];

/* â”€â”€ Custom Tooltips & Shapes â”€â”€ */
const colorMap = { PCL3: '#2563EB', PCL5: '#16A34A', POCL3: '#EA580C' };
const labelFormatters = {
  'W1': 'June Â· 1st Week', 'W2': 'June Â· 2nd Week', 'W3': 'June Â· 3rd Week', 'W4': 'June Â· 4th Week',
  'W5': 'July Â· 1st Week', 'W6': 'July Â· 2nd Week', 'W7': 'July Â· 3rd Week', 'W8': 'July Â· 4th Week',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  const richLabel = labelFormatters[label] || label;
  
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--color-border-light)',
      borderRadius: '12px',
      padding: '0.85rem 1.2rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    }}>
      <div style={{ color: 'var(--color-text-dark)', fontSize: '0.85rem', marginBottom: '0.6rem', fontWeight: 700 }}>{richLabel}</div>
      {payload.map((entry, i) => {
        const chemColor = colorMap[entry.name] || '#000';
        return (
          <div key={i} style={{ color: 'var(--color-text-muted-dark)', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: chemColor, boxShadow: `0 0 6px ${chemColor}` }} />
            {entry.name}: <span style={{ color: 'var(--color-text-dark)', fontWeight: 700 }}>{entry.value.toLocaleString()} kg</span>
          </div>
        )
      })}
    </div>
  );
};

// Custom GlassBar with fading gradient, diagonal stripes, and hover glow
const GlassBar = (props) => {
  const { x, y, width, height, payload, activeBarKey, dataKey } = props;
  
  if (height === undefined || height < 0) return null; // Avoid rendering empty bars

  const isHovered = activeBarKey === payload.label;
  const isFaded = activeBarKey && !isHovered;
  const chemKey = dataKey.toLowerCase();
  
  return (
    <g style={{ transition: 'all 0.3s ease', opacity: isFaded ? 0.4 : 1 }}>
      {/* Glow shadow for active bar */}
      {isHovered && (
        <rect 
          x={x} y={y} width={width} height={height} rx={3}
          fill={`var(--color-chem-${chemKey})`}
          style={{ filter: `blur(8px)`, opacity: 0.5 }}
        />
      )}
      
      {/* Base Fade Gradient */}
      <rect 
        x={x} y={y} width={width} height={height} rx={3}
        fill={`url(#grad-${chemKey})`}
        opacity={isHovered ? 1 : 0.85}
        style={{ transition: 'opacity 0.3s ease' }}
      />
      
      {/* Diagonal Stripe Overlay */}
      <rect 
        x={x} y={y} width={width} height={height} rx={3}
        fill="url(#diagonal-stripe)"
        opacity={isHovered ? 0.6 : 0.2}
        style={{ transition: 'opacity 0.3s ease' }}
      />
    </g>
  );
};

// The 3D Pop-out effect for the Pie Chart
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 12} dy={8} textAnchor="middle" fill="var(--color-text-muted-dark)" style={{ fontSize: '0.85rem' }}>
        {value}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 12} // Pops out!
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0px 4px 12px ${fill})` }} // Glow effect
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 15}
        outerRadius={outerRadius + 18}
        fill={fill}
      />
    </g>
  );
};

/* â”€â”€ KPI mini-card â”€â”€ */
const Kpi = ({ label, value, unit, trend, trendVal, icon: Icon, colorClass }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: `4px solid ${colorClass}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-600" style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</span>
      <div style={{
        width: 38, height: 38, borderRadius: '12px',
        background: `color-mix(in srgb, ${colorClass} 15%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 4px 12px color-mix(in srgb, ${colorClass} 20%, transparent)`
      }}>
        <Icon size={20} style={{ color: colorClass }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
      {unit && <span className="text-muted text-sm fw-500">{unit}</span>}
    </div>
    {trendVal && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', marginTop: 'auto' }}>
        <span className={trend === 'up' ? 'badge badge-green' : 'badge badge-red'}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendVal}
        </span>
        <span className="text-muted fw-500">vs last month</span>
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const [chartMode, setChartMode] = useState('weekly');
  const [dailyStartDate, setDailyStartDate] = useState('2026-07-01');
  
  // Dynamically generate 8 days of pseudo-realistic daily data
  const getDynamicDailyData = (startDateStr) => {
    const start = new Date(startDateStr);
    const data = [];
    for (let i = 0; i < 8; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const month = d.toLocaleString('en-US', { month: 'short' });
      const day = d.getDate();
      const basePCL3 = 600 + (Math.sin(i) * 100);
      const basePCL5 = 300 + (Math.cos(i) * 100);
      const basePOCL3 = 400 + (Math.sin(i * 1.5) * 80);
      data.push({
        label: `${month} ${day}`,
        PCL3: Math.round(basePCL3),
        PCL5: Math.round(basePCL5),
        POCL3: Math.round(basePOCL3)
      });
    }
    return data;
  };

  const chartData = chartMode === 'daily' ? getDynamicDailyData(dailyStartDate) : (chartMode === 'weekly' ? weeklyData : monthlyData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeBarKey, setActiveBarKey] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500); // Simulate backend sync
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000); // Simulate PDF generation
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Header - Animated Entrance */}
      <header className="page-title animate-fade-up">
        <div>
          <div style={{ fontSize: '2.4rem' }}>Dashboard Overview</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            <span>25 Jun 2026, Wednesday</span>
            <span style={{ margin: '0 8px', color: 'var(--color-border-light)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-chem-pcl3)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-chem-pcl3)', boxShadow: '0 0 8px var(--color-chem-pcl3)' }}></span>
              Live Telemetry Active
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? <Loader2 size={16} className="lucide-spin" /> : <Download size={16} />}
            {isGenerating ? 'Generating...' : 'Export Report'}
          </button>
          <button className="btn btn-dark" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? <Loader2 size={16} className="lucide-spin" /> : <Gauge size={16} />}
            {isSyncing ? 'Syncing...' : 'Live Sync'}
          </button>
        </div>
      </header>

      {/* Row 1: KPIs */}
      <div className="bento bento-3 animate-fade-up delay-100" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <Kpi variant="primary" label="Total Production (YP)" value="12,450" unit="kg" trend="up" trendVal="8.4%" icon={Package} colorClass="var(--color-text-muted-dark)" />
        <Kpi label="PCL3 Output" value="8,320" unit="kg" trend="up" trendVal="5.1%" icon={Beaker} colorClass="var(--color-chem-pcl3)" />
        <Kpi label="PCL5 Output" value="3,140" unit="kg" trend="down" trendVal="1.2%" icon={Layers} colorClass="var(--color-chem-pcl5)" />
        <Kpi label="POCL3 Output" value="4,680" unit="kg" trend="up" trendVal="7.3%" icon={Droplets} colorClass="var(--color-chem-pocl3)" />
      </div>

      {/* Row 2: Production chart + Product mix + Yield */}
      <div className="bento animate-fade-up delay-200" style={{ gridTemplateColumns: '5fr 2fr' }}>
        {/* Production bar chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-text-dark)' }}>
                {chartMode === 'daily' ? `Daily Production Output (${chartData[0].label} - ${chartData[7].label})` : chartMode === 'weekly' ? 'Weekly Production Output' : 'Monthly Production Output'}
              </h3>
              <span className="text-muted text-sm fw-500">
                {chartMode === 'daily' ? `8-day rolling window` : chartMode === 'weekly' ? 'Distribution across 3 chemical streams' : 'Year-to-date monthly breakdown'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {chartMode === 'daily' && (
                <input 
                  type="date" 
                  value={dailyStartDate}
                  onChange={(e) => setDailyStartDate(e.target.value)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: '1px solid var(--color-border-light)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--color-text-dark)',
                    background: '#FFFFFF',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
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
          <div style={{ flex: 1, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                key={chartMode}
                data={chartData} 
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
                    <stop offset="100%" stopColor="var(--color-chem-pcl3-muted)" stopOpacity={0.15} />
                  </linearGradient>
                  <linearGradient id="grad-pcl5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chem-pcl5)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--color-chem-pcl5-muted)" stopOpacity={0.15} />
                  </linearGradient>
                  <linearGradient id="grad-pocl3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chem-pocl3)" stopOpacity={1} />
                    <stop offset="100%" stopColor="var(--color-chem-pocl3-muted)" stopOpacity={0.15} />
                  </linearGradient>
                  
                  {/* Universal diagonal stripe pattern */}
                  <pattern id="diagonal-stripe" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="3" />
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} fontSize={13} dy={10} />
                <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} fontSize={13} dx={-10} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)', radius: [4,4,0,0] }} content={<CustomTooltip />} />
                <Bar dataKey="PCL3" shape={<GlassBar activeBarKey={activeBarKey} dataKey="PCL3" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
                <Bar dataKey="PCL5" shape={<GlassBar activeBarKey={activeBarKey} dataKey="PCL5" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
                <Bar dataKey="POCL3" shape={<GlassBar activeBarKey={activeBarKey} dataKey="POCL3" />} animationDuration={1500} isAnimationActive={true} animationBegin={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
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
        </div>

        {/* Right column: product mix + yield */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Product mix donut (Dynamic) */}
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
                    activeShape={renderActiveShape}
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

          {/* Yield trend (Redesigned from simple card-dark to an aesthetic card) */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, var(--color-bg-dark), var(--color-bg-dark-raised))', color: '#fff', border: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--color-text-white)' }}>Average Yield</h3>
                <div className="text-sm" style={{ color: 'var(--color-text-muted-light)' }}>Plant-wide efficiency</div>
              </div>
              <span className="badge badge-green" style={{ background: 'rgba(14, 165, 233, 0.2)', color: 'var(--color-chem-pcl3)' }}>95% latest</span>
            </div>
            <div style={{ flex: 1, minHeight: 120 }}>
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
        </div>
      </div>

      {/* Row 3: Recent batches + Quick stats */}
      <div className="bento animate-fade-up delay-300" style={{ gridTemplateColumns: '3fr 1fr' }}>
        {/* Recent production batches */}
        <div className="card" style={{ overflow: 'hidden', padding: '0' }}>
          <div style={{ padding: '1.8rem 1.8rem 1rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--color-text-dark)' }}>Live Batch Tracking</h3>
              <span className="text-muted text-sm fw-500">Real-time status of production batches</span>
            </div>
            <button className="btn btn-outline text-sm">
              View Database <ArrowUpRight size={14} />
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr style={{ background: 'var(--color-bg-main)' }}>
                <th style={{ paddingLeft: '1.8rem' }}>Batch ID</th>
                <th>Stream</th>
                <th>Input (Raw)</th>
                <th>Output (Yield)</th>
                <th>Efficiency</th>
                <th style={{ paddingRight: '1.8rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBatches.map(b => (
                <tr key={b.id} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600, paddingLeft: '1.8rem', color: 'var(--color-brand-blue)' }}>{b.id}</td>
                  <td>
                    <span className="badge" style={{ background: `color-mix(in srgb, ${b.color} 15%, transparent)`, color: b.color, fontWeight: 700 }}>{b.product}</span>
                  </td>
                  <td className="fw-500">{b.input}</td>
                  <td style={{ fontWeight: 700 }}>{b.output}</td>
                  <td style={{ fontWeight: 600, color: parseFloat(b.yield) >= 90 ? 'var(--color-text-dark)' : 'var(--color-warning)' }}>{b.yield}</td>
                  <td style={{ paddingRight: '1.8rem' }}>
                    <span className={`badge ${b.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                      {b.status === 'Completed' ? <CircleDot size={10} /> : <Loader2 size={10} className="lucide-spin" />}
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick stats column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'var(--color-primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={24} style={{ color: 'var(--color-primary-muted)' }} />
            </div>
            <div>
              <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Output</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>99,681 <span className="text-muted text-sm">kg</span></div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'rgba(232, 168, 56, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={24} style={{ color: 'var(--color-warning)' }} />
            </div>
            <div>
              <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending POs</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>4 <span className="text-muted text-sm fw-500 text-warning" style={{ color: 'var(--color-warning)' }}>(2 Urgent)</span></div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'rgba(100, 116, 139, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={24} style={{ color: 'var(--color-text-muted-dark)' }} />
            </div>
            <div>
              <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>YP Consumed</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>36.2 <span className="text-muted text-sm">Tons</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
