import React from 'react';
import MeltingTank from '../MeltingTank';
import Valve from '../Valve';
import InstrumentTag from '../InstrumentTag';

const MeltingTankSegment = () => {
  return (
    <div style={{
      width: '320px',
      padding: '10px',
      position: 'relative'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
        YP Drums Melting Tank Block
      </div>
      
      {/* Top Steam pipes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <div style={{ fontSize: '10px', fontWeight: 'bold' }}>
          STEAM INPUT<br/>(from boiler)
          <div style={{ position: 'relative', height: '2px', width: '30px', background: '#374151', display: 'inline-block', marginLeft: '5px' }}>
            <div style={{ position: 'absolute', right: '-5px', top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid #374151' }}></div>
          </div>
        </div>
        
        <div style={{ fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '2px', width: '30px', background: '#374151', display: 'inline-block', marginRight: '5px' }}>
            <div style={{ position: 'absolute', right: '-5px', top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid #374151' }}></div>
          </div>
          STEAM OUTPUT
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
        {/* Left input pipe and valve */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <InstrumentTag type="LIT" value="" color="#22c55e" style={{ width: '25px', height: '25px', fontSize: '8px' }} />
          <Valve width={20} height={15} style={{ margin: '5px 0' }} />
          <div style={{ height: '4px', width: '30px', background: '#facc15', border: '1px solid #333' }}></div>
        </div>
        
        <MeltingTank width={150} height={100} />
        
        {/* Right output pipe, valves, and PIT */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <InstrumentTag type="LIT" value="" color="#22c55e" style={{ width: '25px', height: '25px', fontSize: '8px' }} />
            <Valve width={20} height={15} />
            <InstrumentTag type="PIT" value="" color="#3b82f6" style={{ width: '25px', height: '25px', fontSize: '8px' }} />
          </div>
          <div style={{ height: '4px', width: '50px', background: '#facc15', border: '1px solid #333', marginTop: '10px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MeltingTankSegment;
