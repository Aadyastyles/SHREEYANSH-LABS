import React from 'react';

const BulkTank = ({ width = 160, height = 80, label = "Bulk Tank", capacity = "", style = {} }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="bulk-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2e7d32" />
          <stop offset="30%" stopColor="#4caf50" />
          <stop offset="85%" stopColor="#1b5e20" />
          <stop offset="100%" stopColor="#0a3311" />
        </linearGradient>
        
        {/* Grey tank version for POCl3 */}
        <linearGradient id="bulk-grad-grey" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a7a7a" />
          <stop offset="30%" stopColor="#a3a3a3" />
          <stop offset="85%" stopColor="#525252" />
          <stop offset="100%" stopColor="#292929" />
        </linearGradient>
      </defs>
      
      {/* Supports (Saddles) */}
      <path d="M30,65 L30,80 L40,80 L40,65 Z" fill="#475569" />
      <path d="M25,78 L45,78 L45,80 L25,80 Z" fill="#1e293b" />
      
      <path d="M120,65 L120,80 L130,80 L130,65 Z" fill="#475569" />
      <path d="M115,78 L135,78 L135,80 L115,80 Z" fill="#1e293b" />

      {/* Main Tank Body (Horizontal) */}
      <rect x="20" y="10" width="120" height="55" fill={label.includes('POCL3') ? "url(#bulk-grad-grey)" : "url(#bulk-grad)"} />
      
      {/* Left rounded end */}
      <path d="M20,10 C5,10 5,65 20,65 Z" fill={label.includes('POCL3') ? "url(#bulk-grad-grey)" : "url(#bulk-grad)"} stroke="#111" strokeWidth="0.5" />
      <path d="M20,10 L20,65" stroke="#111" strokeWidth="0.5" opacity="0.3" />
      
      {/* Right rounded end */}
      <path d="M140,10 C155,10 155,65 140,65 Z" fill={label.includes('POCL3') ? "url(#bulk-grad-grey)" : "url(#bulk-grad)"} stroke="#111" strokeWidth="0.5" />
      <path d="M140,10 L140,65" stroke="#111" strokeWidth="0.5" opacity="0.3" />
      
      {/* Labeling matching the reference style */}
      <text x="80" y="35" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" fill={label.includes('POCL3') ? "#fff" : "#111"} textAnchor="middle">
        {label}
      </text>
      {capacity && (
        <text x="80" y="50" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif" fill={label.includes('POCL3') ? "#fff" : "#111"} textAnchor="middle">
          {capacity}
        </text>
      )}
    </svg>
  );
};

export default BulkTank;
