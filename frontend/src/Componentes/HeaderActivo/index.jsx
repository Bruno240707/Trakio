  import { Link, useNavigate } from "react-router-dom";
  import "./Header.css";

  const Header = ({ setCuentaActiva, cuentaActiva }) => {
    const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      // Llamada al backend para eliminar cookie httpOnly
      const res = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include", // 👈 muy importante para httpOnly cookies
      });

      if (res.ok) {
        // Limpiar estado del frontend
        setCuentaActiva(null);
        sessionStorage.removeItem("token");
        navigate("/IniciarSesion");
      } else {
        console.error("Error cerrando sesión en backend");
      }
    } catch (err) {
      console.error("Error en logout:", err);
    }
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
          <Link to={"/ConfiguracionView"}>
            <p className="nav-link">Configuracion</p>
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

