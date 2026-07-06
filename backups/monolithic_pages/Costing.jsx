import React from 'react';
import {
  IndianRupee, TrendingUp, TrendingDown, Percent,
  ArrowUpRight, Flame, FlaskConical, Calculator,
  Calendar, FileSpreadsheet
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';

/* ── Static Data ── */

const productCosting = [
  {
    product: 'PCL3',
    ypRate: 285,
    conversionCost: 42,
    totalCost: 327,
    sellingPrice: 510,
    margin: 35.9,
  },
  {
    product: 'PCL5',
    ypRate: 285,
    conversionCost: 68,
    totalCost: 353,
    sellingPrice: 485,
    margin: 27.2,
  },
  {
    product: 'POCL3',
    ypRate: 285,
    conversionCost: 55,
    totalCost: 340,
    sellingPrice: 620,
    margin: 45.2,
  },
];

const costTrendData = [
  { month: 'Jan', PCL3: 318, PCL5: 342, POCL3: 330 },
  { month: 'Feb', PCL3: 322, PCL5: 348, POCL3: 335 },
  { month: 'Mar', PCL3: 315, PCL5: 345, POCL3: 328 },
  { month: 'Apr', PCL3: 330, PCL5: 356, POCL3: 342 },
  { month: 'May', PCL3: 325, PCL5: 350, POCL3: 338 },
  { month: 'Jun', PCL3: 327, PCL5: 353, POCL3: 340 },
];

const productColors = {
  PCL3: '#14DD3C',
  PCL5: '#3BA55C',
  POCL3: '#B4FAB8',
};

/* ── Helpers ── */

const getMarginBadge = (margin) => {
  if (margin >= 30) return 'badge badge-green';
  if (margin >= 20) return 'badge badge-yellow';
  return 'badge badge-red';
};

const getMarginLabel = (margin) => {
  if (margin >= 30) return 'Healthy';
  if (margin >= 20) return 'Moderate';
  return 'Low';
};

const getProgressColor = (margin) => {
  if (margin >= 30) return 'var(--color-primary)';
  if (margin >= 20) return 'var(--color-warning)';
  return 'var(--color-danger)';
};

/* ── Custom Tooltip for Area Chart ── */
const CostTooltip = ({ active, payload, label }) => {
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
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>₹{entry.value}/kg</span>
        </div>
      ))}
    </div>
  );
};

/* ── Stat Card ── */
const StatCard = ({ label, value, sub, icon: Icon, accent, badge }) => (
  <div className={accent ? 'card-green' : 'card'} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span className="text-muted text-sm fw-500">{label}</span>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--radius-sm)',
        background: accent ? 'rgba(20, 221, 60, 0.18)' : 'rgba(20, 221, 60, 0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} style={{ color: 'var(--color-primary)' }} />
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
      <span style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
      {badge && <span className={badge.cls}>{badge.icon}{badge.text}</span>}
      {sub && <span className="text-muted">{sub}</span>}
    </div>
  </div>
);

