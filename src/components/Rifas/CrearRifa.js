import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearRifa = () => {
  const [nombre, setNombre] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);
  const [numeros, setNumeros] = useState(0);
  const [crearBonos, setCrearBonos] = useState(false);
  const [cantidadBonos, setCantidadBonos] = useState(0);
  const [cuotas, setCuotas] = useState(1);
  const [valorCuota, setValorCuota] = useState(0);

  // Cargar organizaciones desde la base de datos
  useEffect(() => {
    axios.get('http://localhost:4000/organizaciones').then((response) => {
      setOrganizaciones(response.data);
    });
  }, []);

  const handleCrearRifa = () => {
    // Validar que los números no sean negativos
    if (numeros < 1) {
      alert("El número debe ser mayor a 0.");
      return;
    }

    // Datos a enviar al servidor
    const data = {
      nombre,
      organizacion,
      numeros,
      crearBonos,
      cantidadBonos: crearBonos ? cantidadBonos : 0,
      cuotas,
      valorCuota,
    };

    axios.post('http://localhost:4000/crearRifa', data)
      .then((response) => {
        alert("Rifa creada con éxito.");
      })
      .catch((error) => {
        console.error("Error al crear rifa:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nueva Rifa</h2>

      <div className="form-group">
        <label>Nombre de la campaña:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Organización:</label>
        <select
          className="form-control"
          value={organizacion}
          onChange={(e) => setOrganizacion(e.target.value)}
        >
          <option value="">Selecciona una organización</option>
          {organizaciones.map((org) => (
            <option key={org.id} value={org.nombre}>
              {org.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Números a crear:</label>
        <input
          type="number"
          className="form-control"
          value={numeros}
          onChange={(e) => setNumeros(e.target.value)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label>¿Desea crear bonos?</label>
        <select
          className="form-control"
          value={crearBonos}
          onChange={(e) => setCrearBonos(e.target.value === "true")}
        >
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>
      </div>

      {crearBonos && (
        <div className="form-group">
          <label>Cantidad de Bonos:</label>
          <input
            type="number"
            className="form-control"
            value={cantidadBonos}
            onChange={(e) => setCantidadBonos(e.target.value)}
            min="1"
          />
        </div>
      )}

      <div className="form-group">
        <label>Cuotas (máximo 20):</label>
        <input
          type="number"
          className="form-control"
          value={cuotas}
          onChange={(e) => setCuotas(Math.min(20, e.target.value))}
          min="1"
          max="20"
        />
      </div>

      <div className="form-group">
        <label>Valor por cuota:</label>
        <input
          type="number"
          className="form-control"
          value={valorCuota}
          onChange={(e) => setValorCuota(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleCrearRifa}>
        Crear Rifa
      </button>
    </div>
  );
};

export default CrearRifa;
