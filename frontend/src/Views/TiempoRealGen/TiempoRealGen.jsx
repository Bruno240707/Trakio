import { useEffect, useState } from "react";
import "./TiempoRealGen.css";
import axios from 'axios';
import CardTiempoReal from "../../Componentes/CardTiempoReal/index";

const TiempoRealGen = ({ empleados }) => {

  const [events, setEvents] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState("");

  useEffect(() => {
    const fetchEvents = () => {
      const params = selectedSucursal ? { id_sucursal: selectedSucursal } : {};
      axios.get('/api/worker-events', { params })
        .then(response => {
          setEvents(response.data);
          // console.log la respuesta para debugging
          console.log('fetched events', response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    };

    fetchEvents();

    const intervalId = setInterval(fetchEvents, 5000);

    return () => clearInterval(intervalId);
  }, [selectedSucursal]);

  // Traer sucursales para el dropdown de filtro
  useEffect(() => {
    axios.get('/api/getSucursales')
      .then(res => {
        setSucursales(res.data || []);
        // Si hay una sucursal guardada previamente en localStorage, úsala como selección inicial
        try {
          const saved = localStorage.getItem('selectedSucursal');
          if (saved) setSelectedSucursal(saved);
        } catch (err) {
          console.error('Error reading selectedSucursal from localStorage', err);
        }
      })
      .catch(err => console.error('Error fetching sucursales', err));
  }, []);

  // Escuchar cambios en localStorage (p.ej. si se selecciona otra sucursal en DashboardsInd)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'selectedSucursal') {
        setSelectedSucursal(e.newValue || "");
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

    const workerActual = (id) =>{
      const empleadoActual = empleados.find((e) => e.id == id)
      return empleadoActual
    }
  
  return (
    <div className="tiempo-real-container">
      <h1>Entradas y Salidas en Tiempo Real</h1>

      <div className="filtro-sucursal">
        <label htmlFor="sucursalSelect">Filtrar por sucursal: </label>
        <select id="sucursalSelect" value={selectedSucursal} onChange={e => setSelectedSucursal(e.target.value)}>
          <option value="">Todas las sucursales</option>
          {sucursales.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
      </div>

      <div className="lista-registros">
        {Array.isArray(events) && events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="registro-completo">
              {event.event_direction == "Exit" ? (
                <img src="../src/Imagenes/salida.png" className="icono-tipo" />
                ) : (
                <img src="../src/Imagenes/entrada.png" className="icono-tipo" />
              )}
              <CardTiempoReal
                hora={new Date(event.created_at).toLocaleString('es-AR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
                nombre={workerActual(event.worker_id).nombre}
                tipo={event.event_direction}
                foto={workerActual(event.worker_id).foto_url}
                id={workerActual(event.worker_id).id}
              />
            </div>
          ))
        ) : (
          <div className="empty-container">
          <div className="empty-icon">
            <img src="https://www.svgrepo.com/show/532097/clock-check.svg" alt="Reloj" width="150" height="200"/>
          </div>
          <h2>No hay eventos para mostrar.</h2>
          <p>Para ver los ingresos/egresos de los empleados espere al inicio de la jornada.</p>
          {empleados.length === 0 && <p>No hay empleados disponibles.</p>}
        </div>
        )}
      </div>

    </div>

    
  );
};

export default TiempoRealGen;
