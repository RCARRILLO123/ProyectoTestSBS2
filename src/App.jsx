import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Consulta from './components/Consulta';
import CrearRegistro from './components/CrearRegistro';
import Login from './components/Login';
import Home from './components/Home';
import './Estilos/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router basename="/WebEntidad">
      <div className="app-container">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
        </Routes>

        {isAuthenticated && (
          <>
            <Header onLogout={handleLogout} />
            <div className="main-content">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/consulta" element={<Consulta />} />
                  <Route path="/crear" element={<CrearRegistro />} />
                  <Route path="/" element={<h1>Bienvenido</h1>} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
