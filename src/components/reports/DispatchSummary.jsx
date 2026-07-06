import React from 'react';
import { ArrowUpRight, CircleDot, Truck } from 'lucide-react';
import { dispatchData } from './ReportsData';

const DispatchSummary = () => {
  return (
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
  );
};

export default DispatchSummary;
