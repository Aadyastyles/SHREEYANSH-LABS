import React from 'react';

const Cl2Cylinder = ({ width = 40, height = 120, label = "", style = {} }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id="cl2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4c82c" />
          <stop offset="25%" stopColor="#f7ea36" />
          <stop offset="85%" stopColor="#b3a71b" />
          <stop offset="100%" stopColor="#756d11" />
        </linearGradient>
      </defs>
      
      {/* Cylinder body */}
      <path d="M5,20 L5,110 C5,115.5 15,120 20,120 C25,120 35,115.5 35,110 L35,20 C35,10 25,5 20,5 C15,5 5,10 5,20 Z" fill="url(#cl2-grad)" stroke="#444" strokeWidth="0.5" />
      
      {/* Neck ring and valve */}
      <rect x="17" y="2" width="6" height="4" fill="#666" />
      <rect x="15" y="0" width="10" height="2" fill="#333" />
      
      {/* Safety cap (optional, shown in reference image as a small brown/bronze knob) */}
      <rect x="18" y="0" width="4" height="6" fill="#8b5a2b" />
      
      {label && (
        <text x="20" y="60" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#555" textAnchor="middle">
          {label}
        </text>
      )}
    </svg>
  );
};

export default Cl2Cylinder;
