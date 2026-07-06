import React from 'react';

const InstrumentTag = ({ type = 'PIT', value = '0.00', color = '#3B82F6', style = {} }) => {
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      background: '#FFFFFF',
      border: `2px solid ${color}`,
      borderRadius: '50%',
      fontSize: '0.6rem',
      fontWeight: 800,
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      ...style
    }}>
      <div style={{ color: '#333', marginBottom: '-2px' }}>{type}</div>
      <div style={{ color: color }}>{value}</div>
    </div>
  );
};

export default InstrumentTag;
