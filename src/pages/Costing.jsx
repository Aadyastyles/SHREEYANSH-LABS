import React from 'react';
import {
  IndianRupee, TrendingUp, TrendingDown, Percent,
  Flame, Calendar, FileSpreadsheet
} from 'lucide-react';

// Sub-components
import CostingStatCard from '../components/costing/CostingStatCard';
import CostingTable from '../components/costing/CostingTable';
import CostTrendChart from '../components/costing/CostTrendChart';
import MarginAnalysis from '../components/costing/MarginAnalysis';

const Costing = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <header className="page-title">
        <div>
          <div>Costing &amp; Margins</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Weighted-average analysis — FY 2026-27
          </div>
        </div>
        <button className="btn btn-dark">
          <FileSpreadsheet size={16} />
          Export Report
        </button>
      </header>

      {/* Row 1: Stat Cards */}
      <div className="bento bento-3">
        <CostingStatCard
          label="Avg YP Cost"
          value="₹285/kg"
          sub="weighted avg across lots"
          icon={IndianRupee}
          badge={{ cls: 'badge badge-yellow', icon: <TrendingUp size={11} />, text: ' +3.6% vs Q4' }}
        />
        <CostingStatCard
          label="Blended Production Cost"
          value="₹142/kg"
          sub="incl. utilities & overhead"
          icon={Flame}
          badge={{ cls: 'badge badge-green', icon: <TrendingDown size={11} />, text: ' −1.8% MoM' }}
        />
        <CostingStatCard
          label="Gross Margin"
          value="34.2%"
          sub="across all 3 products"
          icon={Percent}
          accent
          badge={{ cls: 'badge badge-green', icon: <TrendingUp size={11} />, text: ' Healthy' }}
        />
      </div>

      {/* Row 2: Comparison Table */}
      <CostingTable />

      {/* Row 3: Cost Trend + Margin Analysis */}
      <div className="bento bento-2">
        <CostTrendChart />
        <MarginAnalysis />
      </div>
    </div>
  );
};

export default Costing;
