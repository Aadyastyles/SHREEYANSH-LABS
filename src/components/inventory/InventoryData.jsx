import React from 'react';

export const ypTins = [
  { id: 'YP-2406-001', supplier: 'SCIMPLIFY', weight: 450, duty: 18.50, baseRate: 295, liaisoningFee: 17, received: '02 Jun 2026', status: 'Full', inPo: 'PO-RM-2026-101' },
  { id: 'YP-2406-002', supplier: 'SCIMPLIFY', weight: 425, duty: 18.50, baseRate: 298, liaisoningFee: 15, received: '18 Jun 2026', status: 'Full', inPo: 'PO-RM-2026-104' },
  { id: 'YP-2406-003', supplier: 'SCIMPLIFY', weight: 210, duty: 18.50, baseRate: 295, liaisoningFee: 17, received: '28 May 2026', status: 'Partial', inPo: 'PO-RM-2026-098' },
  { id: 'YP-2405-018', supplier: 'Yunnan Chem Corp.', weight: 440, duty: 22.00, baseRate: 285, liaisoningFee: 0, received: '18 May 2026', status: 'Full', inPo: 'PO-2026-045' },
  { id: 'YP-2405-017', supplier: 'Yunnan Chem Corp.', weight: 85, duty: 22.00, baseRate: 285, liaisoningFee: 0, received: '12 May 2026', status: 'Partial', inPo: 'PO-2026-045' },
  { id: 'YP-2405-014', supplier: 'Thermphos Intl.', weight: 0, duty: 18.50, baseRate: 308, liaisoningFee: 0, received: '01 May 2026', status: 'Empty', inPo: 'PO-2026-022' },
];

export const productionBatches = [
  {
    batchId: 'B-2406-01',
    outboundPo: 'PO-FG-2026-341',
    product: 'PCL3',
    producedQty: 2000, // kg of PCL3
    consumedYpTins: [
      { tinId: 'YP-2405-014', qtyConsumed: 450 }, // Consumed the whole tin
    ]
  },
  {
    batchId: 'B-2406-02',
    outboundPo: 'PO-FG-2026-341',
    product: 'PCL3',
    producedQty: 500, // The remaining PO qty (Total 2500)
    consumedYpTins: [
      { tinId: 'YP-2405-017', qtyConsumed: 112.5 }, // Needed another tin! This is the "split upon 2" scenario.
    ]
  }
];

export const finishedGoodsStock = [
  { month: 'Jan', PCL3: 6200, PCL5: 2800, POCL3: 3400 },
  { month: 'Feb', PCL3: 5800, PCL5: 3200, POCL3: 3800 },
  { month: 'Mar', PCL3: 7100, PCL5: 2600, POCL3: 4100 },
  { month: 'Apr', PCL3: 6500, PCL5: 3800, POCL3: 3600 },
  { month: 'May', PCL3: 8200, PCL5: 3100, POCL3: 4400 },
  { month: 'Jun', PCL3: 7400, PCL5: 3500, POCL3: 4800 },
];

export const overallInventory = [
  { id: 'INV-2026-101', category: 'Yellow Phosphorus', name: 'YP Tin (Prayon)', qty: 450, unit: 'kg', location: 'Warehouse A', status: 'Full', date: '02 Jun 2026' },
  { id: 'INV-2026-102', category: 'Yellow Phosphorus', name: 'YP Tin (Thermphos)', qty: 425, unit: 'kg', location: 'Warehouse A', status: 'Full', date: '05 Jun 2026' },
  { id: 'INV-2026-103', category: 'Chlorine', name: 'Cl2 Cylinder (Active)', qty: 700, unit: 'kg', location: 'Production Floor', status: 'In Use', date: '21 Jun 2026' },
  { id: 'INV-2026-104', category: 'Chlorine', name: 'Cl2 Cylinders (Reserve)', qty: 8400, unit: 'kg', location: 'Warehouse B', status: 'Stored (12 units)', date: '15 Jun 2026' },
  { id: 'INV-2026-105', category: 'Finished Goods', name: 'PCL3 Batch (B-2406-01)', qty: 2000, unit: 'kg', location: 'Dispatch Bay', status: 'Ready', date: '24 Jun 2026' },
  { id: 'INV-2026-106', category: 'Finished Goods', name: 'POCL3 Batch (B-2406-02)', qty: 1800, unit: 'kg', location: 'Warehouse C', status: 'Ready', date: '22 Jun 2026' },
  { id: 'INV-2026-107', category: 'Carboys', name: 'Empty Drums (50L)', qty: 1200, unit: 'units', location: 'Yard', status: 'Available', date: '05 Jun 2026' },
  { id: 'INV-2026-108', category: 'CaCO3 Flakes', name: 'Limestone Flakes', qty: 5000, unit: 'kg', location: 'Yard Silo', status: 'Stored', date: '10 Jun 2026' },
  { id: 'INV-2026-109', category: 'Coal', name: 'Boiler Coal', qty: 15000, unit: 'kg', location: 'Yard Heap', status: 'Stored', date: '01 Jun 2026' },
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
