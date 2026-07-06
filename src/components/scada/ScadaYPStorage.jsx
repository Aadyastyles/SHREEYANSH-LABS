import React from 'react';

const ScadaYPStorage = ({ width = 140, height = 200 }) => {
  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width="100%" height="100%" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="yp-store-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="yp-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ca8a04" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>
        
        {/* Tank Body (Jacketed) */}
        <path d="M20,60 L20,180 C20,195 120,195 120,180 L120,60 Z" fill="url(#yp-store-grad)" stroke="#111" strokeWidth="1" />
        
        {/* Cutout showing internal YP liquid */}
        <path d="M30,120 L30,175 C30,185 110,185 110,175 L110,120 Z" fill="url(#yp-liquid)" opacity="0.8" />
        <path d="M30,120 C30,115 110,115 110,120" fill="url(#yp-liquid)" opacity="0.9" />
        
        {/* Top Dome */}
        <path d="M20,60 C20,20 120,20 120,60 Z" fill="url(#yp-store-grad)" stroke="#111" strokeWidth="1" />
        
        {/* Top Flange and Inlet Column (H2O Feed) */}
        <rect x="55" y="5" width="30" height="30" fill="#cbd5e1" stroke="#111" strokeWidth="1" />
        <rect x="50" y="35" width="40" height="6" fill="#475569" />
        
        {/* H2O displacement text */}
        <text x="70" y="20" fontSize="10" fill="#111" textAnchor="middle" fontWeight="bold">H₂O</text>
        
        {/* Tank Labels */}
        <text x="70" y="100" fontSize="14" fill="#111" textAnchor="middle" fontWeight="bold">YP Storage</text>
        <text x="70" y="115" fontSize="12" fill="#111" textAnchor="middle" fontWeight="bold">Tank (8 KL)</text>
      </svg>
    </div>
  );
};

export default ScadaYPStorage;
