import { useState } from 'react';
import { Home as HomeIcon, Workflow, Clapperboard, Package, NotebookPen } from 'lucide-react';
import './App.css';
import HydraulicDiagram from './HydraulicDiagram';
import animationImage from './assets/Animation/Animation-photo.png';
import BOMImage from './assets/BOM/BOM.jpg';
import animationVideo from './assets/Animation/Animation.mp4'
function App() {
  
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showOverview, setShowOverview] = useState(false);
  const [notes, setNotes] = useState('');
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="app-container">
      <div className="sidebar">
        <button
          className={currentScreen === 'home' ? 'active' : ''}
          onClick={() => setCurrentScreen('home')}
        >
          <HomeIcon size={20} /> Home
        </button>

        <button
          className={currentScreen === 'Schematic' ? 'active' : ''}
          onClick={() => setCurrentScreen('Schematic')}
        >
          <Workflow size={20} /> Schematic Diagram
        </button>

        <button
          className={currentScreen === 'video' ? 'active' : ''}
          onClick={() => setCurrentScreen('video')}
        >
          <Clapperboard size={20} /> Animation
        </button>

        <button
          className={currentScreen === 'bom' ? 'active' : ''}
          onClick={() => setCurrentScreen('bom')}
        >
          <Package size={20} /> BOM
        </button>

        <button
          className={currentScreen === 'notes' ? 'active' : ''}
          onClick={() => setCurrentScreen('notes')}
        >
          <NotebookPen size={20} /> Notes
        </button>
      </div>

      <div className="main-screen">
        {currentScreen === 'home' && (
  <div className="page-center">
    <h1 className="page-heading">Plate Filter Hydraulic System</h1>
    <button className="overview-toggle" onClick={() => setShowOverview(!showOverview)}>
      Overview {showOverview ? '▲' : '▼'}
    </button>

    {showOverview && (
      <div className="overview-text">
        <p>
          A plate filter hydraulic system uses fluid pressure from a hydraulic power pack
          and a cylinder to clamp and seal the filter plates tightly together during
          solid-liquid separation.
        </p>

        <h3 className="overview-subheading">Main Components</h3>
        <ul>
          <li><strong>Hydraulic Power Pack:</strong> Supplies pressurized oil to drive the system.</li>
          <li><strong>Hydraulic Cylinder:</strong> Pushes the moving follower head against the plate pack.</li>
          <li><strong>Control Valves:</strong> Regulate fluid direction and system pressure.</li>
          <li><strong>Pressure Switch:</strong> Maintains consistent clamping force and prevents leaks.</li>
        </ul>

        <h3 className="overview-subheading">How It Works</h3>
        <ul>
          <li><strong>Clamping:</strong> The hydraulic cylinder extends to compress the filter plates together with high force, forming sealed chambers.</li>
          <li><strong>Filtration:</strong> Slurry is pumped into the sealed chambers; the cloth traps solids while liquid passes out.</li>
          <li><strong>Releasing:</strong> Once filtration finishes, hydraulic pressure is reversed to retract the cylinder, allowing the plates to open and drop the solid filter cake.</li>
        </ul>
      </div>
    )}
  </div>
)}

        {currentScreen === 'Schematic' && (
          <div className="page-center">
            <h1 className="page-heading">Schematic Diagram</h1>
          <HydraulicDiagram/> 
           
          </div>
        )}

        {currentScreen === 'video' &&  (
          <div className="page-center"><h1 className="page-heading">Animation</h1>
           <video
      className="animation-video"
      controls
      playsInline
      src={animationVideo}
    >
      Your browser does not support the video tag.
    </video>
          </div>
        )}

        {currentScreen === 'bom' && (
          <div className="page-center"><h1 className="page-heading">Bill Of Materials</h1>
           <img
  src={BOMImage}
  alt="BOM"
  className="BOM-image"
/>
          </div>
        
        )}


        {currentScreen === 'notes' && (
          <div>
            <h2 className="notes-heading">Write your notes here</h2>
            <textarea
              className="notes-box"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start typing..."
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;