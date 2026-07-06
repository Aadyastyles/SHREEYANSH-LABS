import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Package } from 'lucide-react';
import { ypConsumption, totalTins, ChartTooltip } from './ReportsData';

const YpConsumptionDonut = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>YP Consumption</h3>
        <span className="badge badge-green">
          <Package size={11} />
          {totalTins} tins today
        </span>
      </div>
      <div className="text-muted text-sm" style={{ marginBottom: '0.75rem' }}>
        Yellow Phosphorus (P4) tins used across all product lines
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
        {/* Donut */}
        <div style={{ width: 180, height: 180, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ypConsumption}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {ypConsumption.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            textAlign: 'center', pointerEvents: 'none',
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>{totalTins}</div>
            <div className="text-muted text-xs">tins</div>
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
          {ypConsumption.map(item => (
            <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.value}</span>
                <span className="text-muted text-xs">tins</span>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '0.6rem', marginTop: '0.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-sm fw-600">Total YP consumed</span>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>3,050 <span className="text-muted text-xs">kg</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YpConsumptionDonut;
