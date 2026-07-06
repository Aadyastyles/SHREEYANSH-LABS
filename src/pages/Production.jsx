import React from 'react';
import {
  Plus, FlaskConical, Weight, TrendingUp, CalendarDays,
  Clock, CircleDot, Hourglass, ArrowUpRight, Beaker,
  Droplets, Timer
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

/* ── Static Data ── */
const stats = [
  { label: 'Active Batches', value: '3', icon: FlaskConical, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: "Today's Output", value: '4,200', unit: 'kg', icon: Weight, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: 'Avg Yield', value: '92.4', unit: '%', icon: TrendingUp, accent: 'rgba(20, 221, 60, 0.08)' },
  { label: 'Batches This Month', value: '28', icon: CalendarDays, accent: 'rgba(74, 144, 217, 0.08)' },
];

const batches = [
  { id: 'B-1048', date: '25 Jun 2026', product: 'PCL3',  ypInput: 920,  output: 2576, yield: 93.1, duration: '6h 20m', operator: 'Ramesh K.',   status: 'Completed' },
  { id: 'B-1047', date: '25 Jun 2026', product: 'POCL3', ypInput: 780,  output: 2184, yield: 91.8, duration: '5h 45m', operator: 'Sunil M.',    status: 'Completed' },
  { id: 'B-1046', date: '24 Jun 2026', product: 'PCL5',  ypInput: 540,  output: 1490, yield: 88.4, duration: '7h 10m', operator: 'Prakash D.',   status: 'Completed' },
  { id: 'B-1045', date: '24 Jun 2026', product: 'PCL3',  ypInput: 860,  output: 2408, yield: 94.2, duration: '4h 50m', operator: 'Ajay S.',      status: 'In Progress' },
  { id: 'B-1044', date: '23 Jun 2026', product: 'POCL3', ypInput: 650,  output: 1820, yield: 90.5, duration: '5h 30m', operator: 'Ramesh K.',   status: 'Completed' },
  { id: 'B-1043', date: '23 Jun 2026', product: 'PCL5',  ypInput: 480,  output: 1315, yield: 87.9, duration: '6h 55m', operator: 'Vikram P.',   status: 'In Progress' },
  { id: 'B-1042', date: '22 Jun 2026', product: 'PCL3',  ypInput: 850,  output: 2380, yield: 93.2, duration: '5h 15m', operator: 'Sunil M.',    status: 'Completed' },
  { id: 'B-1041', date: '22 Jun 2026', product: 'POCL3', ypInput: 700,  output: 1950, yield: 92.6, duration: '6h 05m', operator: 'Prakash D.',   status: 'Pending' },
];

const yieldByProduct = [
  { batch: 'B-1048', PCL3: 93.1, PCL5: null,  POCL3: null  },
  { batch: 'B-1047', PCL3: null,  PCL5: null,  POCL3: 91.8 },
  { batch: 'B-1046', PCL3: null,  PCL5: 88.4, POCL3: null  },
  { batch: 'B-1045', PCL3: 94.2, PCL5: null,  POCL3: null  },
  { batch: 'B-1044', PCL3: null,  PCL5: null,  POCL3: 90.5 },
  { batch: 'B-1043', PCL3: null,  PCL5: 87.9, POCL3: null  },
];

const timelineEntries = [
  { id: 'B-1048', product: 'PCL3',  time: '12:40 PM', output: '2,576 kg', color: '#14DD3C' },
  { id: 'B-1047', product: 'POCL3', time: '11:15 AM', output: '2,184 kg', color: '#B4FAB8' },
  { id: 'B-1046', product: 'PCL5',  time: '09:30 AM', output: '1,490 kg', color: '#3BA55C' },
  { id: 'B-1045', product: 'PCL3',  time: 'Yesterday 4:50 PM', output: '2,408 kg', color: '#14DD3C' },
  { id: 'B-1044', product: 'POCL3', time: 'Yesterday 11:20 AM', output: '1,820 kg', color: '#B4FAB8' },
];

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
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
        entry.value != null && (
          <div key={i} style={{ color: entry.color, fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
            {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value}%</span>
          </div>
        )
      ))}
    </div>
  );
};

/* ── Stat Card ── */
const StatCard = ({ label, value, unit, icon: Icon, accent }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
      {unit && <span className="text-muted text-sm">{unit}</span>}
    </div>
  </div>
);

