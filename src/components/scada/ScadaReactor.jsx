import React from 'react';
import InstrumentTag from './InstrumentTag';

const ScadaReactor = ({ id = "1", active = true, temp, pressure, width = 160, height = 300, style = {} }) => {
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 160 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`reactor-body-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id={`jacket-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          {/* Vapour Column Gradient */}
          <linearGradient id={`column-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* 1. Condensation Column (Top Right) */}
        <path d="M110,20 L110,70 L130,70 L130,20 Z" fill={`url(#column-grad-${id})`} stroke="#111" strokeWidth="1" />
        {/* Column flanges */}
        <rect x="105" y="15" width="30" height="5" fill="#64748b" stroke="#111" strokeWidth="1" />
        <rect x="105" y="70" width="30" height="5" fill="#64748b" stroke="#111" strokeWidth="1" />
        
        {/* Vapor line up (cyan) */}
        <path d="M120,15 L120,5 L160,5" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
        <text x="145" y="15" fontSize="8" fill="#111" fontWeight="bold">Vapor</text>

        {/* 2. Main Agitator Motor Assembly (Top Center) */}
        {active ? (
          <>
            <rect x="65" y="20" width="30" height="30" fill="#3b82f6" stroke="#111" strokeWidth="1" />
            <rect x="75" y="10" width="10" height="10" fill="#1d4ed8" />
            <path d="M80,50 L80,80" stroke="#111" strokeWidth="4" />
            {/* Spinning indicator */}
            <circle cx="80" cy="35" r="8" fill="#22c55e" />
          </>
        ) : (
          <>
            {/* Halted state - just blank flanges or grey motor */}
            <rect x="65" y="20" width="30" height="30" fill="#64748b" stroke="#111" strokeWidth="1" />
            <path d="M80,50 L80,80" stroke="#111" strokeWidth="4" />
          </>
        )}

        {/* 3. Inlets (Top Left) */}
        {/* YP Inlet */}
        <rect x="35" y="55" width="10" height="20" fill="#facc15" stroke="#111" strokeWidth="1" />
        <path d="M40,55 L40,30 L20,30" fill="none" stroke="#facc15" strokeWidth="4" />
        <text x="25" y="25" fontSize="8" fill="#111" fontWeight="bold">YP</text>

        {/* Cl2 Inlets (3 slim lines purging) */}
        <path d="M50,75 L50,45 L60,45 L60,0" fill="none" stroke="#ca8a04" strokeWidth="2" />
        <path d="M55,75 L55,40 L65,40 L65,0" fill="none" stroke="#ca8a04" strokeWidth="2" />
        <path d="M60,75 L60,35 L70,35 L70,0" fill="none" stroke="#ca8a04" strokeWidth="2" />

        {/* 4. Cooling Jacket (Outer Layer) */}
        <path d="M10,100 L10,260 C10,290 150,290 150,260 L150,100 Z" fill={`url(#jacket-grad-${id})`} opacity="0.3" />
        {/* Jacket boundaries */}
        <path d="M10,100 C10,90 150,90 150,100" fill="none" stroke="#1e3a8a" strokeWidth="2" opacity="0.5" />
        
        {/* Cooling Water In (Bottom Left) */}
        <path d="M10,240 L-10,240" fill="none" stroke="#3b82f6" strokeWidth="4" />
        {/* Cooling Water Out (Mid Left) */}
        <path d="M10,120 L-10,120" fill="none" stroke="#3b82f6" strokeWidth="4" />

        {/* 5. Main Reactor Vessel Body */}
        {/* Cylindrical section */}
        <path d="M25,80 L25,270 C25,300 135,300 135,270 L135,80 Z" fill={`url(#reactor-body-grad-${id})`} />
        {/* Top Dome */}
        <path d="M25,80 C25,40 135,40 135,80 Z" fill={`url(#reactor-body-grad-${id})`} />
        {/* Flange line */}
        <rect x="20" y="78" width="120" height="4" fill="#475569" stroke="#111" strokeWidth="1" />

        {/* 6. Vent Line (Right side dome) */}
        <path d="M130,85 L160,85" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <text x="145" y="80" fontSize="8" fill="#111" fontWeight="bold">Vent</text>

        {/* 7. Bottom Outlet (PCL3 Product) */}
        <rect x="70" y="285" width="20" height="15" fill="#64748b" stroke="#111" strokeWidth="1" />
        <path d="M80,300 L80,320" fill="none" stroke="#06b6d4" strokeWidth="6" />

        {/* Reactor Label */}
        <text x="80" y="160" fontSize="14" fill="#111" fontWeight="bold" textAnchor="middle">R-0{id}</text>
        <text x="80" y="175" fontSize="10" fill="#111" textAnchor="middle">({active ? 'WORKING' : 'HALTED'})</text>
      </svg>

      {/* Telemetry Overlays */}
      {active && temp !== undefined && (
        <InstrumentTag 
          type="TIT" 
          value={`${temp}°`} 
          color="#EF4444" 
          style={{ position: 'absolute', top: '50%', left: '-15px' }} 
        />
      )}
      {active && pressure !== undefined && (
        <InstrumentTag 
          type="PIT" 
          value={pressure} 
          color="#3B82F6" 
          style={{ position: 'absolute', top: '65%', right: '-5px' }} 
        />
      )}
    </div>
  );
};

export default ScadaReactor;
