import React from 'react';

const Valve = ({ width = 30, height = 20, type = 'manual', open = true, style = {} }) => {
  const color = open ? '#22c55e' : '#ef4444'; // Green if open, Red if closed
  
  return (
    <div style={{ width, height, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Valve body (two triangles facing each other) */}
        <polygon points="0,5 0,15 15,10" fill={color} stroke="#111" strokeWidth="1" />
        <polygon points="30,5 30,15 15,10" fill={color} stroke="#111" strokeWidth="1" />
        
        {/* Valve stem and handle */}
        <line x1="15" y1="10" x2="15" y2="2" stroke="#111" strokeWidth="2" />
        
        {type === 'manual' ? (
          <line x1="10" y1="2" x2="20" y2="2" stroke="#111" strokeWidth="2" />
        ) : (
          <rect x="10" y="0" width="10" height="4" fill="#3b82f6" stroke="#111" strokeWidth="1" /> // Actuator box
        )}
      </svg>
    </div>
  );
};

export default Valve;
