import React from 'react';

const BuildingBar = (props) => {
  const { y, height, active, index, payload, background, isAnyHovered } = props;
  
  if (!height || height <= 0 || !background) return null;

  const colX = background.x;
  const colWidth = background.width;
  const colY = background.y;
  const colHeight = background.height;
  const colRight = colX + colWidth;

  const barX = colX;
  const barWidth = colWidth * (5 / 6);
  const shadowWidth = colRight - (barX + barWidth);

  const isHovered = active === true;
  const isFaded = isAnyHovered && !isHovered;
  
  // Opacities
  const frontTopOpacity = 0.90; 
  const frontBottomOpacity = 0.15;
  const patternOpacity = isHovered ? 0.0 : 0.90; // 10% intensity reduction for grid lines
  
  // White layer border on hover (minimal thickness)
  const strokeColor = isHovered ? "#ffffff" : "transparent";
  const strokeWidthVal = isHovered ? 1 : 0;

  const baseColor = fill || "var(--color-chem-pcl3)"; 

  const gradId = `building-grad-front-${index}`;
  const fadeRightGradId = `building-grad-right-fade-${index}`;
  const patternId = `building-pattern-${index}`;
  const hoverGradId = `hover-col-grad-${index}`;
  const maskId = `fade-mask-${index}`;
  const maskGradId = `fade-mask-grad-${index}`;

  return (
    <g style={{ transition: 'all 0.3s ease', opacity: isFaded ? 0.4 : 1 }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={baseColor} stopOpacity={frontTopOpacity} />
          <stop offset="100%" stopColor={baseColor} stopOpacity={frontBottomOpacity} />
        </linearGradient>

        <linearGradient id={fadeRightGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0.10" />
          <stop offset="100%" stopColor="white" stopOpacity="0.25" />
        </linearGradient>

        {/* Diagonal stripes */}
        <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#ffffff" strokeWidth="2.5" strokeOpacity={patternOpacity} style={{ transition: 'stroke-opacity 0.3s ease' }} />
        </pattern>
        
        {/* Column Hover Background Gradient - projects UP from the bar to the text */}
        {isHovered && (
          <linearGradient id={hoverGradId} x1="0" y1={colY + colHeight} x2="0" y2={colY} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={baseColor} stopOpacity={0.25} />
            <stop offset="100%" stopColor={baseColor} stopOpacity={0.0} />
          </linearGradient>
        )}

        {/* Absolute Fade Mask - Rotated to create a left-corner splash/arch effect */}
        <linearGradient 
          id={maskGradId} 
          x1="0" y1={colY} x2="0" y2={colY + colHeight} 
          gradientUnits="userSpaceOnUse"
          gradientTransform={`rotate(-20, ${colX + colWidth/2}, ${colY + colHeight})`}
        >
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={maskId}>
          <rect x={colX} y={colY} width={colWidth} height={colHeight} fill={`url(#${maskGradId})`} />
        </mask>
      </defs>

      {/* Hover Shade projecting upwards from the perfectly traced top of the 3D bar */}
      {isHovered && y > colY && (
        <polygon 
          points={`
            ${colX},${colY} 
            ${colX + colWidth},${colY} 
            ${colX + colWidth},${Math.min(y + shadowWidth, y + height)} 
            ${barX + barWidth},${y} 
            ${colX},${y}
          `}
          fill={`url(#${hoverGradId})`} 
        />
      )}

      {/* Subtle background column dividers */}
      <line x1={colX} y1={colY} x2={colX} y2={colY + colHeight} stroke="#E2E8F0" strokeWidth={1} />
      <line x1={colRight} y1={colY} x2={colRight} y2={colY + colHeight} stroke="#E2E8F0" strokeWidth={1} />

      {/* Mask applies the fixed bottom white fog to everything inside */}
      <g mask={`url(#${maskId})`}>
        {/* Main Front Face */}
        <rect 
          x={barX} y={y} width={barWidth} height={height} 
          fill={`url(#${gradId})`}
          strokeWidth={0}
        />
        
        {/* Front Face Stripes Overlay */}
        <rect 
          x={barX} y={y} width={barWidth} height={height} 
          fill={`url(#${patternId})`} style={{ pointerEvents: 'none' }}
        />

        {/* Right Side 3D Depth/Shadow Face - Base color perfectly matches front face */}
        <polygon 
          points={`
            ${barX + barWidth},${y} 
            ${barX + barWidth + shadowWidth},${Math.min(y + shadowWidth, y + height)} 
            ${barX + barWidth + shadowWidth},${y + height} 
            ${barX + barWidth},${y + height}
          `}
          fill={`url(#${gradId})`}
          strokeWidth={0}
          strokeLinejoin="round"
        />

        {/* Right Side Overlay - Fades horizontally into the white background */}
        <polygon 
          points={`
            ${barX + barWidth},${y} 
            ${barX + barWidth + shadowWidth},${Math.min(y + shadowWidth, y + height)} 
            ${barX + barWidth + shadowWidth},${y + height} 
            ${barX + barWidth},${y + height}
          `}
          fill={`url(#${fadeRightGradId})`}
          strokeWidth={0}
          strokeLinejoin="round"
        />

        {/* Combined Outer Perimeter Stroke (Applies border ONLY to the outside, not the seam) */}
        <polygon 
          points={`
            ${barX},${y} 
            ${barX + barWidth},${y} 
            ${barX + barWidth + shadowWidth},${Math.min(y + shadowWidth, y + height)} 
            ${barX + barWidth + shadowWidth},${y + height} 
            ${barX},${y + height}
          `}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidthVal}
          strokeLinejoin="round"
        />
      </g>
      
      {/* Value Label Centered in the Column */}
      {payload && payload.PCL3 && (
        <text 
          x={colX + colWidth / 2} 
          y={colY + 25} 
          fill={isHovered ? "var(--color-text-dark)" : "var(--color-text-muted-dark)"} 
          textAnchor="middle" 
          fontSize="15" 
          fontWeight="700"
        >
          {`${(payload.PCL3 / 1000).toFixed(1)}k`}
        </text>
      )}
    </g>
  );
};

export default BuildingBar;
