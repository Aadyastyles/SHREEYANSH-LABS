import React from 'react';
import Reactor from '../Reactor';
import Valve from '../Valve';

const ReactorSection = ({ id = "1", temp, pressure }) => {
  return (
    <div style={{
      width: '200px',
      background: '#e5e7eb',
      border: '2px solid #374151',
      padding: '10px',
      position: 'relative',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
        Reactor 0{id} Block
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Top inputs */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '10px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '8px', fontWeight: 'bold' }}>YP In</div>
              <Valve width={15} height={10} style={{ margin: '2px 0' }} />
              <div style={{ width: '4px', height: '15px', background: '#facc15' }}></div>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '8px', fontWeight: 'bold' }}>Cl2 In</div>
              <Valve width={15} height={10} style={{ margin: '2px 0' }} />
              <div style={{ width: '4px', height: '15px', background: '#ca8a04' }}></div>
           </div>
        </div>
        
        <Reactor width={120} height={200} temp={temp} pressure={pressure} />
        
        {/* Bottom output */}
        <div style={{ width: '6px', height: '20px', background: '#94a3b8' }}></div>
        <Valve width={20} height={15} />
      </div>
    </div>
  );
};

export default ReactorSection;
