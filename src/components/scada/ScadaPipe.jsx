import React from 'react';

const ScadaPipe = ({ points, color = '#555', animated = false, width = 6 }) => {
  // Convert array of [x, y] coordinates into an SVG path string
  // For orthogonal pipes, we could add corner radius, but simple lines are ok for now
  const pathData = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ');

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
      {/* Outer shadow/border for 3D effect */}
      <path
        d={pathData}
        stroke="#1E293B"
        strokeWidth={width + 4}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Main Pipe Color */}
      <path
        d={pathData}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={animated ? '10, 10' : 'none'}
      />
      {animated && (
        <style>
          {`
            @keyframes pipeFlow {
              from { stroke-dashoffset: 20; }
              to { stroke-dashoffset: 0; }
            }
          `}
        </style>
      )}
      {animated && (
        <path
          d={pathData}
          stroke={color}
          strokeWidth={width}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="10, 10"
          style={{ animation: 'pipeFlow 1s linear infinite' }}
        />
      )}
      {/* 3D Highlight line */}
      <path
        d={pathData}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ opacity: 0.6, transform: 'translate(-1px, -1px)' }}
      />
    </svg>
  );
};

export default ScadaPipe;
