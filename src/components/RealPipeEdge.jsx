import React from 'react';
import { getBezierPath } from '@xyflow/react';

const RealPipeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const baseColor = data?.color || '#94A3B8';
  
  return (
    <>
      {/* Outer Shadow / Drop shadow effect */}
      <path
        id={`${id}-shadow`}
        className="react-flow__edge-path"
        d={edgePath}
        stroke="#1E293B"
        strokeWidth={10}
        fill="none"
        style={{ opacity: 0.3, transform: 'translate(0px, 3px)' }}
      />
      {/* Main Pipe Body */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke={baseColor}
        strokeWidth={8}
        fill="none"
        markerEnd={markerEnd}
        style={{ ...style }}
      />
      {/* Inner highlight for 3D effect */}
      <path
        id={`${id}-highlight`}
        className="react-flow__edge-path"
        d={edgePath}
        stroke="#FFFFFF"
        strokeWidth={2}
        fill="none"
        style={{ opacity: 0.5, transform: 'translate(-1px, -1px)' }}
      />
    </>
  );
};

export default RealPipeEdge;
