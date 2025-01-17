import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './frontend/pages/home/home';
import Login from './frontend/pages/login/login';
import Buscar from './frontend/pages/crear-botellas/buscar'
import Crear from './frontend/pages/crear-botellas/crear-botella'
import Traza from './frontend/pages/scan-qr/traza-qr'
import Qr from './frontend/pages/scan-qr/scan-qr'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/crear-botellas" element={<Crear />} />
          <Route path="/scan-qr" element={<Qr />} />
          <Route path="/trazabilidad" element={<Traza />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
