import React from 'react';
import {
  ShoppingCart, IndianRupee, Truck, AlertTriangle,
  Plus, Calendar
} from 'lucide-react';

// Sub-components
import SalesStatCard from '../components/sales/SalesStatCard';
import PurchaseOrdersTable from '../components/sales/PurchaseOrdersTable';
import RevenueChart from '../components/sales/RevenueChart';
import ClientLedger from '../components/sales/ClientLedger';

const Sales = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <header className="page-title">
        <div>
          <div>Sales & Purchase Orders</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            25 Jun 2026, Wednesday
          </div>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} />
          Create PO
        </button>
      </header>

      {/* Row 1 — KPI stat cards */}
      <div className="bento" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <SalesStatCard
          label="Open POs"
          value="4"
          icon={ShoppingCart}
        />
        <SalesStatCard
          label="Revenue This Month"
          value="₹18.6L"
          icon={IndianRupee}
        />
        <SalesStatCard
          label="Dispatched This Week"
          value="3"
          icon={Truck}
        />
        <SalesStatCard
          label="Overdue POs"
          value="1"
          icon={AlertTriangle}
          accent="rgba(217, 79, 79, 0.12)"
          badgeClass="badge badge-red"
          badgeText="Urgent"
        />
      </div>

      {/* Row 2 — Purchase Orders Table */}
      <PurchaseOrdersTable />

      {/* Row 3 — Revenue Chart + Client Ledger */}
      <div className="bento bento-2">
        <RevenueChart />
        <ClientLedger />
      </div>
    </div>
  );
};

export default Sales;
