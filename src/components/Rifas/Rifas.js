import React, { useState } from 'react';
import CrearRifa from './CrearRifa';
import VerRifas from './VerRifas';
import './Rifas.css';

const Rifas = () => {
  const [action, setAction] = useState('');

  const handleActionChange = (option) => {
    setAction(option);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Rifas</h1>
      <div className="text-center mb-4">
        <button 
          className="btn btn-primary mr-2" 
          onClick={() => handleActionChange('crear')}>
          Crear nueva rifa
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => handleActionChange('ver')}>
          Ver rifas existentes
        </button>
      </div>
      {action === 'crear' && <CrearRifa />}
      {action === 'ver' && <VerRifas />}
    </div>
  );
};

export default Rifas;
