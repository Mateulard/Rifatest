import React, { useState } from 'react';
import axios from 'axios';
import './Personas.css';

const Personas = () => {
  const [activeTab, setActiveTab] = useState('instituciones');
  const [showForm, setShowForm] = useState(false);
  const [employeeType, setEmployeeType] = useState('cobrador');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'instituciones':
        return <p>Instituciones</p>;
      case 'cobradores':
        return <p>Cobradores</p>;
      case 'vendedores':
        return <p>Vendedores</p>;
      default:
        return <p>Instituciones</p>;
    }
  };

  const handleAddEmployee = (type) => {
    setEmployeeType(type);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define el endpoint basado en el tipo de entidad
    const endpoint = employeeType === 'cobrador' ? '/cobradores' : (employeeType === 'vendedor' ? '/vendedores' : '/organizaciones');

    // Realizar llamada a la API
    axios.post(`http://localhost:4000${endpoint}`, formData)
      .then(response => {
        setMessage('Datos cargados correctamente.');
        setShowForm(false);
        e.target.reset(); // Limpiar el formulario
      })
      .catch(error => {
        setMessage('Error al cargar los datos. Inténtalo nuevamente.');
        console.error("Error al agregar empleado:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Personas</h1>

      {/* Pestañas */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'instituciones' ? 'active' : ''}`} 
            onClick={() => setActiveTab('instituciones')}>
            Instituciones
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'cobradores' ? 'active' : ''}`} 
            onClick={() => setActiveTab('cobradores')}>
            Cobradores
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'vendedores' ? 'active' : ''}`} 
            onClick={() => setActiveTab('vendedores')}>
            Vendedores
          </button>
        </li>
      </ul>

      {/* Contenido de las pestañas */}
      <div className="tab-content mt-4">
        {renderTabContent()}
      </div>

      {/* Botón para agregar */}
      <div className="mt-4">
        <button onClick={() => handleAddEmployee('cobrador')} className="btn btn-primary me-2">
          Agregar Cobrador
        </button>
        <button onClick={() => handleAddEmployee('vendedor')} className="btn btn-primary me-2">
          Agregar Vendedor
        </button>
        <button onClick={() => handleAddEmployee('organizacion')} className="btn btn-primary">
          Agregar Institución
        </button>
      </div>

      {/* Mostrar mensaje */}
      {message && <p className="mt-3 alert alert-info">{message}</p>}

      {/* Formulario dinámico */}
      {showForm && (
        <div className="mt-4">
          <h3>{employeeType === 'cobrador' ? 'Agregar Cobrador' : (employeeType === 'vendedor' ? 'Agregar Vendedor' : 'Agregar Institución')}</h3>
          <form onSubmit={handleSubmit}>
            {/* Campos comunes */}
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombre" onChange={handleChange} required />
            </div>

            {employeeType !== 'organizacion' && (
              <>
                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">DNI</label>
                  <input type="text" className="form-control" id="dni" onChange={handleChange} required />
                </div>
              </>
            )}

            {employeeType === 'organizacion' && (
              <>
                <div className="mb-3">
                  <label htmlFor="Cuit" className="form-label">CUIT</label>
                  <input type="text" className="form-control" id="Cuit" onChange={handleChange} required />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-success">Guardar</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Personas;
