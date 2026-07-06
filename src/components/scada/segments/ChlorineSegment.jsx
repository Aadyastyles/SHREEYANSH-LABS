import React from 'react';
import Cl2Cylinder from '../Cl2Cylinder';
import VaporizerTank from '../VaporizerTank';

const ChlorineSegment = () => {
  return (
    <div style={{
      width: '350px',
      padding: '10px',
      position: 'relative'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
        Chlorine (Cl₂) Segment
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        
        {/* Cylinders */}
        <div>
          <div style={{ display: 'flex', gap: '2px', position: 'relative' }}>
            {/* Back row */}
            <div style={{ position: 'absolute', top: '-10px', left: '5px', display: 'flex', gap: '2px', opacity: 0.9 }}>
              {[...Array(5)].map((_, i) => <Cl2Cylinder key={`back-${i}`} width={25} height={90} label="" />)}
            </div>
            {/* Front row */}
            <div style={{ position: 'relative', top: '5px', display: 'flex', gap: '2px' }}>
              {[...Array(6)].map((_, i) => <Cl2Cylinder key={`front-${i}`} width={25} height={90} label="" />)}
            </div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>Cl₂ Yellow Cylinders</div>
        </div>

        {/* Piping between Cylinders and Storage */}
        <div style={{ height: '4px', width: '40px', background: '#d4c82c', border: '1px solid #111' }}></div>
        
        {/* Chlorine Storage Tank (Vaporizer) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <VaporizerTank width={50} height={100} label="Cl2 Tank" />
          <div style={{ marginTop: '5px', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>Chlorine Storage<br/>(Steam Jacketed)</div>
        </div>

        {/* Manifold Pipe */}
        <div style={{ height: '40px', width: '10px', borderRight: '4px solid #2e7d32', borderTop: '4px solid #2e7d32', borderTopRightRadius: '5px' }}></div>
      </div>
    </div>
  );
};

export default ChlorineSegment;
