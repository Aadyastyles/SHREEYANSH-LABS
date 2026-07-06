import React from 'react';

const VaporizerTank = ({ width = 80, height = 160, label = "Vaporizer Tank", style = {} }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="vap-grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2e7d32" />
          <stop offset="30%" stopColor="#4caf50" />
          <stop offset="85%" stopColor="#1b5e20" />
          <stop offset="100%" stopColor="#0a3311" />
        </linearGradient>
        <linearGradient id="vap-grad-silver" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a3a3a3" />
          <stop offset="30%" stopColor="#e5e5e5" />
          <stop offset="85%" stopColor="#737373" />
          <stop offset="100%" stopColor="#404040" />
        </linearGradient>
      </defs>
      
      {/* Outer heating jacket (Silver) */}
      <path d="M5,40 L5,140 C5,155 75,155 75,140 L75,40 Z" fill="url(#vap-grad-silver)" />
      
      {/* Inner Green Tank */}
      <path d="M15,50 L15,135 C15,145 65,145 65,135 L65,50 Z" fill="url(#vap-grad-green)" />
      
      {/* Top Dome (Silver) */}
      <path d="M5,40 C5,15 75,15 75,40 Z" fill="url(#vap-grad-silver)" />
      
      {/* Top Flange */}
      <rect x="2" y="38" width="76" height="4" fill="#525252" />
      
      {/* Top Center Pipe Inlet */}
      <rect x="36" y="5" width="8" height="15" fill="#737373" />
      
      {/* Label inside tank */}
      {label && (
        <text x="40" y="100" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#fff" textAnchor="middle">
          {label.split(' ').map((line, i) => (
             <tspan x="40" dy={i === 0 ? 0 : 14} key={i}>{line}</tspan>
          ))}
        </text>
      )}
    </svg>
  );
};

export default VaporizerTank;
