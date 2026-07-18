import React, { useState } from 'react';
import { Package, Plus, Weight, IndianRupee, AlertTriangle, Calendar, FlaskConical, Box, Database, Cylinder } from 'lucide-react';

// Sub-components
import InventoryStatCard from '../components/inventory/InventoryStatCard';
import InventoryTable from '../components/inventory/InventoryTable';
import FinishedGoodsChart from '../components/inventory/FinishedGoodsChart';
import StockMovementChart from '../components/inventory/StockMovementChart';
import StockTransactionModal from '../components/inventory/StockTransactionModal';
import { overallInventory as initialInventory } from '../components/inventory/InventoryData';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);

  const handleStockTransaction = (newItem) => {
    setInventory(prev => [newItem, ...prev]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>

      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Inventory Management</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-dark" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          Add / Remove Stock
        </button>
      </header>

      {/* ── Row 1 & Row 2: 8 Stat cards (4-col bento x 2 rows) ── */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <InventoryStatCard
          label="YP Tins Stock"
          value="34"
          sub="(14,450 kg)"
          icon={Package}
          iconColor="var(--color-chem-yp)"
          accent="var(--color-chem-yp-glow)"
        />
        <InventoryStatCard
          label="Finished Goods Value"
          value="₹48.2L"
          sub="Total market value"
          icon={IndianRupee}
          iconColor="var(--color-primary)"
          accent="var(--color-primary-pale)"
        />
        <InventoryStatCard
          label="Low Stocks Alert"
          value="2"
          sub="items below reorder level"
          icon={AlertTriangle}
          iconColor="var(--color-danger)"
          accent="rgba(217, 79, 79, 0.15)"
        />
        <InventoryStatCard
          label="Chlorine in Production"
          value="2,100"
          sub="(kg)"
          icon={FlaskConical}
          iconColor="var(--color-primary)"
          accent="var(--color-primary-pale)"
        />
        
        <InventoryStatCard
          label="YP in Production"
          value="450"
          sub="(kg)"
          icon={Weight}
          iconColor="var(--color-chem-yp)"
          accent="var(--color-chem-yp-glow)"
        />
        <InventoryStatCard
          label="Chlorine Left Out Stock"
          value="8,400"
          sub="(kg, 9 cylinders)"
          icon={Cylinder}
          iconColor="var(--color-info)"
          accent="rgba(74, 144, 217, 0.15)"
        />
        <InventoryStatCard
          label="Carboys Drums Count"
          value="1,200"
          sub="units"
          icon={Box}
          iconColor="var(--color-text-muted-dark)"
          accent="var(--color-border-light)"
        />
        <InventoryStatCard
          label="Flakes Qty"
          value="5,000"
          sub="(kg)"
          icon={Database}
          iconColor="var(--color-text-dark)"
          accent="rgba(15, 23, 42, 0.1)"
        />
      </div>

      {/* ── Row 3: Overall Inventory table ── */}
      <InventoryTable data={inventory} />

      {/* ── Row 4: Finished Goods + Stock Movement ── */}
      <div className="bento bento-2">
        <FinishedGoodsChart />
        <StockMovementChart />
      </div>

      {isModalOpen && (
        <StockTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleStockTransaction}
        />
      )}
    </div>
  );
};

export default Inventory;
