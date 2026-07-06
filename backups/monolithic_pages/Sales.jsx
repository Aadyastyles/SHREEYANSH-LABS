import React from 'react';
import {
  ShoppingCart, IndianRupee, Truck, AlertTriangle,
  Plus, ArrowUpRight, CircleDot, Clock, Calendar,
  User, CreditCard
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

/* ── Data ── */

const purchaseOrders = [
  {
    po: 'PO-2026-341',
    client: 'Meghmani Organics',
    product: 'PCL3',
    qty: 2500,
    rate: 320,
    total: 800000,
    dispatchDate: '22 Jun 2026',
    status: 'Dispatched',
  },
  {
    po: 'PO-2026-342',
    client: 'Aarti Industries',
    product: 'POCL3',
    qty: 1800,
    rate: 285,
    total: 513000,
    dispatchDate: '24 Jun 2026',
    status: 'Dispatched',
  },
  {
    po: 'PO-2026-343',
    client: 'UPL Ltd',
    product: 'PCL5',
    qty: 900,
    rate: 510,
    total: 459000,
    dispatchDate: '25 Jun 2026',
    status: 'Processing',
  },
  {
    po: 'PO-2026-344',
    client: 'Meghmani Organics',
    product: 'PCL3',
    qty: 3200,
    rate: 320,
    total: 1024000,
    dispatchDate: '28 Jun 2026',
    status: 'Pending',
  },
  {
    po: 'PO-2026-345',
    client: 'Hemani Industries',
    product: 'POCL3',
    qty: 1400,
    rate: 290,
    total: 406000,
    dispatchDate: '30 Jun 2026',
    status: 'Processing',
  },
  {
    po: 'PO-2026-346',
    client: 'Aarti Industries',
    product: 'PCL5',
    qty: 650,
    rate: 510,
    total: 331500,
    dispatchDate: '02 Jul 2026',
    status: 'Pending',
  },
  {
    po: 'PO-2026-339',
    client: 'Shree Pushkar Chemicals',
    product: 'PCL3',
    qty: 2000,
    rate: 318,
    total: 636000,
    dispatchDate: '18 Jun 2026',
    status: 'Overdue',
  },
];

const revenueByProduct = [
  { month: 'Jan', PCL3: 6.2, PCL5: 3.8, POCL3: 4.1 },
  { month: 'Feb', PCL3: 7.1, PCL5: 4.2, POCL3: 3.6 },
  { month: 'Mar', PCL3: 5.8, PCL5: 5.1, POCL3: 4.8 },
  { month: 'Apr', PCL3: 8.4, PCL5: 4.6, POCL3: 5.2 },
  { month: 'May', PCL3: 7.6, PCL5: 3.9, POCL3: 5.8 },
  { month: 'Jun', PCL3: 9.2, PCL5: 5.4, POCL3: 4.0 },
];

const clientLedger = [
  { name: 'Meghmani Organics', outstanding: '₹4,82,000', lastPayment: '18 Jun 2026' },
  { name: 'Aarti Industries', outstanding: '₹2,15,600', lastPayment: '12 Jun 2026' },
  { name: 'UPL Ltd', outstanding: '₹1,08,400', lastPayment: '20 Jun 2026' },
  { name: 'Shree Pushkar Chemicals', outstanding: '₹6,36,000', lastPayment: '28 May 2026' },
];

const statusBadge = {
  Dispatched: 'badge badge-green',
  Processing: 'badge badge-yellow',
  Pending: 'badge badge-blue',
  Overdue: 'badge badge-red',
};

const statusIcon = {
  Dispatched: <CircleDot size={10} />,
  Processing: <Clock size={10} />,
  Pending: <Calendar size={10} />,
  Overdue: <AlertTriangle size={10} />,
};

/* ── Tooltip ── */
const ChartTooltip = ({ active, payload, label }) => {
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
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>₹{entry.value}L</span>
        </div>
      ))}
    </div>
  );
};

/* ── Stat Card ── */
const StatCard = ({ label, value, icon: Icon, accent, badgeClass, badgeText }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent || 'rgba(20, 221, 60, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: accent ? '#fff' : 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
      {badgeText && <span className={badgeClass}>{badgeText}</span>}
    </div>
  </div>
);

