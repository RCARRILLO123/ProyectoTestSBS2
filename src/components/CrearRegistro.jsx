import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../Estilos/CrearRegistro.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
const CrearRegistro = () => {
  const [registro, setRegistro] = useState({
    descripcion: '',
    estado: '1',
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!registro.descripcion.trim()) {
      nuevosErrores.descripcion = 'El campo "Descripción" es obligatorio.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; 
  };

  const handleCancel = () => {
    setRegistro({ descripcion: '', estado: '1' });
    setErrores({});
  };

  const handleRegister = () => {
    const token2 = localStorage.getItem('authToken');
    if (!validarFormulario()) {
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas registrar esta entidad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_ROUTE_LOCAL}/api/v1/EntidadGubernamental`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token2}`
          },
          body: JSON.stringify({ Descripcion: registro.descripcion }),
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La entidad ha sido registrada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          handleCancel();  
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar la entidad. Por favor, intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'El registro ha sido cancelado.',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  };

  return (
    <div className="content">
      <div className="crear-registro-container">
        <div className="crear-registro-card">
          <h2>Registro Entidad</h2>
          <br />
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input 
                type="text" 
                id="descripcion" 
                name="descripcion"
                maxLength={150}
                value={registro.descripcion} 
                onChange={handleChange} 
                placeholder="Ingrese la descripción" 
              />
              {errores.descripcion && <p className="error-message">{errores.descripcion}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <select 
                id="estado" 
                name="estado"
                value={registro.estado} 
                onChange={handleChange} 
                disabled
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>
            <div className="crear-registro-actions">
              <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleRegister}>Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearRegistro;
