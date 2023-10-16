import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './frontend/pages/home/home';
import Login from './frontend/components/login/login';
import Qr from './frontend/pages/scan-qr/scan-qr';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/escanear-qr" element={<Qr />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
