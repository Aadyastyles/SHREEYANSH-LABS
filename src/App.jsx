import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProcessFlow from './pages/ProcessFlow';
import Inventory from './pages/Inventory';
import Production from './pages/Production';
import Sales from './pages/Sales';
import Costing from './pages/Costing';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="app-window">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/process-flow" element={<ProcessFlow />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/production" element={<Production />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/costing" element={<Costing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
