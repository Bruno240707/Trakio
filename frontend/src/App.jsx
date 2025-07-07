import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//VIEWS
import Home from "./Views/Home/Home";
import DashboardsGen from "./Views/DashboardsGen/DashboardsGen";
import Contacto from "./Views/Contacto/Contacto";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import TiempoRealGen from "./Views/TiempoRealGen/TiempoRealGen";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";
import OlvidoPassword from "./Views/OlvidoPassword/OlvidoPassword";
import Informacion from "./Views/Informacion/Informacion";
import Layout from "./Views/Layout/Layout";
import Error404 from "./Views/Error404/Error404"
//
import RutasProtegidas from "./Componentes/RutasProtegidas/RutasProtegidas"

const App = () => {

  const navigate = useNavigate();

  const [workers, setWorkers] = useState([])
  const [cuentaActiva, setCuentaActiva] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCuentaActiva({
          id: decoded.id,
          username: decoded.username
        });
      } catch (err) {
        console.error("Token inválido o expirado", err);
        sessionStorage.removeItem("token");
      }
    }

    setLoading(false);

  }, []);

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout cuentaActiva={cuentaActiva} setCuentaActiva={setCuentaActiva}/>}>
            <Route index element={<Home />} />
            <Route path="/IniciarSesion" element={<IniciarSesion setCuentaActiva={setCuentaActiva}/>} />
            <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
            <Route path="/Informacion" element={<Informacion />} />
            <Route path="/Contacto" element={<Contacto />} />
            
            <Route element={<RutasProtegidas cuentaActiva={cuentaActiva} />}>
              <Route path="/DashboardsGen" element={<DashboardsGen />} />
              <Route path="/DashboardsInd" element={<Navigate to="/DashboardsInd/1" />} />
              <Route path="/DashboardsInd/:workerId" element={<DashboardsInd />} />
              <Route path="/TiempoRealGen" element={<TiempoRealGen />} />
            </Route>

            <Route path="*" element={<Error404/>} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
