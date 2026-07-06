import React, { useState } from 'react';
import {
  FileDown, Package, FlaskConical, CheckCircle2, Clipboard
} from 'lucide-react';
import { stockData } from '../components/reports/ReportsData';

// Sub-components
import StockCard from '../components/reports/StockCard';
import ActivityLog from '../components/reports/ActivityLog';
import YpConsumptionDonut from '../components/reports/YpConsumptionDonut';
import DispatchSummary from '../components/reports/DispatchSummary';

const Reports = () => {
  const [selectedDate, setSelectedDate] = useState('2026-06-25');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* ── Header ── */}
      <header className="page-title">
        <div>
          <div>Daily Reports</div>
          <div className="text-muted text-sm fw-500" style={{ marginTop: '0.25rem' }}>
            <Clipboard size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
            Plant activity summary for the selected date
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            style={{ cursor: 'pointer' }}
          />
          <button className="btn btn-outline">
            <FileDown size={15} />
            Download PDF
          </button>
        </div>
      </header>

      {/* ── Row 1: Stock summary cards ── */}
      <div className="bento bento-3">
        <StockCard title="Opening Stock" icon={Package} data={stockData.opening} variant="light" />
        <StockCard title="Production" icon={FlaskConical} data={stockData.production} variant="green" />
        <StockCard title="Closing Stock" icon={CheckCircle2} data={stockData.closing} variant="dark" />
      </div>

      {/* ── Row 2: Activity Log ── */}
      <ActivityLog />

      {/* ── Row 3: YP Consumption + Dispatch ── */}
      <div className="bento bento-2">
        <YpConsumptionDonut />
        <DispatchSummary />
      </div>
    </div>
  );
};

export default Reports;
