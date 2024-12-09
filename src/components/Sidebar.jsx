import React from 'react';
import { Link } from 'react-router-dom';  
import '../Estilos/Sidebar.css';  

const Sidebar = () => { 
  return (
    <nav className="sidebar">
      <div className="header-logo">
        <img 
          src="/WebEntidad/assets/images/logos/logo-superintendencia-de-bancos.svg" 
          alt="Superintendencia de Bancos" 
          className="logo" 
        />
      </div>
      <ul>
        <li>
          <Link to="/" className="nav-link">
            <i className="las la-home fs-1"></i> Inicio
          </Link>
        </li>
        <li>
          <Link to="/consulta" className="nav-link">
            <i className="las la-id-card fs-1"></i> Consulta
          </Link>
        </li>
        <li>
          <Link to="/crear" className="nav-link">
            <i className="las la-id-badge fs-1"></i> Crear Registro
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
