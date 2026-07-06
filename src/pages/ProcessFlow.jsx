import React, { useState, useEffect } from 'react';
import ScadaMimic from '../components/scada/ScadaMimic';

const ProcessFlow = () => {
  const [telemetry, setTelemetry] = useState({ temp: 65, pressure: 2.1 });

  // Polling Firebase Telemetry every 30 minutes
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/get-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: '/plants/unit-2/reactors/R-01/telemetry' })
        });
        const json = await res.json();
        if (json.success && json.data) {
          setTelemetry(json.data);
        }
      } catch (e) {
        console.error('Firebase polling error:', e);
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 1800000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F1F5F9', overflow: 'hidden' }}>
      {/* TOP HEADER */}
      <div style={{ background: '#0F172A', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #334155', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/logo.png" alt="Shreeyansh Labs" style={{ height: 35, filter: 'brightness(0) invert(1)' }} />
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '1px' }}>
            SHREEYANSH LABS | PCL3 UNIT-2 DEFINITIVE SCADA
          </div>
        </div>
        <div style={{ color: '#94A3B8', fontSize: '0.8rem', fontWeight: 800 }}>LIVE FIREBASE TELEMETRY ACTIVE</div>
      </div>
      {/* TABS HEADER */}
      <div style={{ background: '#1e293b', padding: '0 20px', display: 'flex', gap: '5px', borderBottom: '1px solid #475569' }}>
        {['UNIT 1', 'UNIT 2', 'PCL3', 'PCL5', 'POCL3', 'OTHERS'].map((tab, idx) => (
          <div key={idx} style={{ 
            padding: '10px 20px', 
            background: tab === 'PCL3' ? '#334155' : 'transparent', 
            color: tab === 'PCL3' ? '#38bdf8' : '#94a3b8', 
            fontWeight: 'bold',
            fontSize: '12px',
            borderBottom: tab === 'PCL3' ? '3px solid #38bdf8' : '3px solid transparent',
            cursor: 'pointer'
          }}>
            {tab}
          </div>
        ))}
      </div>
      
      {/* SCADA MIMIC MONOLITHIC SVG CONTAINER */}
      <div style={{ flex: 1, padding: '10px', background: '#334155', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '100%', maxWidth: '1600px', position: 'relative', border: '1px solid #64748b' }}>
          <ScadaMimic telemetry={telemetry} />
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
