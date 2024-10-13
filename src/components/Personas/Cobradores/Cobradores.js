import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cobradores = () => {
  const [cobradores, setCobradores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/cobradores').then((response) => {
      setCobradores(response.data);
    });
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Dirección</th>
            <th>Localidad</th>
            <th>Teléfono</th>
            <th>Cargo</th>
            <th>Comisiones</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {cobradores.map((cobrador) => (
            <tr key={cobrador.id}>
              <td>{cobrador.nombre}</td>
              <td>{cobrador.dni}</td>
              <td>{cobrador.direccion}</td>
              <td>{cobrador.localidad}</td>
              <td>{cobrador.telefono}</td>
              <td>{cobrador.cargo}</td>
              <td>{cobrador.comisiones}</td>
              <td>{cobrador.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cobradores;
