  import { Link, useNavigate } from "react-router-dom";
  import "./Header.css";

  const Header = ({ setCuentaActiva, cuentaActiva }) => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
      setCuentaActiva(false);
      sessionStorage.removeItem("token");
      navigate("/");
    };


    return (
      <header className="header">
        <div className="left-section">
          <div className="barra-lateral"></div>
          <Link to={"/"}>
          {cuentaActiva.logo
            ? <img src={cuentaActiva.logo} alt="Logo" />
            : <p className="logo-text">Trakio</p>
          }
          </Link>
        </div>

        <div className="center-section">
          <Link to={"/dashboardsInd"}>
            <p className="nav-link">Dashboards</p>
          </Link>
          <Link to={"/TiempoRealGen"}>
            <p className="nav-link">Tiempo Real</p>
          </Link>
        </div>

        <div className="right-section">
          <button onClick={cerrarSesion} className="logout-button">
            <p className="nav-link">Cerrar Sesión</p>
          </button>
        </div>
      </header>
    );
  };

  export default Header;

