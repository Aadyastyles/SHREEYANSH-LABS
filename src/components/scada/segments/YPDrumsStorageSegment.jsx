import React from 'react';
import YPDrum from '../YPDrum';

const YPDrumsStorageSegment = () => {
  return (
    <div style={{
      width: '380px',
      padding: '10px',
      position: 'relative'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
        YP Drums Storage Area (200kg)
      </div>
      
      <div style={{ display: 'flex', gap: '2px', position: 'relative' }}>
        {/* Back row of drums */}
        <div style={{ position: 'absolute', top: '-10px', left: '10px', display: 'flex', gap: '2px', opacity: 0.9 }}>
          {[...Array(8)].map((_, i) => <YPDrum key={`back-${i}`} width={35} height={60} label="YP" />)}
        </div>
        {/* Front row of drums */}
        <div style={{ position: 'relative', top: '10px', left: '0px', display: 'flex', gap: '2px' }}>
          {[...Array(8)].map((_, i) => <YPDrum key={`front-${i}`} width={35} height={60} label="YP" />)}
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '10px', textAlign: 'center', color: '#1f2937' }}>
        YP DRUMS STORAGE AREA
      </div>
      
      <div style={{ position: 'absolute', right: '10px', top: '40px', textAlign: 'right', fontSize: '10px', fontWeight: 'bold' }}>
        To melting<br/>tank side
        <div style={{ marginTop: '5px', background: '#fff', border: '1px solid #333', padding: '2px 10px', display: 'inline-block' }}>➡</div>
      </div>
    </div>
  );
};

export default YPDrumsStorageSegment;
