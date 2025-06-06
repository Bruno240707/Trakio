
import { useEffect, useState } from "react";
import "./TiempoRealGen.css"
import CardTiempoReal from "../../Componentes/CardTiempoReal/index";

const TiempoRealGen = () => {

    const [dataEntradasSalidas, setDataEntradasSalidas] = useState([])

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
        <>
        <div>
            <div>
                <h1>Entradas y Salidas en Tiempo Real</h1>
            </div>

            <div>
                {dataEntradasSalidas.map(d => (
                    <CardTiempoReal
                    hora={d.hora}
                    nombre={d.nombreEmpleado}
                    tipo={d.tipo}
                    />
                ))}
            </div>
            

        </div>
        </>
    )
}

export default TiempoRealGen