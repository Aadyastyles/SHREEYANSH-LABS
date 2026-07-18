import React, { useState } from 'react';
import { ArrowUpRight, CircleDot, Clock, Calendar, AlertTriangle, ArrowRight, Truck } from 'lucide-react';
import { outboundPOs, inboundPOs } from './SalesData';

const statusBadge = {
  Dispatched: 'badge badge-green',
  Processing: 'badge badge-yellow',
  Pending: 'badge badge-blue',
  Overdue: 'badge badge-red',
  Received: 'badge badge-green',
};

const statusIcon = {
  Dispatched: <CircleDot size={10} />,
  Processing: <Clock size={10} />,
  Pending: <Calendar size={10} />,
  Overdue: <AlertTriangle size={10} />,
  Received: <CircleDot size={10} />,
};

const PurchaseOrdersTable = () => {
  const [activeTab, setActiveTab] = useState('Outbound');

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Purchase Orders</h3>
          <span className="text-muted text-sm">
            {activeTab === 'Outbound' ? `${outboundPOs.length} Outbound POs (FG)` : `${inboundPOs.length} Inbound POs (RM)`}
          </span>
        </div>
        
        {/* PO Type Tabs */}
        <div style={{ background: '#F3F4F6', padding: '4px', borderRadius: '24px', display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('Outbound')}
            style={{
              padding: '4px 12px', fontSize: '0.8rem', fontWeight: activeTab === 'Outbound' ? 600 : 500, border: 'none', borderRadius: '20px',
              cursor: 'pointer', background: activeTab === 'Outbound' ? '#ffffff' : 'transparent',
              color: activeTab === 'Outbound' ? '#1e3a8a' : '#64748b',
              boxShadow: activeTab === 'Outbound' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s ease',
            }}
          >
            Outbound (Sales)
          </button>
          <button
            onClick={() => setActiveTab('Inbound')}
            style={{
              padding: '4px 12px', fontSize: '0.8rem', fontWeight: activeTab === 'Inbound' ? 600 : 500, border: 'none', borderRadius: '20px',
              cursor: 'pointer', background: activeTab === 'Inbound' ? '#ffffff' : 'transparent',
              color: activeTab === 'Inbound' ? '#1e3a8a' : '#64748b',
              boxShadow: activeTab === 'Inbound' ? '0 1px 3px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s ease',
            }}
          >
            Inbound (RM)
          </button>
        </div>

      </div>

      {activeTab === 'Outbound' ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Primary Client</th>
              <th>End Party</th>
              <th>Product</th>
              <th>Qty (kg)</th>
              <th>Total Value</th>
              <th>Dispatch Date</th>
              <th>Allocated Batches</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {outboundPOs.map((po) => (
              <tr key={po.po} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 600 }}>{po.po}</td>
                <td>{po.client}</td>
                <td style={{ fontWeight: 500, color: 'var(--color-primary)' }}>{po.endParty}</td>
                <td>
                  <span className="badge badge-green">{po.product}</span>
                </td>
                <td>{po.qty.toLocaleString('en-IN')}</td>
                <td style={{ fontWeight: 600 }}>₹{(po.total / 100000).toFixed(2)}L</td>
                <td>
                  <span className="text-muted">{po.dispatchDate}</span>
                </td>
                <td>
                  {po.allocatedBatches.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {po.allocatedBatches.map(b => (
                        <span key={b} style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>{b}</span>
                      ))}
                      {po.allocatedBatches.length > 1 && <span style={{ fontSize: '0.7rem', color: 'var(--color-warning)', fontWeight: 600 }}>Split Batch</span>}
                    </div>
                  ) : (
                    <span className="text-muted text-sm">—</span>
                  )}
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
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Supplier</th>
              <th>Material</th>
              <th>Qty</th>
              <th>Base Rate</th>
              <th>Liaisoning</th>
              <th>Total Final Rate</th>
              <th>Receive Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inboundPOs.map((po) => (
              <tr key={po.po} style={{ cursor: 'pointer' }}>
                <td style={{ fontWeight: 600 }}>{po.po}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={14} style={{ color: 'var(--color-text-muted-dark)' }} />
                    {po.supplier}
                  </div>
                </td>
                <td>{po.material}</td>
                <td style={{ fontWeight: 500 }}>{po.qty.toLocaleString('en-IN')}</td>
                <td>₹{po.baseRate}</td>
                <td style={{ color: 'var(--color-danger)' }}>{po.liaisoningFee > 0 ? `+₹${po.liaisoningFee}` : '—'}</td>
                <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>₹{po.baseRate + po.liaisoningFee}</td>
                <td>
                  <span className="text-muted">{po.receiveDate}</span>
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
      )}
    </div>
  );
};

export default PurchaseOrdersTable;
