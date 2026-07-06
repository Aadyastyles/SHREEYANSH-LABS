import React from 'react';
import YPDrumsStorageSegment from './segments/YPDrumsStorageSegment';
import MeltingTankSegment from './segments/MeltingTankSegment';
import ChlorineSegment from './segments/ChlorineSegment';
import BulkStorageSegment from './segments/BulkStorageSegment';
import ScadaPipe from './ScadaPipe';
import ScadaReactor from './ScadaReactor';
import ScadaReceiver from './ScadaReceiver';
import ScadaYPStorage from './ScadaYPStorage';
import ScadaN2Tank from './ScadaN2Tank';
import Pump from './Pump';
import Valve from './Valve';
import InstrumentTag from './InstrumentTag';
import TelemetryPanel from './TelemetryPanel';

const ScadaCanvas = ({ telemetry }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      {/* 
        ===============================================================
        COMPONENT PLACEMENTS (No Borders, Compact Layout) 
        ===============================================================
      */}

      {/* 1. YP PREPARATION */}
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
         <YPDrumsStorageSegment />
      </div>
      <div style={{ position: 'absolute', top: '20px', left: '420px' }}>
         <MeltingTankSegment />
      </div>

      {/* 2. YP HANDLING & CORE MIXER */}
      <div style={{ position: 'absolute', top: '280px', left: '20px', width: '700px', height: '280px' }}>
         <div style={{ position: 'absolute', left: '100px', top: '30px' }}>
            <ScadaYPStorage />
         </div>
         <div style={{ position: 'absolute', left: '400px', top: '0px' }}>
            <ScadaN2Tank />
         </div>
         <div style={{ position: 'absolute', left: '350px', top: '100px' }}>
            <Pump label="Common Suction" running={true} />
         </div>
         <div style={{ position: 'absolute', left: '350px', top: '200px' }}>
            <Pump label="YP Transfer" />
         </div>
      </div>

      {/* 3. CHLORINE SEGMENT */}
      <div style={{ position: 'absolute', top: '20px', left: '800px' }}>
         <ChlorineSegment />
      </div>

      {/* 4. REACTOR SECTION */}
      <div style={{ position: 'absolute', top: '560px', left: '20px', width: '1050px', height: '360px' }}>
         <div style={{ position: 'absolute', bottom: '20px', left: '50px' }}>
           <ScadaReactor id="1" active={false} />
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '300px' }}>
           <ScadaReactor id="2" active={true} temp={telemetry.temp} pressure={telemetry.pressure} />
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '550px' }}>
           <ScadaReactor id="3" active={false} />
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '800px' }}>
           <ScadaReactor id="4" active={true} temp={telemetry.temp + 2} pressure={telemetry.pressure + 0.1} />
         </div>
      </div>

      {/* 5. RECEIVER SEGMENT */}
      <div style={{ position: 'absolute', top: '200px', left: '1150px', width: '330px', height: '320px' }}>
         <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '30px' }}>
            {[1, 2, 3].map(id => (
               <ScadaReceiver key={id} id={id} />
            ))}
         </div>
         <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
           <ScadaReceiver id="5" horizontal={true} capacity="6 KL" />
         </div>
      </div>

      {/* 6. STORAGE & DISPATCH */}
      <div style={{ position: 'absolute', top: '600px', left: '1100px' }}>
         <BulkStorageSegment />
      </div>

      {/* 7. SYSTEM ALERTS & TELEMETRY */}
      <div style={{ position: 'absolute', top: '650px', left: '20px', zIndex: 100, transform: 'scale(0.8)', transformOrigin: 'top left' }}>
        <TelemetryPanel telemetry={telemetry} />
      </div>

      {/* 
        ===============================================================
        ABSOLUTE PIPES OVERLAY 
        ===============================================================
      */}
      
      {/* 1. YP Transfer (Yellow/Orange) */}
      <ScadaPipe points={[[600, 150], [600, 395], [390, 395]]} color="#facc15" animated={true} />
      <ScadaPipe points={[[350, 395], [190, 395], [190, 350]]} color="#facc15" animated={true} />
      <ScadaPipe points={[[190, 520], [190, 500], [350, 500]]} color="#facc15" animated={true} />
      
      {/* YP Manifold Feed to 4 Reactors */}
      <ScadaPipe points={[[390, 500], [780, 500], [780, 580]]} color="#facc15" animated={true} width={8} />
      <ScadaPipe points={[[780, 580], [105, 580], [105, 615]]} color="#facc15" animated={true} /> {/* R1 Feed */}
      <ScadaPipe points={[[780, 580], [355, 580], [355, 615]]} color="#facc15" animated={true} /> {/* R2 Feed */}
      <ScadaPipe points={[[780, 580], [605, 580], [605, 615]]} color="#facc15" /> {/* R3 Feed */}
      <ScadaPipe points={[[780, 580], [855, 580], [855, 615]]} color="#facc15" animated={true} /> {/* R4 Feed */}

      {/* 2. Chlorine Manifold (Yellow/Green) */}
      <ScadaPipe points={[[1080, 150], [1080, 550]]} color="#ca8a04" animated={true} width={10} />
      
      {/* Manifold drops into each reactor (3 lines each) */}
      {/* R1 */}
      <ScadaPipe points={[[1080, 550], [120, 550], [120, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 545], [125, 545], [125, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 540], [130, 540], [130, 615]]} color="#ca8a04" animated={true} width={3} />
      
      {/* R2 */}
      <ScadaPipe points={[[1080, 550], [370, 550], [370, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 545], [375, 545], [375, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 540], [380, 540], [380, 615]]} color="#ca8a04" animated={true} width={3} />

      {/* R3 */}
      <ScadaPipe points={[[1080, 550], [620, 550], [620, 615]]} color="#ca8a04" width={3} />
      <ScadaPipe points={[[1080, 545], [625, 545], [625, 615]]} color="#ca8a04" width={3} />
      <ScadaPipe points={[[1080, 540], [630, 540], [630, 615]]} color="#ca8a04" width={3} />

      {/* R4 */}
      <ScadaPipe points={[[1080, 550], [870, 550], [870, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 545], [875, 545], [875, 615]]} color="#ca8a04" animated={true} width={3} />
      <ScadaPipe points={[[1080, 540], [880, 540], [880, 615]]} color="#ca8a04" animated={true} width={3} />

      {/* 3. PCL3 Vapor Condenser loops (Cyan) */}
      <ScadaPipe points={[[190, 565], [190, 530], [210, 530], [210, 565]]} color="#22d3ee" animated={true} width={4} />
      <ScadaPipe points={[[440, 565], [440, 530], [460, 530], [460, 565]]} color="#22d3ee" animated={true} width={4} />
      <ScadaPipe points={[[690, 565], [690, 530], [710, 530], [710, 565]]} color="#22d3ee" width={4} />
      <ScadaPipe points={[[940, 565], [940, 530], [960, 530], [960, 565]]} color="#22d3ee" animated={true} width={4} />

      {/* 4. PCL3 Liquid Output (Darker Blue/Teal) */}
      <ScadaPipe points={[[150, 860], [150, 900], [1000, 900], [1000, 480], [1160, 480]]} color="#06b6d4" animated={true} />
      <ScadaPipe points={[[400, 860], [400, 900]]} color="#06b6d4" animated={true} />
      <ScadaPipe points={[[650, 860], [650, 900]]} color="#06b6d4" />
      <ScadaPipe points={[[900, 860], [900, 900]]} color="#06b6d4" animated={true} />

      {/* Horizontal Receivers (ST-05) to Bulk Storage */}
      <ScadaPipe points={[[1250, 470], [1250, 630]]} color="#06b6d4" animated={true} width={8} />
      
      {/* Valves randomly placed to make it look realistic */}
      <div style={{ position: 'absolute', top: '385px', left: '250px' }}><Valve /></div>
      <div style={{ position: 'absolute', top: '490px', left: '250px' }}><Valve /></div>
      <div style={{ position: 'absolute', top: '570px', left: '250px' }}><Valve /></div>
      <div style={{ position: 'absolute', top: '890px', left: '500px' }}><Valve color="#06b6d4" /></div>

    </div>
  );
};

export default ScadaCanvas;
