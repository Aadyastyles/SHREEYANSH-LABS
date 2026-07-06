import React from 'react';

const YPDrum = ({ width = 60, height = 90, label = "YP", style = {} }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        {/* 3D cylindrical gradient */}
        <linearGradient id="drum-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a017" />
          <stop offset="30%" stopColor="#f5d442" />
          <stop offset="85%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#8a670f" />
        </linearGradient>
      </defs>
      
      {/* Main body */}
      <path d="M5,10 L5,80 C5,85.5 27.5,90 30,90 C32.5,90 55,85.5 55,80 L55,10 Z" fill="url(#drum-grad)" />
      
      {/* Top lid/rim */}
      <ellipse cx="30" cy="10" rx="25" ry="5" fill="#f5d442" stroke="#444" strokeWidth="1" />
      
      {/* Ribs (strengthening rings) */}
      <ellipse cx="30" cy="30" rx="25" ry="5" fill="none" stroke="#444" strokeWidth="1" opacity="0.6" />
      <ellipse cx="30" cy="60" rx="25" ry="5" fill="none" stroke="#444" strokeWidth="1" opacity="0.6" />
      
      {/* Bottom rim shadow */}
      <ellipse cx="30" cy="80" rx="25" ry="5" fill="none" stroke="#444" strokeWidth="1" opacity="0.4" />
      
      {/* Label Box */}
      {label && (
        <>
          <rect x="15" y="40" width="30" height="15" fill="rgba(255, 255, 255, 0.7)" rx="2" />
          <text x="30" y="51" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif" fill="#333" textAnchor="middle">
            {label}
          </text>
        </>
      )}
    </svg>
  );
};

export default YPDrum;