/* ── Status badge helper ── */
const statusConfig = {
  'Completed':   { cls: 'badge badge-green',  icon: CircleDot },
  'In Progress': { cls: 'badge badge-yellow', icon: Clock },
  'Pending':     { cls: 'badge badge-blue',   icon: Hourglass },
};

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={cfg.cls}>
      <Icon size={10} />
      {status}
    </span>
  );
};

/* ── Product badge helper ── */
const productColors = {
  PCL3:  { bg: 'rgba(20, 221, 60, 0.10)',  color: '#14DD3C' },
  PCL5:  { bg: 'rgba(59, 165, 92, 0.12)',  color: '#3BA55C' },
  POCL3: { bg: 'rgba(180, 250, 184, 0.25)', color: '#2D8B4E' },
};

const ProductBadge = ({ product }) => {
  const c = productColors[product];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.2rem 0.6rem', borderRadius: '100px',
      fontSize: '0.75rem', fontWeight: 500,
      background: c.bg, color: c.color,
    }}>
      {product === 'POCL3' ? <Droplets size={10} /> : product === 'PCL5' ? <FlaskConical size={10} /> : <Beaker size={10} />}
      {product}
    </span>
  );
};

/* ── Production Page ── */
const Production = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Production Batches</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <CalendarDays size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          New Batch
        </button>
      </header>

      {/* ── Row 1: Stat Cards ── */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Row 2: Batches Table ── */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Recent Batches</h3>
            <span className="text-muted text-sm">Last 8 production runs across all products</span>
          </div>
          <button className="btn btn-outline text-sm">
            View all <ArrowUpRight size={14} />
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Date</th>
                <th>Product</th>
                <th>YP Input (kg)</th>
                <th>Output (kg)</th>
                <th>Yield %</th>
                <th>Duration</th>
                <th>Operator</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map(b => (
                <tr key={b.id} style={{ cursor: 'pointer' }}>
                  <td className="fw-600">{b.id}</td>
                  <td className="text-muted">{b.date}</td>
                  <td><ProductBadge product={b.product} /></td>
                  <td>{b.ypInput.toLocaleString()}</td>
                  <td className="fw-500">{b.output.toLocaleString()}</td>
                  <td style={{
                    fontWeight: 600,
                    color: b.yield >= 92 ? 'var(--color-primary-muted)' : b.yield >= 89 ? 'var(--color-warning)' : 'var(--color-danger)',
                  }}>
                    {b.yield}%
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Timer size={13} style={{ color: 'var(--color-text-muted-dark)' }} />
                      {b.duration}
                    </span>
                  </td>
                  <td>{b.operator}</td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Row 3: Yield Chart + Timeline ── */}
      <div className="bento bento-2">
        {/* Yield by Product Chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Yield by Product</h3>
              <span className="text-muted text-sm">Grouped comparison — last 6 batches</span>
            </div>
            <button className="btn btn-outline text-sm">
              <Clock size={14} />
              6 batches
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldByProduct} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="batch" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis domain={[80, 100]} stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="PCL3" fill="#14DD3C" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar dataKey="PCL5" fill="#3BA55C" radius={[4, 4, 0, 0]} barSize={28} />
                <Bar dataKey="POCL3" fill="#B4FAB8" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
            {[
              { label: 'PCL3', color: '#14DD3C' },
              { label: 'PCL5', color: '#3BA55C' },
              { label: 'POCL3', color: '#B4FAB8' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* Production Timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Production Timeline</h3>
              <span className="text-muted text-sm">Recent batch completions</span>
            </div>
            <button className="btn btn-outline text-sm">
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {timelineEntries.map((entry, idx) => (
              <div
                key={entry.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: idx < timelineEntries.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Timeline dot + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20, paddingTop: '0.2rem' }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: entry.color,
                    border: '2px solid var(--color-bg-card)',
                    boxShadow: `0 0 0 3px ${entry.color}33`,
                    flexShrink: 0,
                  }} />
                  {idx < timelineEntries.length - 1 && (
                    <div style={{
                      width: 2, flex: 1, minHeight: 28,
                      background: 'var(--color-border-light)',
                      marginTop: 4,
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span className="fw-600" style={{ fontSize: '0.9rem' }}>{entry.id}</span>
                    <span className="fw-700" style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>{entry.output}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ProductBadge product={entry.product} />
                    <span className="text-muted text-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {entry.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Production;
