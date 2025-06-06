import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ cuentaActiva }) => {
  if (!cuentaActiva) {
    return <Navigate to="/IniciarSesion" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
