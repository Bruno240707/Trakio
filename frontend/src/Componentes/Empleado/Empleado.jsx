import "./Empleado.css";
import { Link } from "react-router-dom";

const Empleado = ({ empleado }) => {
  return (
    <Link to={`/DashboardsInd/${empleado.id}`} className="empleado-nombre">
        <li className="empleado-item">
        <img className="delete" src={empleado.foto_url}/>
            {empleado.nombre} {empleado.apellido}
        </li>
    </Link>

  );
};

export default Empleado;
