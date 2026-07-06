import React from 'react';
import BulkTank from '../BulkTank';
import Pump from '../Pump';

const BulkStorageSegment = () => {
  return (
    <div style={{
      width: '350px',
      padding: '10px',
      position: 'relative'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
        PCL3 Bulk Storage
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BulkTank width={150} height={70} label="PCL3 Storage 1" capacity="20 MT" />
          <Pump width={35} height={35} label="P-101A" running={true} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BulkTank width={150} height={70} label="PCL3 Storage 2" capacity="20 MT" />
          <Pump width={35} height={35} label="P-101B" />
        </div>
      </div>
    </div>
  );
};

export default BulkStorageSegment;
