import React from 'react';

const StorageTank = ({ width = 80, height = 180, label = "Tank", capacity = "", style = {} }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="st-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2e7d32" />
          <stop offset="30%" stopColor="#4caf50" />
          <stop offset="85%" stopColor="#1b5e20" />
          <stop offset="100%" stopColor="#0a3311" />
        </linearGradient>
      </defs>
      
      {/* Main Tank Body */}
      <path d="M10,30 L10,160 C10,175 70,175 70,160 L70,30 Z" fill="url(#st-grad)" />
      
      {/* Top Dome */}
      <path d="M10,30 C10,10 70,10 70,30 Z" fill="url(#st-grad)" />
      
      {/* Legs */}
      <rect x="20" y="165" width="6" height="15" fill="#475569" />
      <rect x="54" y="165" width="6" height="15" fill="#475569" />
      
      {/* Level Indicator Glass */}
      <rect x="35" y="50" width="10" height="90" fill="#fff" stroke="#111" />
      {/* Fake Liquid Level in Glass */}
      <rect x="36" y="80" width="8" height="59" fill="#ef4444" />
      {/* Ticks on glass */}
      {[...Array(9)].map((_, i) => (
        <line key={i} x1="30" y1={50 + i * 10} x2="35" y2={50 + i * 10} stroke="#111" strokeWidth="1" />
      ))}
      
      {/* Labels */}
      {label && (
        <text x="40" y="155" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#fff" textAnchor="middle">
          {label}
        </text>
      )}
      {capacity && (
        <text x="40" y="168" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#fff" textAnchor="middle">
          {capacity}
        </text>
      )}
    </svg>
  );
};

export default StorageTank;
