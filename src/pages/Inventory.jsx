import React from 'react';
import { Package, Plus, Weight, IndianRupee, AlertTriangle, Calendar } from 'lucide-react';

// Sub-components
import InventoryStatCard from '../components/inventory/InventoryStatCard';
import InventoryTable from '../components/inventory/InventoryTable';
import FinishedGoodsChart from '../components/inventory/FinishedGoodsChart';
import StockMovementChart from '../components/inventory/StockMovementChart';

const Inventory = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Inventory Management</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-dark">
          <Plus size={16} />
          Add YP Batch
        </button>
      </header>

      {/* ── Row 1: Stat cards (4-col bento) ── */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <InventoryStatCard
          label="YP Tins In Stock"
          value="34"
          sub="tins across 3 suppliers"
          icon={Package}
        />
        <InventoryStatCard
          label="Total YP Weight"
          value="14,450"
          sub="kg available for production"
          icon={Weight}
        />
        <InventoryStatCard
          label="Finished Goods Value"
          value="₹48.2L"
          sub="PCL3 + PCL5 + POCL3"
          icon={IndianRupee}
          accent="var(--color-primary-muted)"
        />
        <InventoryStatCard
          label="Low Stock Alerts"
          value="2"
          sub="items below reorder level"
          icon={AlertTriangle}
          accent="var(--color-danger)"
        />
      </div>

      {/* ── Row 2: YP Tin Inventory table ── */}
      <InventoryTable />

      {/* ── Row 3: Finished Goods + Stock Movement ── */}
      <div className="bento bento-2">
        <FinishedGoodsChart />
        <StockMovementChart />
      </div>

    </div>
  );
};

export default Inventory;
