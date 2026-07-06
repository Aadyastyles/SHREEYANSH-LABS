import React from 'react';
import { ArrowUpRight, Filter, Truck, CircleDot } from 'lucide-react';
import { ypTins } from './InventoryData';

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

const InventoryTable = () => {
  return (
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
  );
};

export default InventoryTable;
