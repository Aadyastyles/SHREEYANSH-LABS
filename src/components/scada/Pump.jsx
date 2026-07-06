import React from 'react';

const Pump = ({ width = 40, height = 40, label = "", running = false, style = {} }) => {
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pump-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#737373" />
            <stop offset="100%" stopColor="#404040" />
          </linearGradient>
        </defs>
        
        {/* Pump base */}
        <rect x="5" y="30" width="30" height="5" fill="#333" />
        
        {/* Pump body (circle) */}
        <circle cx="20" cy="20" r="15" fill="url(#pump-grad)" stroke="#111" strokeWidth="1" />
        
        {/* Impeller / inside spinning part */}
        <circle cx="20" cy="20" r="10" fill={running ? "#22c55e" : "#525252"} />
        <circle cx="20" cy="20" r="3" fill="#111" />
        
        {/* Inlet / Outlet */}
        <rect x="15" y="5" width="10" height="5" fill="#404040" />
        <rect x="35" y="15" width="5" height="10" fill="#404040" />
      </svg>
      {label && (
        <div style={{ position: 'absolute', bottom: '-15px', width: '100%', textAlign: 'center', fontSize: '0.5rem', fontWeight: 600, color: '#333' }}>
          {label}
        </div>
      )}
    </div>
  );
};

export default Pump;
