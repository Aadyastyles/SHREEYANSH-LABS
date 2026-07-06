import React, { useState } from 'react';
import {
  FileDown, Package, FlaskConical, Beaker, Droplets,
  Play, CheckCircle2, Truck, AlertTriangle, Wrench, Clipboard,
  ArrowUpRight, CircleDot
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

/* ── Static Data ── */
const stockData = {
  opening: { PCL3: '8,320', PCL5: '3,140', POCL3: '4,680' },
  production: { PCL3: '2,400', PCL5: '800', POCL3: '1,100' },
  closing: { PCL3: '9,120', PCL5: '3,640', POCL3: '5,280' },
};

const activityLog = [
  { time: '06:30', icon: Play, badge: 'badge-green', label: 'Reactor R-1 started — morning warm-up sequence initiated, coolant loop engaged' },
  { time: '09:15', icon: FlaskConical, badge: 'badge-blue', label: 'Batch B-1042 started, PCL3, 850 kg YP input — estimated completion 14:30' },
  { time: '11:40', icon: CheckCircle2, badge: 'badge-green', label: 'Batch B-1041 completed — POCL3, output 1,740 kg, yield 91.1%, QC passed' },
  { time: '13:05', icon: AlertTriangle, badge: 'badge-yellow', label: 'Pressure fluctuation in Reactor R-2 — auto-corrected, operator notified' },
  { time: '15:20', icon: Truck, badge: 'badge-blue', label: 'Dispatch PO-2281 loaded — PCL3, 2,000 kg to Aarti Industries, Vapi' },
  { time: '17:45', icon: Wrench, badge: 'badge-neutral', label: 'Scheduled maintenance on Condenser C-3 — gasket replacement, back online by 19:00' },
];

const ypConsumption = [
  { name: 'PCL3 batches', value: 5, color: '#14DD3C' },
  { name: 'PCL5 batches', value: 2, color: '#3BA55C' },
  { name: 'POCL3 batches', value: 3, color: '#B4FAB8' },
];
const totalTins = 10;

const dispatchData = [
  { po: 'PO-2281', product: 'PCL3', qty: '2,000 kg', buyer: 'Aarti Industries', status: 'Shipped' },
  { po: 'PO-2279', product: 'POCL3', qty: '1,200 kg', buyer: 'UPL Ltd', status: 'Shipped' },
  { po: 'PO-2283', product: 'PCL5', qty: '600 kg', buyer: 'Laxmi Organics', status: 'Loading' },
];

/* ── Custom tooltip ── */
const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--color-bg-dark-raised)',
      border: '1px solid var(--color-border-dark)',
      borderRadius: '12px',
      padding: '0.6rem 0.9rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      {payload.map((entry, i) => (
        <div key={i} style={{ color: entry.payload.color, fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.payload.color }} />
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value} tins</span>
        </div>
      ))}
    </div>
  );
};

