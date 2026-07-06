import React from 'react';
import InstrumentTag from './InstrumentTag';

const ScadaReceiver = ({ id = "01", width = 80, height = 200, horizontal = false, capacity = "2 KL" }) => {
  if (horizontal) {
    // ST-05 (6KL horizontal receiver)
    return (
      <div style={{ position: 'relative', width: 200, height: 100 }}>
        <svg width="100%" height="100%" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`st-grad-h-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="30%" stopColor="#4ade80" />
              <stop offset="85%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          {/* Saddles */}
          <path d="M40,85 L40,100 L50,100 L50,85 Z" fill="#334155" />
          <path d="M150,85 L150,100 L160,100 L160,85 Z" fill="#334155" />
          {/* Tank */}
          <rect x="30" y="15" width="140" height="70" fill={`url(#st-grad-h-${id})`} />
          <path d="M30,15 C10,15 10,85 30,85 Z" fill={`url(#st-grad-h-${id})`} stroke="#111" strokeWidth="1" />
          <path d="M170,15 C190,15 190,85 170,85 Z" fill={`url(#st-grad-h-${id})`} stroke="#111" strokeWidth="1" />
          {/* Label */}
          <text x="100" y="50" fontSize="14" fill="#fff" fontWeight="bold" textAnchor="middle">PCL3 ST-0{id}</text>
          <text x="100" y="65" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">({capacity})</text>
        </svg>
      </div>
    );
  }

  // Vertical Receivers (ST-01 to ST-04)
  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width="100%" height="100%" viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`st-grad-v-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="30%" stopColor="#4ade80" />
            <stop offset="85%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
        </defs>
        
        {/* Legs */}
        <rect x="25" y="175" width="6" height="25" fill="#334155" />
        <rect x="49" y="175" width="6" height="25" fill="#334155" />
        
        {/* Body */}
        <path d="M15,30 L15,160 C15,180 65,180 65,160 L65,30 Z" fill={`url(#st-grad-v-${id})`} />
        <path d="M15,30 C15,10 65,10 65,30 Z" fill={`url(#st-grad-v-${id})`} />
        
        {/* Level Indicator Glass */}
        <rect x="35" y="40" width="10" height="100" fill="#fff" stroke="#111" strokeWidth="1" />
        <rect x="36" y="80" width="8" height="59" fill="#dc2626" />
        
        <text x="40" y="165" fontSize="12" fill="#fff" fontWeight="bold" textAnchor="middle">ST-0{id}</text>
        <text x="40" y="175" fontSize="8" fill="#fff" fontWeight="bold" textAnchor="middle">({capacity})</text>
      </svg>
    </div>
  );
};

export default ScadaReceiver;
