import React from 'react';
import { ArrowUpRight, User, CreditCard } from 'lucide-react';
import { clientLedger } from './SalesData';

const ClientLedger = () => {
  return (
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
  );
};

export default ClientLedger;