/* ── Stock summary card ── */
const StockCard = ({ title, icon: Icon, data, variant }) => {
  const cls = variant === 'dark' ? 'card-dark' : variant === 'green' ? 'card-green' : 'card';
  const mutedColor = variant === 'dark' ? 'var(--color-text-muted-light)' : 'var(--color-text-muted-dark)';
  const valColor = variant === 'dark' ? 'var(--color-text-white)' : 'var(--color-text-dark)';

  const products = [
    { key: 'PCL3', label: 'PCL3', icon: Beaker, color: '#14DD3C' },
    { key: 'PCL5', label: 'PCL5', icon: FlaskConical, color: '#3BA55C' },
    { key: 'POCL3', label: 'POCL3', icon: Droplets, color: '#B4FAB8' },
  ];

  return (
    <div className={cls} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 'var(--radius-sm)',
          background: variant === 'dark' ? 'rgba(20, 221, 60, 0.12)' : variant === 'green' ? 'rgba(13, 20, 16, 0.08)' : 'rgba(20, 221, 60, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={17} style={{ color: variant === 'dark' ? 'var(--color-primary)' : 'var(--color-primary-muted)' }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {products.map(p => (
          <div key={p.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
              <span style={{ fontSize: '0.85rem', color: mutedColor }}>{p.label}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', color: valColor }}>
              {data[p.key]} <span style={{ fontWeight: 400, fontSize: '0.78rem', color: mutedColor }}>kg</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Reports Page ── */
const Reports = () => {
  const [selectedDate, setSelectedDate] = useState('2026-06-25');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Daily Reports</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Clipboard size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Plant activity summary for the selected date
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ cursor: 'pointer' }}
          />
          <button className="btn btn-outline">
            <FileDown size={15} />
            Download PDF
          </button>
        </div>
      </header>

      {/* ── Row 1: Stock summary cards ── */}
      <div className="bento bento-3">
        <StockCard title="Opening Stock" icon={Package} data={stockData.opening} variant="light" />
        <StockCard title="Production" icon={FlaskConical} data={stockData.production} variant="green" />
        <StockCard title="Closing Stock" icon={CheckCircle2} data={stockData.closing} variant="dark" />
      </div>

      {/* ── Row 2: Activity Log ── */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Day Activity Log</h3>
          <span className="badge badge-neutral">{activityLog.length} entries</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {activityLog.map((entry, i) => {
            const IconComp = entry.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '0.85rem 0',
                  borderBottom: i < activityLog.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  borderRadius: 'var(--radius-xs)',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-card-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Timeline dot & line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 36, paddingTop: '0.15rem' }}>
                  <div className={`badge ${entry.badge}`} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                    <IconComp size={15} />
                  </div>
                </div>

                {/* Time */}
                <div style={{ minWidth: 52, fontWeight: 600, fontSize: '0.9rem', paddingTop: '0.3rem', fontVariantNumeric: 'tabular-nums' }}>
                  {entry.time}
                </div>

                {/* Description */}
                <div style={{ flex: 1, fontSize: '0.9rem', color: 'var(--color-text-dark)', lineHeight: 1.5, paddingTop: '0.3rem' }}>
                  {entry.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Row 3: YP Consumption + Dispatch ── */}
      <div className="bento bento-2">
        {/* YP Consumption donut */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>YP Consumption</h3>
            <span className="badge badge-green">
              <Package size={11} />
              {totalTins} tins today
            </span>
          </div>
          <div className="text-muted text-sm" style={{ marginBottom: '0.75rem' }}>
            Yellow Phosphorus (P4) tins used across all product lines
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
            {/* Donut */}
            <div style={{ width: 180, height: 180, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ypConsumption}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {ypConsumption.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                textAlign: 'center', pointerEvents: 'none',
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>{totalTins}</div>
                <div className="text-muted text-xs">tins</div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              {ypConsumption.map(item => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.value}</span>
                    <span className="text-muted text-xs">tins</span>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '0.6rem', marginTop: '0.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-sm fw-600">Total YP consumed</span>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>3,050 <span className="text-muted text-xs">kg</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dispatch Summary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Dispatch Summary</h3>
            <button className="btn btn-outline text-sm" style={{ cursor: 'pointer' }}>
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>PO #</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Buyer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dispatchData.map(d => (
                <tr key={d.po} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600 }}>{d.po}</td>
                  <td>
                    <span className="badge badge-green">{d.product}</span>
                  </td>
                  <td>{d.qty}</td>
                  <td className="text-sm">{d.buyer}</td>
                  <td>
                    <span className={`badge ${d.status === 'Shipped' ? 'badge-green' : 'badge-yellow'}`}>
                      {d.status === 'Shipped' ? <CircleDot size={10} /> : <Truck size={10} />}
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--color-border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span className="text-muted text-sm fw-500">Total dispatched today</span>
            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>3,800 <span className="text-muted text-xs">kg</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
