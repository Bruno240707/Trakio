import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({setCuentaActiva}) => {

  const navigate = useNavigate()

  const cerrarSesion = () => {
    setCuentaActiva(false)
    navigate("/")
  }

  return (
    <header className="header">
      <div className="left-section">
       <div className="barra-lateral"></div>
       <Link to={"/"}> <p className="logo-text">TRAKIO</p></Link>
      </div>

      <div>
        <Link to={"/dashboardsInd"}> <p className="logo-text">Dashboards</p></Link>
      </div>

      <div>
        <Link to={"/tiempoReal"}> <p className="logo-text">Tiempo Real</p></Link>
      </div>

      <div>
        <button onClick={cerrarSesion}> <p className="logo-text">Cerrar Sesion</p></button>
      </div>

    </header>
  );
};

export default Header;
