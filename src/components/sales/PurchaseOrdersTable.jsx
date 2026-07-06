import React from 'react';
import { ArrowUpRight, CircleDot, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { purchaseOrders } from './SalesData';

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

const PurchaseOrdersTable = () => {
  return (
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
  );
};

export default PurchaseOrdersTable;
