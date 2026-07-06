import React from 'react';
import { Droplets, FlaskConical, Beaker } from 'lucide-react';
import { productColors } from './ProductionData';

const ProductBadge = ({ product }) => {
  const c = productColors[product];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      padding: '0.2rem 0.6rem', borderRadius: '100px',
      fontSize: '0.75rem', fontWeight: 500,
      background: c.bg, color: c.color,
    }}>
      {product === 'POCL3' ? <Droplets size={10} /> : product === 'PCL5' ? <FlaskConical size={10} /> : <Beaker size={10} />}
      {product}
    </span>
  );
};

export default ProductBadge;
