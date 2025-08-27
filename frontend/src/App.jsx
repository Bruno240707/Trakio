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
import Configuracion from "./Views/ConfiguracionView/ConfiguracionView";
//
import RutasProtegidas from "./Componentes/RutasProtegidas/RutasProtegidas"
import Empleados from "./Componentes/Empleados/Empleados";

const App = () => {

  const navigate = useNavigate();

  const [empleados, setEmpleados] = useState([])
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

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/getWorkers");
        const data = await res.json();
        setEmpleados(data);
      } catch (err) {
        console.error("Error al cargar la API:", err);
      }
    };

    fetchEmpleados();
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
              <Route path="/DashboardsInd" element={<DashboardsInd empleados={empleados} />} />
              <Route path="/DashboardsInd/:workerId" element={<DashboardsInd empleados={empleados}/>} />
              <Route path="/TiempoRealGen" element={<TiempoRealGen empleados={empleados}/>} />
              <Route path="/ConfiguracionView" element={<Configuracion empleados={empleados} setEmpleados={setEmpleados}/>} />
            </Route>

            <Route path="*" element={<Error404/>} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
