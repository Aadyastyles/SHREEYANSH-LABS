import React from 'react';

const ScadaN2Tank = ({ width = 120, height = 60 }) => {
  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width="100%" height="100%" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="n2-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="30%" stopColor="#fbbf24" />
            <stop offset="85%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        
        <path d="M20,10 L100,10 L100,50 L20,50 Z" fill="url(#n2-grad)" />
        <path d="M20,10 C5,10 5,50 20,50 Z" fill="url(#n2-grad)" />
        <path d="M100,10 C115,10 115,50 100,50 Z" fill="url(#n2-grad)" />
        
        <text x="60" y="28" fontSize="10" fill="#111" textAnchor="middle" fontWeight="bold">Nitrogen (N₂)</text>
        <text x="60" y="40" fontSize="8" fill="#111" textAnchor="middle" fontWeight="bold">Gas Utilities</text>
      </svg>
    </div>
  );
};

export default ScadaN2Tank;
