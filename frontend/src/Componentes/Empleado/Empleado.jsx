import "./Empleado.css";
import { Link } from "react-router-dom";

const Empleado = ({ empleado }) => {
  return (
    <Link to={`/DashboardsInd/${empleado.id}`} className="empleado-nombre">
        <li className="empleado-item">
        <button className="delete">✕</button>
            {empleado.nombre}
        </li>
    </Link>

  );
};

export default Empleado;
