
import { useEffect, useState } from "react";
import "./TiempoRealGen.css"
import CardTiempoReal from "../../Componentes/CardTiempoReal";

const TiempoRealGen = () => {

    const [dataEntradasSalidas, setDataEntradasSalidas] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/entradasSalidasTiempoReal")
          .then((res) => res.json())
          .then((data) => setDataEntradasSalidas(data))
          .catch((err) => console.error("Error al cargar la API:", err));
      }, []);
      
    return (
        <>
        <div>
            <div>
                <h1>Entradas y Salidas en Tiempo Real</h1>
            </div>

            <div>
                <CardTiempoReal dataEntradasSalidas={dataEntradasSalidas}/>
            </div>
            

        </div>
        </>
    )
}

export default TiempoRealGen