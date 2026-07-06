import React from 'react';
import { Play, FlaskConical, CheckCircle2, AlertTriangle, Truck, Wrench } from 'lucide-react';

export const stockData = {
  opening: { PCL3: '8,320', PCL5: '3,140', POCL3: '4,680' },
  production: { PCL3: '2,400', PCL5: '800', POCL3: '1,100' },
  closing: { PCL3: '9,120', PCL5: '3,640', POCL3: '5,280' },
};

export const activityLog = [
  { time: '06:30', icon: Play, badge: 'badge-green', label: 'Reactor R-1 started — morning warm-up sequence initiated, coolant loop engaged' },
  { time: '09:15', icon: FlaskConical, badge: 'badge-blue', label: 'Batch B-1042 started, PCL3, 850 kg YP input — estimated completion 14:30' },
  { time: '11:40', icon: CheckCircle2, badge: 'badge-green', label: 'Batch B-1041 completed — POCL3, output 1,740 kg, yield 91.1%, QC passed' },
  { time: '13:05', icon: AlertTriangle, badge: 'badge-yellow', label: 'Pressure fluctuation in Reactor R-2 — auto-corrected, operator notified' },
  { time: '15:20', icon: Truck, badge: 'badge-blue', label: 'Dispatch PO-2281 loaded — PCL3, 2,000 kg to Aarti Industries, Vapi' },
  { time: '17:45', icon: Wrench, badge: 'badge-neutral', label: 'Scheduled maintenance on Condenser C-3 — gasket replacement, back online by 19:00' },
];

export const ypConsumption = [
  { name: 'PCL3 batches', value: 5, color: '#14DD3C' },
  { name: 'PCL5 batches', value: 2, color: '#3BA55C' },
  { name: 'POCL3 batches', value: 3, color: '#B4FAB8' },
];

export const totalTins = 10;

export const dispatchData = [
  { po: 'PO-2281', product: 'PCL3', qty: '2,000 kg', buyer: 'Aarti Industries', status: 'Shipped' },
  { po: 'PO-2279', product: 'POCL3', qty: '1,200 kg', buyer: 'UPL Ltd', status: 'Shipped' },
  { po: 'PO-2283', product: 'PCL5', qty: '600 kg', buyer: 'Laxmi Organics', status: 'Loading' },
];

export const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--color-bg-dark-raised)',
      border: '1px solid var(--color-border-dark)',
      borderRadius: '12px',
      padding: '0.6rem 0.9rem',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
    }}>
      {payload.map((entry, i) => (
        <div key={i} style={{ color: entry.payload.color, fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.payload.color }} />
          {entry.name}: <span style={{ color: 'var(--color-text-white)', fontWeight: 600 }}>{entry.value} tins</span>
        </div>
      ))}
    </div>
  );
};
