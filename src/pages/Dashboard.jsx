import React, { useState } from 'react';
import {
  Package, Beaker, Droplets, Gauge,
  Calendar, Loader2, Download, Layers
} from 'lucide-react';

// Sub-components
import DashboardKpi from '../components/dashboard/DashboardKpi';
import ProductionChart from '../components/dashboard/ProductionChart';
import ProductMixDonut from '../components/dashboard/ProductMixDonut';
import YieldTrendChart from '../components/dashboard/YieldTrendChart';
import LiveBatchTable from '../components/dashboard/LiveBatchTable';
import QuickStats from '../components/dashboard/QuickStats';

const Dashboard = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStream, setSelectedStream] = useState('YP');

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500); // Simulate backend sync
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000); // Simulate PDF generation
  };

  const handleKpiClick = (stream) => {
    setSelectedStream(stream);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      {/* Header - Animated Entrance */}
      <header className="page-title animate-fade-up">
        <div>
          <div style={{ fontSize: '2.4rem' }}>Dashboard Overview</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            <span>25 Jun 2026, Wednesday</span>
            <span style={{ margin: '0 8px', color: 'var(--color-border-light)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-chem-pcl3)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-chem-pcl3)', boxShadow: '0 0 8px var(--color-chem-pcl3)' }}></span>
              Live Telemetry Active
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? <Loader2 size={16} className="lucide-spin" /> : <Download size={16} />}
            {isGenerating ? 'Generating...' : 'Export Report'}
          </button>
          <button className="btn btn-dark" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? <Loader2 size={16} className="lucide-spin" /> : <Gauge size={16} />}
            {isSyncing ? 'Syncing...' : 'Live Sync'}
          </button>
        </div>
      </header>

      {/* Row 1: KPIs */}
      <div className="bento bento-3 animate-fade-up delay-100" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <DashboardKpi variant="primary" label="Total Consumption (YP)" value="2,450" unit="kg" trend="up" trendVal="8.4%" icon={Package} colorClass="var(--color-chem-yp)" isActive={selectedStream === 'YP'} onClick={() => handleKpiClick('YP')} />
        <DashboardKpi label="PCL3 Output" value="11,320" unit="kg" trend="up" trendVal="5.1%" icon={Beaker} colorClass="var(--color-chem-pcl3)" isActive={selectedStream === 'PCL3'} onClick={() => handleKpiClick('PCL3')} />
        <DashboardKpi label="PCL5 Output" value="1,840" unit="kg" trend="down" trendVal="1.2%" icon={Layers} colorClass="var(--color-chem-pcl5)" isActive={selectedStream === 'PCL5'} onClick={() => handleKpiClick('PCL5')} />
        <DashboardKpi label="POCL3 Output" value="8,680" unit="kg" trend="up" trendVal="7.3%" icon={Droplets} colorClass="var(--color-chem-pocl3)" isActive={selectedStream === 'POCL3'} onClick={() => handleKpiClick('POCL3')} />
      </div>

      {/* Row 2: Production chart + Product mix + Yield */}
      <div className="bento animate-fade-up delay-200" style={{ gridTemplateColumns: '5fr 2fr' }}>
        <ProductionChart selectedStream={selectedStream} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ProductMixDonut selectedStream={selectedStream} />
          <YieldTrendChart />
        </div>
      </div>

      {/* Row 3: Recent batches + Quick stats */}
      <div className="bento animate-fade-up delay-300" style={{ gridTemplateColumns: '3fr 1fr' }}>
        <LiveBatchTable />
        <QuickStats />
      </div>
    </div>
  );
};

export default Dashboard;
