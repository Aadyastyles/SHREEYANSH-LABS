import React from 'react';

// Custom GlassBar with fading gradient, diagonal stripes, and hover glow
const GlassBar = (props) => {
  const { x, y, width, height, payload, activeBarKey, dataKey } = props;
  
  if (height === undefined || height < 0) return null; // Avoid rendering empty bars

  const isHovered = activeBarKey === payload.label;
  const isFaded = activeBarKey && !isHovered;
  const chemKey = dataKey.toLowerCase();
  
  return (
    <g style={{ transition: 'all 0.3s ease', opacity: isFaded ? 0.4 : 1 }}>
      {/* Glow shadow for active bar */}
      {isHovered && (
        <rect 
          x={x} y={y} width={width} height={height} rx={3}
          fill={`var(--color-chem-${chemKey})`}
          style={{ filter: `blur(8px)`, opacity: 0.5 }}
        />
      )}
      
      {/* Base Fade Gradient */}
      <rect 
        x={x} y={y} width={width} height={height} rx={3}
        fill={`url(#grad-${chemKey})`}
        opacity={isHovered ? 1 : 0.85}
        style={{ transition: 'opacity 0.3s ease' }}
      />
      
      {/* Diagonal Stripe Overlay */}
      <rect 
        x={x} y={y} width={width} height={height} rx={3}
        fill="url(#diagonal-stripe)"
        opacity={isHovered ? 0.6 : 0.2}
        style={{ transition: 'opacity 0.3s ease' }}
      />
    </g>
  );
};

export default GlassBar;
