import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ cuentaActiva }) => {
  if (cuentaActiva === null) {
    // Todavía cargando (por ejemplo, se está leyendo sessionStorage)
    return null; // o un spinner si querés
  }
  
  if (!cuentaActiva) {
    return <Navigate to="/IniciarSesion" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
