import React from 'react';

const TelemetryPanel = ({ telemetry }) => {
  // Simple logic to mock "previous" reading for demo purposes since we only poll current
  const prevTemp = telemetry?.temp ? telemetry.temp - 1.2 : '--';
  const status = telemetry?.temp > 160 ? 'WARNING' : 'NORMAL';
  const statusColor = status === 'WARNING' ? '#ef4444' : '#22c55e';

  return (
    <div style={{
      width: '300px',
      background: '#1e293b',
      border: '2px solid #ef4444',
      borderRadius: '4px',
      color: '#f8fafc',
      fontFamily: 'monospace',
      boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    }}>
      <div style={{ background: '#ef4444', color: '#fff', padding: '5px 10px', fontWeight: 'bold', fontSize: '14px' }}>
        SYSTEM ALERTS & TELEMETRY
      </div>
      
      <div style={{ padding: '10px' }}>
        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#94a3b8' }}>Last Updated: Just now (30m sync)</div>
        
        <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '4px' }}>Param</th>
              <th style={{ padding: '4px' }}>Current</th>
              <th style={{ padding: '4px' }}>Prev</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '4px' }}>R-02 TIT</td>
              <td style={{ padding: '4px', color: '#ef4444', fontWeight: 'bold' }}>{telemetry?.temp}°C</td>
              <td style={{ padding: '4px', color: '#94a3b8' }}>{prevTemp}°C</td>
            </tr>
            <tr>
              <td style={{ padding: '4px' }}>R-02 PIT</td>
              <td style={{ padding: '4px', color: '#3b82f6', fontWeight: 'bold' }}>{telemetry?.pressure} bar</td>
              <td style={{ padding: '4px', color: '#94a3b8' }}>2.0 bar</td>
            </tr>
          </tbody>
        </table>
        
        <div style={{ marginTop: '15px', padding: '10px', background: '#0f172a', borderLeft: `4px solid ${statusColor}` }}>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>PROCESS STATUS</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: statusColor }}>{status}</div>
        </div>

        <div style={{ marginTop: '10px', padding: '10px', background: '#0f172a', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ fontSize: '10px', color: '#94a3b8' }}>EST. BATCH OUTPUT (R-02)</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#3b82f6' }}>04h : 20m remaining</div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryPanel;
