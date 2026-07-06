import React from 'react';

const Pipe = ({ path, color = '#555', animated = false, style = {} }) => {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}>
      {/* Shadow */}
      <path
        d={path}
        stroke="#1E293B"
        strokeWidth={10}
        fill="none"
        style={{ opacity: 0.3, transform: 'translate(0px, 3px)' }}
      />
      {/* Main Pipe */}
      <path
        d={path}
        stroke={color}
        strokeWidth={8}
        fill="none"
        strokeDasharray={animated ? '10, 10' : 'none'}
      />
      {animated && (
        <style>
          {`
            @keyframes flow {
              from { stroke-dashoffset: 20; }
              to { stroke-dashoffset: 0; }
            }
          `}
        </style>
      )}
      {animated && (
        <path
          d={path}
          stroke={color}
          strokeWidth={8}
          fill="none"
          strokeDasharray="10, 10"
          style={{ animation: 'flow 1s linear infinite' }}
        />
      )}
      {/* 3D Highlight */}
      <path
        d={path}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
        style={{ opacity: 0.5, transform: 'translate(-1px, -1px)' }}
      />
    </svg>
  );
};

export default Pipe;
