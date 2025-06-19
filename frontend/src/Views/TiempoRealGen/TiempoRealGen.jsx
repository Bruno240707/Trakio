import { useEffect, useState } from "react";
import "./TiempoRealGen.css";
import CardTiempoReal from "../../Componentes/CardTiempoReal/index";

const TiempoRealGen = () => {
  const [dataEntradasSalidas, setDataEntradasSalidas] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3001/api/entradasSalidasTiempoReal")
        .then((res) => res.json())
        .then((data) => setDataEntradasSalidas(data))
        .catch((err) => console.error("Error al cargar la API:", err));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="tiempo-real-container">
      <h1>Entradas y Salidas en Tiempo Real</h1>

      <div className="lista-registros">
        {dataEntradasSalidas.map((d, i) => (
          <div key={i} className="registro-completo">
            {d.tipo === "salida" ? (
            <img src="../src/Imagenes/salida.png" className="icono-tipo" />
            ) : (
            <img src="../src/Imagenes/entrada.png" className="icono-tipo" />
            )}
            <CardTiempoReal
              hora={d.hora}
              nombre={d.nombreEmpleado}
              tipo={d.tipo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TiempoRealGen;
