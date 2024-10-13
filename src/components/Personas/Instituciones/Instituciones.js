import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Organizaciones = () => {
  const [organizaciones, setOrganizaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/organizaciones').then((response) => {
      setOrganizaciones(response.data);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cuil</th>
            <th>Dirección</th>
            <th>Localidad</th>
            <th>Teléfono</th>
            <th>Comisiones</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {organizaciones.map((organizacion) => (
            <tr key={organizacion.id}>
              <td>{organizacion.nombre}</td>
              <td>{organizacion.cuil}</td>
              <td>{organizacion.direccion}</td>
              <td>{organizacion.localidad}</td>
              <td>{organizacion.telefono}</td>
              <td>{organizacion.comisiones}</td>
              <td>{organizacion.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Organizaciones;
