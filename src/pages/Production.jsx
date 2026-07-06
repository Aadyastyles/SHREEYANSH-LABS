import React from 'react';
import { Plus, CalendarDays } from 'lucide-react';
import { stats } from '../components/production/ProductionData';

// Sub-components
import ProductionStatCard from '../components/production/ProductionStatCard';
import BatchesTable from '../components/production/BatchesTable';
import YieldByProductChart from '../components/production/YieldByProductChart';
import ProductionTimeline from '../components/production/ProductionTimeline';

const Production = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Production Batches</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <CalendarDays size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          New Batch
        </button>
      </header>

      {/* ── Row 1: Stat Cards ── */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(s => (
          <ProductionStatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Row 2: Batches Table ── */}
      <BatchesTable />

      {/* ── Row 3: Yield Chart + Timeline ── */}
      <div className="bento bento-2">
        <YieldByProductChart />
        <ProductionTimeline />
      </div>
    </div>
  );
};

export default Production;
