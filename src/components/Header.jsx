import React from 'react';
import '../Estilos/Header.css';

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="header-logo">
          <img 
            src="/WebEntidad/assets/images/logos/logo-superintendencia-de-bancos.svg" 
            alt="Superintendencia de Bancos" 
            className="logo" 
          />
        </div>
        <div className="header-actions">
          <button onClick={onLogout} className="btn-logout">Cerrar sesión</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
