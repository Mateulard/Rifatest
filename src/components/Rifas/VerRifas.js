import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerRifas = () => {
  const [rifas, setRifas] = useState([]);
  const [cobradores, setCobradores] = useState([]);

  // Cargar rifas y cobradores desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:4000/rifas').then((response) => {
      setRifas(response.data);
    });
    axios.get('http://localhost:4000/cobradores').then((response) => {
      setCobradores(response.data);
    });
  }, []);

  const handleMarcarCuotaPagada = (rifaId, cuotaPagada) => {
    axios.post(`http://localhost:4000/marcarCuota/${rifaId}`, { cuotaPagada })
      .then(() => {
        alert("Cuota marcada como pagada.");
        axios.get('http://localhost:4000/rifas').then((response) => {
          setRifas(response.data);
        });
      })
      .catch((error) => {
        console.error("Error al marcar cuota:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Rifas en Curso</h2>
      {rifas.map((rifa) => (
        <div key={rifa.id} className="card mt-3">
          <div className="card-header">
            Rifa Número {rifa.numero}
          </div>
          <div className="card-body">
            <p>Cobrador: {rifa.cobradorNombre}</p>
            <p>Cuotas Pagadas: {rifa.cuotasPagadas}/{rifa.totalCuotas}</p>
            <button
              className="btn btn-success"
              onClick={() => handleMarcarCuotaPagada(rifa.id, rifa.cuotasPagadas + 1)}
            >
              Marcar Cuota Pagada
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerRifas;
