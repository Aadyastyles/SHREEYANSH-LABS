import React from 'react';
import InstrumentTag from './InstrumentTag';

const Reactor = ({ width = 120, height = 240, label = "Reactor", temp = null, pressure = null, style = {} }) => {
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="reactor-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4d4d4" />
            <stop offset="30%" stopColor="#f5f5f5" />
            <stop offset="85%" stopColor="#a3a3a3" />
            <stop offset="100%" stopColor="#525252" />
          </linearGradient>
          <linearGradient id="jacket-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="85%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
        </defs>
        
        {/* Cooling Jacket (Outer) */}
        <path d="M15,60 L15,180 C15,200 105,200 105,180 L105,60 Z" fill="url(#jacket-grad)" opacity="0.3" />
        <path d="M15,60 C15,50 105,50 105,60" fill="none" stroke="#1e3a8a" strokeWidth="2" opacity="0.3" />
        
        {/* Main Reactor Body */}
        <path d="M25,40 L25,190 C25,215 95,215 95,190 L95,40 Z" fill="url(#reactor-grad)" />
        
        {/* Top Dome */}
        <path d="M25,40 C25,10 95,10 95,40 Z" fill="url(#reactor-grad)" />
        
        {/* Top Flange */}
        <rect x="22" y="38" width="76" height="4" fill="#737373" />
        
        {/* Top Inlets */}
        <rect x="40" y="5" width="8" height="15" fill="#737373" />
        <rect x="72" y="5" width="8" height="15" fill="#737373" />
        
        {/* Agitator Motor Outline (as per reference, minimal) */}
        <rect x="52" y="0" width="16" height="15" fill="#525252" />
        
      </svg>

      {/* Telemetry Overlays */}
      {temp !== null && (
        <InstrumentTag 
          type="TIT" 
          value={temp} 
          color="#EF4444" 
          style={{ position: 'absolute', top: '40%', left: '-10px' }} 
        />
      )}
      {pressure !== null && (
        <InstrumentTag 
          type="PIT" 
          value={pressure} 
          color="#3B82F6" 
          style={{ position: 'absolute', top: '55%', right: '-10px' }} 
        />
      )}
    </div>
  );
};

export default Reactor;
