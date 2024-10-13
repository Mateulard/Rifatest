import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Comisiones from './components/Comisiones/Comisiones';
import Cuotas from './components/Coutas/Cuotas';
import Rifas from './components/Rifas/Rifas';
import Personas from './components/Personas/Personas';
import Premios from './components/Premios/Premios';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Admin Rifa</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/comisiones">Comisiones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cuotas">Cuotas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rifas">Rifas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/premios">Premios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/personas">Personas</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comisiones" element={<Comisiones />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/rifas" element={<Rifas />} />
          <Route path="/premios" element={<Premios />} />
          <Route path="/cuotas" element={<Cuotas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
