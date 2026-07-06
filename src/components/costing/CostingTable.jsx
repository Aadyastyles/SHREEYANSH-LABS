import React from 'react';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { productCosting, productColors, getMarginBadge, getMarginLabel } from './CostingData';

const CostingTable = () => {
  return (
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
  );
};

export default CostingTable;
