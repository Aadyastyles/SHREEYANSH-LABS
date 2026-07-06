import React from 'react';
import { statusConfig } from './ProductionData';

const StatusBadge = ({ status }) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span className={cfg.cls}>
      <Icon size={10} />
      {status}
    </span>
  );
};

export default StatusBadge;
