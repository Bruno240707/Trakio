import { useEffect, useState } from "react";
import "./TiempoRealGen.css";
import axios from 'axios';
import CardTiempoReal from "../../Componentes/CardTiempoReal/index";

const TiempoRealGen = ({ empleados }) => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = () => {
      axios.get('http://localhost:3001/api/worker-events')
        .then(response => {
          setEvents(response.data);
          console.log(events)
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    };

    fetchEvents();

    const intervalId = setInterval(fetchEvents, 5000);

    return () => clearInterval(intervalId);
  }, []);

    const workerActual = (id) =>{
      const empleadoActual = empleados.find((e) => e.id == id)
      return empleadoActual
    }
  
  return (
    <div className="tiempo-real-container">
      <h1>Entradas y Salidas en Tiempo Real</h1>

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
              />
            </div>
          ))
        ) : (
          <p>No hay eventos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default TiempoRealGen;
