import React, { useState } from 'react';
import { ArrowUpRight, Filter, CircleDot } from 'lucide-react';

/* ── Category badge helper ── */
const categoryBadge = (category) => {
  const map = {
    'Yellow Phosphorus': { bg: 'rgba(234, 179, 8, 0.15)', color: 'var(--color-chem-yp)' },
    'Chlorine': { bg: 'rgba(22, 188, 228, 0.15)', color: 'var(--color-primary-muted)' },
    'Finished Goods': { bg: 'rgba(46, 49, 146, 0.15)', color: 'var(--color-brand-blue)' },
    'Carboys': { bg: 'rgba(100, 116, 139, 0.15)', color: 'var(--color-text-muted-dark)' },
    'CaCO3 Flakes': { bg: 'rgba(15, 23, 42, 0.1)', color: 'var(--color-text-dark)' },
    'Coal': { bg: 'rgba(0, 0, 0, 0.1)', color: '#333' },
  };
  const style = map[category] || { bg: '#eee', color: '#666' };
  
  return (
    <span style={{ 
      background: style.bg, color: style.color, 
      padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 
    }}>
      {category}
    </span>
  );
};

/* ── Status badge helper ── */
const statusBadge = (status) => {
  const map = {
    'Full': 'badge-green',
    'Partial': 'badge-yellow',
    'Empty': 'badge-red',
    'In Use': 'badge-yellow',
    'Stored': 'badge-neutral',
    'Stored (12 units)': 'badge-neutral',
    'Ready': 'badge-green',
    'Available': 'badge-blue',
  };
  const badgeClass = map[status] || 'badge-neutral';
  return (
    <span className={`badge ${badgeClass}`}>
      <CircleDot size={10} />
      {status}
    </span>
  );
};

const InventoryTable = ({ data = [] }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Overall Shreeyansh Inventory</h3>
          <span className="text-muted text-sm">Unified stock register across all categories</span>
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
      
      {/* Scrollable Container */}
      <div style={{ maxHeight: '350px', overflowY: 'auto', marginRight: '-1.5rem', paddingRight: '1.5rem' }}>
        <table className="data-table">
          <thead style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Location</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 600 }}>{item.id}</td>
                <td>{categoryBadge(item.category)}</td>
                <td style={{ fontWeight: 500, color: 'var(--color-text-dark)' }}>{item.name}</td>
                <td style={{ fontWeight: 600 }}>
                  {item.qty.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted-dark)', fontWeight: 500 }}>{item.unit}</span>
                </td>
                <td className="text-muted">{item.location}</td>
                <td className="text-muted">{item.date}</td>
                <td>{statusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
