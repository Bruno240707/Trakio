import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoutes = ({ cuentaActiva }) => {
  if (cuentaActiva === null) {
    // Todavía cargando (por ejemplo, se está leyendo sessionStorage)
    return null; // o un spinner si querés
  }

  // Verificar token en cada render
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp <= now) {
        sessionStorage.removeItem("token");
        return <Navigate to="/IniciarSesion" replace />;
      }
    } catch (err) {
      sessionStorage.removeItem("token");
      return <Navigate to="/IniciarSesion" replace />;
    }
  }

  if (!cuentaActiva) {
    return <Navigate to="/IniciarSesion" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
