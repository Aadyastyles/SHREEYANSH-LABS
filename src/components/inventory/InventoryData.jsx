import React from 'react';

export const ypTins = [
  { id: 'YP-2406-001', supplier: 'Prayon SA (Belgium)', weight: 450, duty: 18.50, rate: 312, received: '02 Jun 2026', status: 'Full' },
  { id: 'YP-2406-002', supplier: 'Thermphos Intl.', weight: 425, duty: 18.50, rate: 308, received: '05 Jun 2026', status: 'Full' },
  { id: 'YP-2406-003', supplier: 'Prayon SA (Belgium)', weight: 210, duty: 18.50, rate: 312, received: '28 May 2026', status: 'Partial' },
  { id: 'YP-2405-018', supplier: 'Yunnan Chem Corp.', weight: 440, duty: 22.00, rate: 285, received: '18 May 2026', status: 'Full' },
  { id: 'YP-2405-017', supplier: 'Yunnan Chem Corp.', weight: 85, duty: 22.00, rate: 285, received: '12 May 2026', status: 'Partial' },
  { id: 'YP-2405-014', supplier: 'Thermphos Intl.', weight: 0, duty: 18.50, rate: 308, received: '01 May 2026', status: 'Empty' },
];

export const finishedGoodsStock = [
  { month: 'Jan', PCL3: 6200, PCL5: 2800, POCL3: 3400 },
  { month: 'Feb', PCL3: 5800, PCL5: 3200, POCL3: 3800 },
  { month: 'Mar', PCL3: 7100, PCL5: 2600, POCL3: 4100 },
  { month: 'Apr', PCL3: 6500, PCL5: 3800, POCL3: 3600 },
  { month: 'May', PCL3: 8200, PCL5: 3100, POCL3: 4400 },
  { month: 'Jun', PCL3: 7400, PCL5: 3500, POCL3: 4800 },
];

export const stockMovement = [
  { day: '01 Jun', inward: 2400, outward: 1800 },
  { day: '05 Jun', inward: 1900, outward: 2200 },
  { day: '09 Jun', inward: 3100, outward: 1600 },
  { day: '13 Jun', inward: 2600, outward: 2900 },
  { day: '17 Jun', inward: 1500, outward: 2100 },
  { day: '21 Jun', inward: 3400, outward: 2800 },
  { day: '25 Jun', inward: 2200, outward: 1400 },
];

export const CustomTooltip = ({ active, payload, label, unit = 'kg' }) => {
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
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value.toLocaleString()} {unit}</span>
        </div>
      ))}
    </div>
  );
};
