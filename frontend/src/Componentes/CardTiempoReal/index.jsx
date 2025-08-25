import "./CardTiempoReal.css"
import { useNavigate, Navigate } from "react-router-dom";

const CardTiempoReal = ({hora, nombre, tipo, foto, id}) =>{

    const navigate = useNavigate();

    const irAlEmpleado = (id) => {
        navigate("/DashboardsInd/" + id)
    }

    return (
        <>
        <div className="card-tiempo">
            <span className="hora">{hora}</span>
                <img src={foto} className="x"/>
            <div className="info">
                <p className="nombre">{nombre}</p>
                <p className={`tipo ${tipo.toLowerCase()}`}>{tipo}</p>
            </div>
            <button className="botonReal" onClick={() => irAlEmpleado(id)}>Ir al empleado</button>
        </div>
        </>
    )
}

export default CardTiempoReal