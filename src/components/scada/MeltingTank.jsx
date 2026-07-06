import React from 'react';
import YPDrum from './YPDrum';
import InstrumentTag from './InstrumentTag';

const MeltingTank = ({ width = 240, height = 150, style = {} }) => {
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mt-bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#737373" />
            <stop offset="100%" stopColor="#404040" />
          </linearGradient>
          <linearGradient id="coil-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4d4d4" />
            <stop offset="50%" stopColor="#fff" />
            <stop offset="100%" stopColor="#d4d4d4" />
          </linearGradient>
        </defs>
        
        {/* Tank outer casing */}
        <path d="M10,20 L10,140 L230,140 L230,20 L210,20 L210,120 L30,120 L30,20 Z" fill="url(#mt-bg-grad)" stroke="#111" strokeWidth="1" />
        
        {/* Heat Plate (Red) */}
        <rect x="35" y="110" width="170" height="5" fill="#ef4444" />
        
        {/* Steam Coils (Silver) */}
        {[...Array(5)].map((_, i) => (
          <path key={i} d={`M35,${100 - (i * 15)} L205,${100 - (i * 15)}`} stroke="url(#coil-grad)" strokeWidth="6" strokeLinecap="round" />
        ))}
        
        {/* Pipes for steam */}
        <path d="M210,30 L230,30 L230,0" fill="none" stroke="#d4d4d4" strokeWidth="4" />
        <path d="M30,30 L10,30 L10,0" fill="none" stroke="#d4d4d4" strokeWidth="4" />
      </svg>
      
      {/* 3 Drums sitting inside */}
      <div style={{ position: 'absolute', left: '50px', top: '30px', display: 'flex', gap: '10px' }}>
        <YPDrum label="Drums" width={40} height={70} />
        <YPDrum label="Drums" width={40} height={70} />
        <YPDrum label="Drums" width={40} height={70} />
      </div>

    </div>
  );
};

export default MeltingTank;
