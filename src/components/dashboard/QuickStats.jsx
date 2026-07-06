import React from 'react';
import { TrendingUp, ShoppingCart, Package } from 'lucide-react';

const QuickStats = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'var(--color-primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrendingUp size={24} style={{ color: 'var(--color-primary-muted)' }} />
        </div>
        <div>
          <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Output</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>99,681 <span className="text-muted text-sm">kg</span></div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'rgba(232, 168, 56, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingCart size={24} style={{ color: 'var(--color-warning)' }} />
        </div>
        <div>
          <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending POs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>4 <span className="text-muted text-sm fw-500 text-warning" style={{ color: 'var(--color-warning)' }}>(2 Urgent)</span></div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'rgba(100, 116, 139, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Package size={24} style={{ color: 'var(--color-text-muted-dark)' }} />
        </div>
        <div>
          <div className="text-muted text-sm fw-600" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>YP Consumed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>36.2 <span className="text-muted text-sm">Tons</span></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
