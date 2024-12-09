import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../Estilos/Consulta.css'; 

const Consulta = () => {
  const [data, setData] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSearch = () => {
    const token1 = localStorage.getItem('authToken');
    console.log('token10',token1);
    fetch(`${process.env.REACT_APP_ROUTE_LOCAL}/api/v1/EntidadGubernamental?DescripcionEntidad=${descripcion}`,
       {
        method: 'GET',  
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token1}`  
        }

  })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  };
  const handleDelete = (id) => {
    const token2 = localStorage.getItem('authToken');
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_ROUTE_LOCAL}/api/v1/EntidadGubernamental/Delete?CodigoEntidad=${id}`,
          {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token2}`  
            }
          }
        )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al eliminar la entidad.');
          }
          setData(data.filter((item) => item.codigoEntidad !== id));
          Swal.fire('Eliminado', 'La entidad ha sido eliminada.', 'success');
        })
        .catch((error) => {
          console.error('Error al eliminar:', error);
          Swal.fire('Error', 'No se pudo eliminar la entidad.', 'error');
        });
      }
    });
  };

  const handleEdit = (entity) => {
    setSelectedEntity(entity);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('authToken');
    fetch(`${process.env.REACT_APP_ROUTE_LOCAL}/api/v1/EntidadGubernamental/Update`, {
      method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({id: selectedEntity.codigoEntidad, descripcion:selectedEntity.descripcionEntidad}),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al actualizar la entidad.');
      }
      return response.json();
    })
    .then(() => {
      setData(data.map((item) => (item.codigoEntidad === selectedEntity.codigoEntidad ? selectedEntity : item)));
      setShowEditModal(false);
      Swal.fire('Actualizado', 'La entidad ha sido actualizada.', 'success');
    })
    .catch((error) => {
      console.error('Error al actualizar:', error);
      Swal.fire('Error', 'No se pudo actualizar la entidad.', 'error');
    });
  };

  return (
    <div className="container">
      <h2 className="my-4">Consulta de Entidad</h2>

      {error && <p className="text-danger">Error: {error}</p>}

      <div className="row mb-3">
        <div className="col-md-10">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>Buscar</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.codigoEntidad}>
                  <td>{item.codigoEntidad}</td>
                  <td>{item.descripcionEntidad}</td>
                  <td>{item.fechaRegistro}</td>
                  <td>{item.estadoEntidad}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => handleEdit(item)} 
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDelete(item.codigoEntidad)} 
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Entidad</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)} 
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="descripcionEntidad" className="form-label">Descripción</label>
                  <input 
                    type="text" 
                    id="descripcionEntidad" 
                    className="form-control" 
                    value={selectedEntity.descripcionEntidad} 
                    onChange={(e) => setSelectedEntity({ ...selectedEntity, descripcionEntidad: e.target.value })} 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"  
                  onClick={handleUpdate}
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consulta;
