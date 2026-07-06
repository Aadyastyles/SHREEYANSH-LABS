import React from 'react';

const ScadaMimic = ({ telemetry }) => {
  // --- COLOR PALETTE ---
  const colors = {
    bg: '#f8fafc',
    floor: '#cbd5e1',
    wall: '#94a3b8',
    yp: '#eab308',
    ypLight: '#fde047',
    cl2: '#84cc16',
    cl2Light: '#bef264',
    pcl3: '#3b82f6',
    pcl3Light: '#93c5fd',
    steam: '#ef4444',
    water: '#06b6d4',
    steel: '#94a3b8',
    steelDark: '#475569',
    text: '#1e293b'
  };

  // --- SVG HELPERS ---
  const Floor = ({ y, label, labelY }) => (
    <g>
      <rect x="0" y={y} width="2200" height="15" fill={colors.floor} />
      <rect x="0" y={y + 15} width="2200" height="5" fill="#94a3b8" />
      <text x="20" y={labelY} fontSize="24" fill={colors.text} fontWeight="900" letterSpacing="2">{label}</text>
    </g>
  );

  const PipeLine = ({ d, color, width = 6, dash = "0" }) => (
    <g>
      <path d={d} fill="none" stroke={colors.steelDark} strokeWidth={width + 4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dash} />
    </g>
  );

  const Valve = ({ x, y, rotation = 0 }) => (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <polygon points="-8,-6 -8,6 0,0" fill="#22c55e" stroke="#111" strokeWidth="1" />
      <polygon points="8,-6 8,6 0,0" fill="#22c55e" stroke="#111" strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="-12" stroke="#111" strokeWidth="2" />
      <line x1="-5" y1="-12" x2="5" y2="-12" stroke="#111" strokeWidth="2" />
    </g>
  );

  const Pump = ({ x, y, label }) => (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="0" cy="0" r="16" fill={colors.steel} stroke="#111" strokeWidth="2" />
      <circle cx="0" cy="0" r="8" fill="#22c55e" />
      <rect x="-4" y="-20" width="8" height="4" fill="#111" />
      <rect x="16" y="-4" width="4" height="8" fill="#111" />
      <text x="0" y="30" fontSize="12" fill={colors.text} fontWeight="bold" textAnchor="middle">{label}</text>
    </g>
  );

  const YPDrum = ({ x, y }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="20" height="30" rx="2" fill="url(#yp-grad)" stroke="#333" strokeWidth="1" />
      <line x1="0" y1="5" x2="20" y2="5" stroke="#333" strokeWidth="0.5" />
      <line x1="0" y1="25" x2="20" y2="25" stroke="#333" strokeWidth="0.5" />
      <text x="10" y="18" fontSize="8" fill="#333" fontWeight="bold" textAnchor="middle">YP</text>
    </g>
  );

  const Cylinder = ({ x, y }) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="10" width="24" height="60" fill="url(#cl2-grad)" stroke="#333" strokeWidth="1.5" />
      <path d="M0,10 C0,-5 24,-5 24,10 Z" fill="url(#cl2-grad)" stroke="#333" strokeWidth="1.5" />
      <rect x="8" y="-5" width="8" height="5" fill="#333" />
      <circle cx="12" cy="-5" r="3" fill="#666" />
    </g>
  );

  // --- RENDER ---
  return (
    <svg width="100%" height="100%" viewBox="0 0 2200 1100" style={{ background: colors.bg, fontFamily: 'sans-serif' }}>
      <defs>
        <linearGradient id="yp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.yp} />
          <stop offset="50%" stopColor={colors.ypLight} />
          <stop offset="100%" stopColor={colors.yp} />
        </linearGradient>
        <linearGradient id="cl2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.cl2} />
          <stop offset="50%" stopColor={colors.cl2Light} />
          <stop offset="100%" stopColor={colors.cl2} />
        </linearGradient>
        <linearGradient id="pcl3-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.pcl3} />
          <stop offset="50%" stopColor={colors.pcl3Light} />
          <stop offset="100%" stopColor={colors.pcl3} />
        </linearGradient>
        <linearGradient id="steel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.steelDark} />
          <stop offset="30%" stopColor="#e2e8f0" />
          <stop offset="85%" stopColor={colors.steel} />
          <stop offset="100%" stopColor={colors.steelDark} />
        </linearGradient>
        <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* --- INFRASTRUCTURE (FLOORS) --- */}
      <Floor y={950} label="GROUND FLOOR (GF)" labelY={990} />
      <Floor y={650} label="FIRST FLOOR (OPERATING)" labelY={690} />
      <Floor y={350} label="SECOND FLOOR (RECEIVERS)" labelY={390} />
      <Floor y={150} label="TERRACE (CONDENSATION)" labelY={190} />

      {/* Title */}
      <text x="20" y="40" fontSize="36" fill={colors.text} fontWeight="900" letterSpacing="1">SHREEYANSH LABS</text>
      <text x="20" y="70" fontSize="22" fill={colors.text} fontWeight="bold">PCL3 Unit-2 Definitive Structural Process Layout</text>

      {/* --- PIPING LAYER (Background) --- */}
      {/* Steam Line */}
      <PipeLine d="M 40,480 L 1500,480" color={colors.steam} />
      
      {/* YP Transfer Line (GF -> Reactors) */}
      <PipeLine d="M 350,910 L 350,930 L 600,930 L 600,800 L 1560,800" color={colors.yp} />
      
      {/* Cl2 Gas Main Header (First Floor) */}
      <PipeLine d="M 520,600 L 520,440 L 1600,440" color={colors.cl2} />
      
      {/* Vent Header */}
      <PipeLine d="M 650,400 L 1600,400" color={colors.steel} width={4} dash="5,5" />

      {/* PCL3 Vapor Header (First Floor -> Terrace) */}
      <PipeLine d="M 750,330 L 1800,330 L 1800,120 L 1850,120" color={colors.pcl3} />

      {/* Condensed PCL3 Liquid Line (Terrace -> Second Floor) */}
      <PipeLine d="M 1950,140 L 1950,220 L 1400,220 L 1400,240" color={colors.pcl3} />

      {/* --- GROUND FLOOR COMPONENTS --- */}
      {/* 1. YP Melting Box & Storage */}
      <g transform="translate(40, 840)">
        <text x="60" y="-10" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">YP MELTING DRUMS</text>
        <rect x="0" y="0" width="120" height="110" fill="none" stroke={colors.steelDark} strokeWidth="6" />
        <rect x="0" y="40" width="120" height="70" fill={colors.yp} opacity="0.4" />
        <YPDrum x="10" y="70" />
        <YPDrum x="45" y="70" />
        <YPDrum x="80" y="70" />
        {/* Steam Coil */}
        <path d="M -10,90 L 130,90" stroke={colors.steam} strokeWidth="4" fill="none" />
        <text x="-35" y="94" fontSize="12" fill={colors.steam} fontWeight="bold">STEAM</text>
      </g>
      
      <PipeLine d="M 160,930 L 220,930" color={colors.yp} />
      <Pump x="220" y="930" label="SUCTION" />
      <PipeLine d="M 220,930 L 270,930 L 270,890 L 290,890" color={colors.yp} />

      <g transform="translate(290, 810)">
        <rect x="0" y="20" width="180" height="100" rx="50" fill="url(#steel-grad)" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
        <rect x="10" y="30" width="160" height="80" rx="40" fill={colors.yp} opacity="0.6" />
        {/* Support Legs */}
        <rect x="40" y="118" width="10" height="22" fill={colors.steelDark} />
        <rect x="130" y="118" width="10" height="22" fill={colors.steelDark} />
        <text x="90" y="70" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">YP STORAGE TANK</text>
        <text x="90" y="85" fontSize="12" fill={colors.text} textAnchor="middle">(8 KL, GROUND FLOOR)</text>
      </g>

      {/* 2. Chlorine Vaporization */}
      <g transform="translate(520, 750)">
        <text x="40" y="-10" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">CHLORINE TONNERS</text>
        <Cylinder x="0" y="0" />
        <Cylinder x="30" y="0" />
        <Cylinder x="60" y="0" />
        <PipeLine d="M 12,-10 L 12,-30 L 140,-30" color={colors.cl2} />
        <PipeLine d="M 42,-10 L 42,-30" color={colors.cl2} />
        <PipeLine d="M 72,-10 L 72,-30" color={colors.cl2} />
      </g>

      <g transform="translate(680, 700)">
        <rect x="0" y="20" width="80" height="180" rx="10" fill="url(#steel-grad)" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
        {/* Steam Jacket */}
        <path d="M -8,50 L -8,170 C -8,190 88,190 88,170 L 88,50 Z" fill={colors.steam} opacity="0.2" stroke={colors.steam} strokeWidth="2" />
        <text x="40" y="100" fontSize="12" fill={colors.text} fontWeight="bold" textAnchor="middle">Cl2 VAPOR</text>
        <text x="40" y="115" fontSize="12" fill={colors.text} fontWeight="bold" textAnchor="middle">CONVERSION</text>
        {/* Legs */}
        <rect x="15" y="198" width="10" height="52" fill={colors.steelDark} />
        <rect x="55" y="198" width="10" height="52" fill={colors.steelDark} />
        <PipeLine d="M -8,160 L -40,160 L -40,260 L -640,260 L -640,-220" color={colors.steam} /> {/* Steam feed from main header */}
        <Valve x="-20" y="160" />
        <PipeLine d="M 40,20 L 40,-100" color={colors.cl2} /> {/* Cl2 Gas to Header */}
      </g>

      {/* --- REACTOR SECTION (Spanning GF to FF) --- */}
      {/* 
        R1: 850
        R2: 1050
        R3: 1250
        R4: 1450
        R5 (12KL): 1700
      */}
      {[
        { id: 1, x: 900, size: '3KL', state: 'STANDBY / NON-WORKING', active: false, w: 120, h: 250 },
        { id: 2, x: 1100, size: '3KL', state: 'WORKING', active: true, w: 120, h: 250, temp: telemetry?.temp, pres: telemetry?.pressure },
        { id: 3, x: 1300, size: '6KL', state: 'WORKING', active: true, w: 140, h: 280, temp: telemetry?.temp ? telemetry.temp + 2 : null, pres: 2.3 },
        { id: 4, x: 1500, size: '6KL', state: 'WORKING', active: true, w: 140, h: 280, temp: telemetry?.temp ? telemetry.temp + 4 : null, pres: 2.1 },
        { id: 5, x: 1750, size: '12KL', state: 'WORKING', active: true, w: 180, h: 320, temp: telemetry?.temp ? telemetry.temp + 5 : null, pres: 2.2 }
      ].map(r => (
        <g key={`reactor-${r.id}`} transform={`translate(${r.x}, ${950 - r.h})`}>
          {/* Reactor Body */}
          <rect x={-r.w/2} y="0" width={r.w} height={r.h - 40} fill="url(#steel-grad)" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
          {/* Bottom Curve */}
          <path d={`M ${-r.w/2},${r.h - 40} C ${-r.w/2},${r.h + 20} ${r.w/2},${r.h + 20} ${r.w/2},${r.h - 40} Z`} fill="url(#steel-grad)" stroke="#333" strokeWidth="2" />
          {/* Top Dome (Poking through FF at y=650 -> Local y depends on r.h) */}
          <path d={`M ${-r.w/2},0 C ${-r.w/2},${-r.w/2} ${r.w/2},${-r.w/2} ${r.w/2},0 Z`} fill="url(#steel-grad)" stroke="#333" strokeWidth="2" />
          
          {/* Cooling Jacket */}
          <path d={`M ${-r.w/2 - 8},30 L ${-r.w/2 - 8},${r.h - 20} C ${-r.w/2 - 8},${r.h + 30} ${r.w/2 + 8},${r.h + 30} ${r.w/2 + 8},${r.h - 20} L ${r.w/2 + 8},30 Z`} fill={colors.water} opacity="0.3" stroke={colors.water} strokeWidth="2" />

          {/* Legs */}
          <rect x={-r.w/2 + 20} y={r.h - 10} width="12" height="50" fill={colors.steelDark} />
          <rect x={r.w/2 - 32} y={r.h - 10} width="12" height="50" fill={colors.steelDark} />

          {/* Labels */}
          <text x="0" y={r.h/2} fontSize="20" fill={colors.text} fontWeight="900" textAnchor="middle">VS{r.id}</text>
          <text x="0" y={r.h/2 + 20} fontSize="12" fill={colors.text} fontWeight="bold" textAnchor="middle">{r.size}</text>
          <text x="0" y={r.h/2 + 40} fontSize="10" fill={colors.text} fontWeight="bold" textAnchor="middle">{r.state}</text>

          {/* Liquid PCL3 Level (if active) */}
          {r.active && (
            <path d={`M ${-r.w/2 + 2},${r.h - 40} C ${-r.w/2 + 2},${r.h + 18} ${r.w/2 - 2},${r.h + 18} ${r.w/2 - 2},${r.h - 40} L ${r.w/2 - 2},${r.h/2 + 30} L ${-r.w/2 + 2},${r.h/2 + 30} Z`} fill={colors.pcl3} opacity="0.6" />
          )}

          {/* --- NOZZLES & PIPING CONNECTIONS (Dome Level) --- */}
          <g transform={`translate(0, ${-r.w/4})`}>
            {/* Cl2 Inlets (3 distinct lines) */}
            <PipeLine d={`M ${-r.w/4},0 L ${-r.w/4},-80`} color={colors.cl2} width={2} />
            <PipeLine d={`M 0,0 L 0,-80`} color={colors.cl2} width={2} />
            <PipeLine d={`M ${r.w/4},0 L ${r.w/4},-80`} color={colors.cl2} width={2} />
            
            {/* Cl2 Header Connection */}
            <PipeLine d={`M 0,-80 L ${-r.x + 520},-80`} color={colors.cl2} />
            
            {/* Vent Line */}
            <PipeLine d={`M ${r.w/2 - 10},10 L ${r.w/2 - 10},-40 L ${-r.x + 650},-40`} color={colors.steel} width={2} dash="4,4" />

            {/* Rotameters / Gauges on Cl2 lines */}
            <rect x="-6" y="-60" width="12" height="24" fill="#fff" stroke="#333" />
            <circle cx="-6" cy="-48" r="6" fill="#fff" stroke="#333" />
            <text x="-6" y="-45" fontSize="8" fill="#111" textAnchor="middle" fontWeight="bold">PI</text>
          </g>

          {/* Vapor Outlet (Top Center) */}
          <PipeLine d={`M 0,${-r.w/2} L 0,${-r.w/2 - 40} L ${-r.x + 750},${-r.w/2 - 40}`} color={colors.pcl3} />

          {/* YP Feed Inlet (Bottom/Side) */}
          <PipeLine d={`M ${-r.w/2 - 8},${r.h - 100} L ${-r.w/2 - 40},${r.h - 100} L ${-r.w/2 - 40},${r.h - 150}`} color={colors.yp} />
          <Valve x={-r.w/2 - 25} y={r.h - 100} />

          {/* Liquid Output (Bottom) */}
          <PipeLine d={`M 0,${r.h + 15} L 0,${r.h + 50} L ${-r.x + 1950},${r.h + 50}`} color={colors.pcl3} />
          <Valve x="0" y={r.h + 30} rotation={90} />

          {/* Live Telemetry Display */}
          {r.active && (
            <g transform={`translate(${r.w/2 + 20}, -50)`}>
              <rect x="0" y="0" width="50" height="40" fill="#1e293b" rx="4" />
              <text x="25" y="15" fontSize="10" fill="#ef4444" fontWeight="bold" textAnchor="middle">TIT {r.temp}°</text>
              <text x="25" y="30" fontSize="10" fill="#3b82f6" fontWeight="bold" textAnchor="middle">PIT {r.pres}</text>
              <line x1="-20" y1="20" x2="0" y2="20" stroke="#1e293b" strokeWidth="2" />
            </g>
          )}
        </g>
      ))}

      {/* --- TERRACE (Condensation) --- */}
      <g transform="translate(1800, 50)">
        <text x="100" y="-10" fontSize="16" fill={colors.text} fontWeight="bold" textAnchor="middle">COOLING COIL CONDENSATION LINES</text>
        {/* Cooling Coils */}
        <path d="M 50,70 L 250,70 A 20 20 0 0 1 270,90 A 20 20 0 0 1 250,110 L 50,110 A 20 20 0 0 0 30,130 A 20 20 0 0 0 50,150 L 250,150" fill="none" stroke={colors.pcl3} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 50,70 L 250,70 A 20 20 0 0 1 270,90 A 20 20 0 0 1 250,110 L 50,110 A 20 20 0 0 0 30,130 A 20 20 0 0 0 50,150 L 250,150" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        
        {/* Continuous Water Spray */}
        <PipeLine d="M 50,0 L 250,0" color={colors.water} width={4} />
        {[50, 100, 150, 200, 250].map(x => (
          <g key={`spray-${x}`} transform={`translate(${x}, 0)`}>
            <polygon points="-10,30 10,30 0,0" fill={colors.water} opacity="0.5" />
            <line x1="0" y1="0" x2="0" y2="10" stroke={colors.water} strokeWidth="2" />
          </g>
        ))}
        
        {/* Coil Outlets to Receiver */}
        <PipeLine d="M 250,150 L 250,170 L 150,170" color={colors.pcl3} />
      </g>

      {/* --- SECOND FLOOR (Receivers) --- */}
      <g transform="translate(1300, 200)">
        <text x="200" y="-10" fontSize="16" fill={colors.text} fontWeight="bold" textAnchor="middle">PCL3 RECEIVER TANKS</text>
        {/* Common Feed Header */}
        <PipeLine d="M 100,40 L 420,40" color={colors.pcl3} />
        
        {/* ST-01 to ST-04 */}
        {[0, 100, 200, 300].map((x, i) => (
          <g key={`st-${i}`} transform={`translate(${x + 60}, 50)`}>
            <PipeLine d="M 40,-10 L 40,10" color={colors.pcl3} /> {/* Drop from header */}
            <Valve x="40" y="0" />
            <rect x="0" y="10" width="80" height="90" rx="10" fill="url(#steel-grad)" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
            {/* Liquid Level */}
            <rect x="2" y="50" width="76" height="48" rx="8" fill={colors.pcl3} opacity="0.6" />
            <text x="40" y="120" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">ST-0{i+1}</text>
            <text x="40" y="135" fontSize="10" fill={colors.text} textAnchor="middle">(2 KL)</text>
            
            {/* Drain to Bulk */}
            <PipeLine d={`M 40,100 L 40,130 L ${160 - x},130 L ${160 - x},700`} color={colors.pcl3} />
            <Valve x="40" y="115" rotation={90} />
          </g>
        ))}
        
        {/* ST-05 (6KL Horizontal) */}
        <g transform="translate(480, 50)">
          <PipeLine d="M 80,-10 L 80,20" color={colors.pcl3} />
          <rect x="0" y="20" width="160" height="80" rx="40" fill="url(#steel-grad)" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
          <rect x="40" y="30" width="80" height="60" rx="20" fill={colors.pcl3} opacity="0.6" />
          <text x="80" y="120" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">ST-05 (6 KL)</text>
          {/* Drain to Bulk */}
          <PipeLine d="M 80,100 L 80,700" color={colors.pcl3} />
        </g>
      </g>

      {/* --- GROUND FLOOR (Bulk Storage & Dispatch) --- */}
      <g transform="translate(1450, 750)">
        <text x="180" y="-10" fontSize="16" fill={colors.text} fontWeight="bold" textAnchor="middle">PCL3 BULK STORAGE & DISPATCH</text>
        
        {/* Tank 1 (20KL) */}
        <g transform="translate(0, 30)">
          <rect x="0" y="0" width="160" height="100" rx="50" fill={colors.pcl3Light} stroke="#333" strokeWidth="2" filter="url(#shadow)" />
          <rect x="10" y="20" width="140" height="60" rx="30" fill={colors.pcl3} opacity="0.6" />
          <rect x="30" y="98" width="12" height="72" fill={colors.steelDark} />
          <rect x="118" y="98" width="12" height="72" fill={colors.steelDark} />
          <text x="80" y="130" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">BULK TANK 1</text>
          <text x="80" y="150" fontSize="12" fill={colors.text} textAnchor="middle">(20 KL)</text>
        </g>

        {/* Tank 2 (20KL) */}
        <g transform="translate(200, 30)">
          <rect x="0" y="0" width="160" height="100" rx="50" fill={colors.pcl3Light} stroke="#333" strokeWidth="2" filter="url(#shadow)" />
          <rect x="10" y="20" width="140" height="60" rx="30" fill={colors.pcl3} opacity="0.6" />
          <rect x="30" y="98" width="12" height="72" fill={colors.steelDark} />
          <rect x="118" y="98" width="12" height="72" fill={colors.steelDark} />
          <text x="80" y="130" fontSize="14" fill={colors.text} fontWeight="bold" textAnchor="middle">BULK TANK 2</text>
          <text x="80" y="150" fontSize="12" fill={colors.text} textAnchor="middle">(20 KL)</text>
        </g>

        {/* Dispatch Manifold */}
        <PipeLine d="M 50,170 L 50,230 L 450,230" color={colors.pcl3} />
        <PipeLine d="M 250,170 L 250,230" color={colors.pcl3} />
        <Valve x="50" y="200" rotation={90} />
        <Valve x="250" y="200" rotation={90} />
        
        <text x="500" y="235" fontSize="16" fill={colors.text} fontWeight="bold">TO LORRY / DRUM DISPATCH</text>
      </g>

      {/* --- TELEMETRY LOG BOOK DESK (First Floor) --- */}
      <g transform="translate(650, 560)">
        <rect x="0" y="0" width="120" height="90" fill="#fff" stroke="#333" strokeWidth="2" filter="url(#shadow)" />
        <rect x="0" y="0" width="120" height="20" fill={colors.steelDark} />
        <text x="60" y="14" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">OPERATOR LOG BOOK</text>
        <text x="10" y="35" fontSize="9" fill={colors.text}>R-02 TIT: <tspan fill={colors.steam} fontWeight="bold">{telemetry?.temp}°C</tspan></text>
        <text x="10" y="50" fontSize="9" fill={colors.text}>R-02 PIT: <tspan fill={colors.pcl3} fontWeight="bold">{telemetry?.pressure} bar</tspan></text>
        <text x="10" y="65" fontSize="9" fill={colors.text}>BATCH TIME: 2h 15m</text>
        <text x="10" y="80" fontSize="9" fill={colors.text}>STATUS: <tspan fill="#22c55e" fontWeight="bold">NORMAL</tspan></text>
      </g>

    </svg>
  );
};

export default ScadaMimic;