/* ── Sales Page ── */
const Sales = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <header className="page-title">
        <div>
          <div>Sales & Purchase Orders</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          Create PO
        </button>
      </header>

      {/* Row 1 — KPI stat cards */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <StatCard
          label="Open POs"
          value="4"
          icon={ShoppingCart}
        />
        <StatCard
          label="Revenue This Month"
          value="₹18.6L"
          icon={IndianRupee}
        />
        <StatCard
          label="Dispatched This Week"
          value="3"
          icon={Truck}
        />
        <StatCard
          label="Overdue POs"
          value="1"
          icon={AlertTriangle}
          accent="rgba(217, 79, 79, 0.12)"
          badgeClass="badge badge-red"
          badgeText="Urgent"
        />
      </div>

      {/* Row 2 — Purchase Orders Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Purchase Orders</h3>
            <span className="text-muted text-sm">7 orders — 4 open, 2 dispatched, 1 overdue</span>
          </div>
          <button className="btn btn-outline text-sm">
            View all <ArrowUpRight size={14} />
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Client</th>
              <th>Product</th>
              <th>Qty (kg)</th>
              <th>Rate (₹/kg)</th>
              <th>Total Value</th>
              <th>Dispatch Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po) => (
              <tr key={po.po} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 600 }}>{po.po}</td>
                <td>{po.client}</td>
                <td>
                  <span className="badge badge-green">{po.product}</span>
                </td>
                <td>{po.qty.toLocaleString('en-IN')}</td>
                <td>₹{po.rate}</td>
                <td style={{ fontWeight: 600 }}>₹{(po.total / 100000).toFixed(2)}L</td>
                <td>
                  <span className="text-muted">{po.dispatchDate}</span>
                </td>
                <td>
                  <span className={statusBadge[po.status]}>
                    {statusIcon[po.status]}
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row 3 — Revenue Chart + Client Ledger */}
      <div className="bento bento-2">
        {/* Revenue by Product — stacked area chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Revenue by Product</h3>
              <span className="text-muted text-sm">Monthly breakdown — last 6 months (₹ Lakhs)</span>
            </div>
            <button className="btn btn-outline text-sm">
              <Clock size={14} />
              6 months
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByProduct} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPCL3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#14DD3C" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradPCL5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3BA55C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#3BA55C" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradPOCL3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B4FAB8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#B4FAB8" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="PCL3" stackId="1" stroke="#14DD3C" strokeWidth={2} fill="url(#gradPCL3)" />
                <Area type="monotone" dataKey="PCL5" stackId="1" stroke="#3BA55C" strokeWidth={2} fill="url(#gradPCL5)" />
                <Area type="monotone" dataKey="POCL3" stackId="1" stroke="#B4FAB8" strokeWidth={2} fill="url(#gradPOCL3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
            {[
              { label: 'PCL3', color: '#14DD3C' },
              { label: 'PCL5', color: '#3BA55C' },
              { label: 'POCL3', color: '#B4FAB8' },
            ].map((p) => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: p.color }} />
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* Client Ledger Summary */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Client Ledger Summary</h3>
              <span className="text-muted text-sm">Outstanding balances & last payment</span>
            </div>
            <button className="btn btn-outline text-sm">
              View all <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
            {clientLedger.map((client, idx) => (
              <div
                key={client.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 0.5rem',
                  borderBottom: idx < clientLedger.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Avatar circle */}
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(20, 221, 60, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <User size={18} style={{ color: 'var(--color-primary)' }} />
                </div>

                {/* Name + last payment */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {client.name}
                  </div>
                  <div className="text-muted text-xs" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                    <CreditCard size={11} />
                    Last paid: {client.lastPayment}
                  </div>
                </div>

                {/* Outstanding amount */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
                    {client.outstanding}
                  </div>
                  <div className="text-muted text-xs">outstanding</div>
                </div>
              </div>
            ))}
          </div>

          {/* Total bar */}
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--color-border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span className="text-muted text-sm fw-500">Total Outstanding</span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>₹14,42,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
