import React from 'react';
import {
  Package, Plus, Weight, IndianRupee, AlertTriangle,
  ArrowUpRight, Truck, CircleDot, Calendar, Filter
} from 'lucide-react';
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

/* ── Data ── */
const ypTins = [
  { id: 'YP-2406-001', supplier: 'Prayon SA (Belgium)', weight: 450, duty: 18.50, rate: 312, received: '02 Jun 2026', status: 'Full' },
  { id: 'YP-2406-002', supplier: 'Thermphos Intl.', weight: 425, duty: 18.50, rate: 308, received: '05 Jun 2026', status: 'Full' },
  { id: 'YP-2406-003', supplier: 'Prayon SA (Belgium)', weight: 210, duty: 18.50, rate: 312, received: '28 May 2026', status: 'Partial' },
  { id: 'YP-2405-018', supplier: 'Yunnan Chem Corp.', weight: 440, duty: 22.00, rate: 285, received: '18 May 2026', status: 'Full' },
  { id: 'YP-2405-017', supplier: 'Yunnan Chem Corp.', weight: 85, duty: 22.00, rate: 285, received: '12 May 2026', status: 'Partial' },
  { id: 'YP-2405-014', supplier: 'Thermphos Intl.', weight: 0, duty: 18.50, rate: 308, received: '01 May 2026', status: 'Empty' },
];

const finishedGoodsStock = [
  { month: 'Jan', PCL3: 6200, PCL5: 2800, POCL3: 3400 },
  { month: 'Feb', PCL3: 5800, PCL5: 3200, POCL3: 3800 },
  { month: 'Mar', PCL3: 7100, PCL5: 2600, POCL3: 4100 },
  { month: 'Apr', PCL3: 6500, PCL5: 3800, POCL3: 3600 },
  { month: 'May', PCL3: 8200, PCL5: 3100, POCL3: 4400 },
  { month: 'Jun', PCL3: 7400, PCL5: 3500, POCL3: 4800 },
];

const stockMovement = [
  { day: '01 Jun', inward: 2400, outward: 1800 },
  { day: '05 Jun', inward: 1900, outward: 2200 },
  { day: '09 Jun', inward: 3100, outward: 1600 },
  { day: '13 Jun', inward: 2600, outward: 2900 },
  { day: '17 Jun', inward: 1500, outward: 2100 },
  { day: '21 Jun', inward: 3400, outward: 2800 },
  { day: '25 Jun', inward: 2200, outward: 1400 },
];

/* ── Custom tooltip (dark theme) ── */
const CustomTooltip = ({ active, payload, label, unit = 'kg' }) => {
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
        <div key={i} style={{ color: entry.color, fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value.toLocaleString()} {unit}</span>
        </div>
      ))}
    </div>
  );
};

/* ── Stat card ── */
const StatCard = ({ label, value, sub, icon: Icon, accent }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent || 'rgba(20, 221, 60, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: accent ? 'var(--color-text-white)' : 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
    </div>
    {sub && <span className="text-muted text-sm">{sub}</span>}
  </div>
);

/* ── Status badge helper ── */
const statusBadge = (status) => {
  const map = {
    Full: 'badge-green',
    Partial: 'badge-yellow',
    Empty: 'badge-red',
  };
  const iconMap = {
    Full: <CircleDot size={10} />,
    Partial: <CircleDot size={10} />,
    Empty: <CircleDot size={10} />,
  };
  return (
    <span className={`badge ${map[status]}`}>
      {iconMap[status]}
      {status}
    </span>
  );
};

/* ── Inventory Page ── */
const Inventory = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Inventory Management</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-dark">
          <Plus size={16} />
          Add YP Batch
        </button>
      </header>

      {/* ── Row 1: Stat cards (4-col bento) ── */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard
          label="YP Tins In Stock"
          value="34"
          sub="tins across 3 suppliers"
          icon={Package}
        />
        <StatCard
          label="Total YP Weight"
          value="14,450"
          sub="kg available for production"
          icon={Weight}
        />
        <StatCard
          label="Finished Goods Value"
          value="₹48.2L"
          sub="PCL3 + PCL5 + POCL3"
          icon={IndianRupee}
          accent="var(--color-primary-muted)"
        />
        <StatCard
          label="Low Stock Alerts"
          value="2"
          sub="items below reorder level"
          icon={AlertTriangle}
          accent="var(--color-danger)"
        />
      </div>

      {/* ── Row 2: YP Tin Inventory table ── */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>YP Tin Inventory</h3>
            <span className="text-muted text-sm">Yellow Phosphorus — Current stock register</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline text-sm">
              <Filter size={14} />
              Filter
            </button>
            <button className="btn btn-outline text-sm">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Tin ID</th>
              <th>Supplier</th>
              <th>Weight (kg)</th>
              <th>Duty (₹/kg)</th>
              <th>Rate (₹/kg)</th>
              <th>Received Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ypTins.map(tin => (
              <tr key={tin.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 600 }}>{tin.id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={14} style={{ color: 'var(--color-text-muted-dark)' }} />
                    {tin.supplier}
                  </div>
                </td>
                <td style={{ fontWeight: 500 }}>{tin.weight.toLocaleString()}</td>
                <td>₹{tin.duty.toFixed(2)}</td>
                <td>₹{tin.rate}</td>
                <td className="text-muted">{tin.received}</td>
                <td>{statusBadge(tin.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Row 3: Finished Goods + Stock Movement ── */}
      <div className="bento bento-2">
        {/* Finished Goods Stock — Stacked Bar */}
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
              <BarChart data={finishedGoodsStock} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="PCL3" stackId="stock" fill="#14DD3C" radius={[0, 0, 0, 0]} />
                <Bar dataKey="PCL5" stackId="stock" fill="#3BA55C" radius={[0, 0, 0, 0]} />
                <Bar dataKey="POCL3" stackId="stock" fill="#B4FAB8" radius={[4, 4, 0, 0]} />
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

        {/* Stock Movement — Area Chart */}
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
                    <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#14DD3C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outwardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D94F4F" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#D94F4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="inward" name="Inward" stroke="#14DD3C" strokeWidth={2} fill="url(#inwardGrad)" />
                <Area type="monotone" dataKey="outward" name="Outward" stroke="#D94F4F" strokeWidth={2} fill="url(#outwardGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
            {[
              { label: 'Inward (Production / Receipts)', color: '#14DD3C' },
              { label: 'Outward (Sales / Dispatch)', color: '#D94F4F' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                {p.label}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Inventory;