/* ── Costing Page ── */
const Costing = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <header className="page-title">
        <div>
          <div>Costing &amp; Margins</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Weighted-average analysis — FY 2026-27
          </div>
        </div>
        <button className="btn btn-dark">
          <FileSpreadsheet size={16} />
          Export Report
        </button>
      </header>

      {/* Row 1: Stat Cards */}
      <div className="bento bento-3">
        <StatCard
          label="Avg YP Cost"
          value="₹285/kg"
          sub="weighted avg across lots"
          icon={IndianRupee}
          badge={{ cls: 'badge badge-yellow', icon: <TrendingUp size={11} />, text: ' +3.6% vs Q4' }}
        />
        <StatCard
          label="Blended Production Cost"
          value="₹142/kg"
          sub="incl. utilities & overhead"
          icon={Flame}
          badge={{ cls: 'badge badge-green', icon: <TrendingDown size={11} />, text: ' −1.8% MoM' }}
        />
        <StatCard
          label="Gross Margin"
          value="34.2%"
          sub="across all 3 products"
          icon={Percent}
          accent
          badge={{ cls: 'badge badge-green', icon: <TrendingUp size={11} />, text: ' Healthy' }}
        />
      </div>

      {/* Row 2: Comparison Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Product-wise Cost Breakdown</h3>
            <span className="text-muted text-sm">Per-kg weighted-average costing — June 2026</span>
          </div>
          <button className="btn btn-outline text-sm" style={{ cursor: 'pointer' }}>
            <Calculator size={14} />
            Recalculate
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>YP Rate (₹/kg)</th>
              <th>Conversion Cost</th>
              <th>Total Cost/kg</th>
              <th>Selling Price/kg</th>
              <th>Margin %</th>
              <th>Margin Status</th>
            </tr>
          </thead>
          <tbody>
            {productCosting.map((row) => (
              <tr key={row.product} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 3,
                      background: productColors[row.product],
                    }} />
                    <span style={{ fontWeight: 600 }}>{row.product}</span>
                  </div>
                </td>
                <td>₹{row.ypRate}</td>
                <td>₹{row.conversionCost}</td>
                <td style={{ fontWeight: 600 }}>₹{row.totalCost}</td>
                <td style={{ fontWeight: 600 }}>₹{row.sellingPrice}</td>
                <td style={{ fontWeight: 700, color: row.margin >= 30 ? 'var(--color-primary-muted)' : 'var(--color-warning)' }}>
                  {row.margin}%
                </td>
                <td>
                  <span className={getMarginBadge(row.margin)}>
                    {row.margin >= 30 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {getMarginLabel(row.margin)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Table footer with blended summary */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '1rem', paddingTop: '0.75rem',
          borderTop: '1px solid var(--color-border-light)',
        }}>
          <span className="text-muted text-sm">Blended avg across 3 products</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="text-muted text-xs">Avg Cost</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹340/kg</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-muted text-xs">Avg Selling</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>₹538/kg</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-muted text-xs">Blended Margin</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-muted)' }}>34.2%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Cost Trend + Margin Analysis */}
      <div className="bento bento-2">
        {/* Cost Trend Area Chart */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Cost Trend</h3>
              <span className="text-muted text-sm">Cost/kg over last 6 months</span>
            </div>
            <button className="btn btn-outline text-sm" style={{ cursor: 'pointer' }}>
              <Calendar size={14} />
              6 months
            </button>
          </div>
          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradPCL3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14DD3C" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#14DD3C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPCL5" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3BA55C" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#3BA55C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradPOCL3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B4FAB8" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#B4FAB8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis stroke="var(--color-text-muted-dark)" tickLine={false} axisLine={false} fontSize={12} domain={[300, 370]} tickFormatter={(v) => `₹${v}`} />
                <Tooltip content={<CostTooltip />} />
                <Area type="monotone" dataKey="PCL3" stroke="#14DD3C" strokeWidth={2.5} fill="url(#gradPCL3)" />
                <Area type="monotone" dataKey="PCL5" stroke="#3BA55C" strokeWidth={2.5} fill="url(#gradPCL5)" />
                <Area type="monotone" dataKey="POCL3" stroke="#B4FAB8" strokeWidth={2.5} fill="url(#gradPOCL3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)' }}>
            {Object.entries(productColors).map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted-dark)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Margin Analysis — Progress bars */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Margin Analysis</h3>
              <span className="text-muted text-sm">Gross margin % by product</span>
            </div>
            <span className="badge badge-green">
              <ArrowUpRight size={12} />
              All above 20%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', flex: 1, justifyContent: 'center' }}>
            {productCosting.map((row) => (
              <div key={row.product}>
                {/* Label row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 3,
                      background: productColors[row.product],
                    }} />
                    <span className="fw-600" style={{ fontSize: '0.9rem' }}>{row.product}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{row.margin}%</span>
                    <span className={getMarginBadge(row.margin)} style={{ fontSize: '0.7rem' }}>
                      {getMarginLabel(row.margin)}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="progress-track" style={{ height: 10, borderRadius: 6 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(row.margin / 60 * 100, 100)}%`,
                      background: getProgressColor(row.margin),
                      borderRadius: 6,
                    }}
                  />
                </div>
                {/* Cost breakdown mini */}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem' }}>
                  <span className="text-muted text-xs">Cost: ₹{row.totalCost}/kg</span>
                  <span className="text-muted text-xs">Sell: ₹{row.sellingPrice}/kg</span>
                  <span className="text-muted text-xs">Spread: ₹{row.sellingPrice - row.totalCost}/kg</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom summary */}
          <div style={{
            marginTop: '1.5rem', paddingTop: '0.75rem',
            borderTop: '1px solid var(--color-border-light)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span className="text-muted text-sm">Best margin product</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FlaskConical size={14} style={{ color: 'var(--color-primary-muted)' }} />
              <span className="fw-700" style={{ fontSize: '0.95rem' }}>POCL3</span>
              <span className="badge badge-green">45.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Costing;
