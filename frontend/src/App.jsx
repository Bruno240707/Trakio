import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

// VIEWS
import Home from "./Views/Home/Home";
import DashboardsGen from "./Views/DashboardsGen/DashboardsGen";
import Contacto from "./Views/Contacto/Contacto";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import TiempoRealGen from "./Views/TiempoRealGen/TiempoRealGen";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";
import OlvidoPassword from "./Views/OlvidoPassword/OlvidoPassword";
import Informacion from "./Views/Informacion/Informacion";
import Layout from "./Views/Layout/Layout";
import Error404 from "./Views/Error404/Error404";
import Configuracion from "./Views/ConfiguracionView/ConfiguracionView";

// COMPONENTES
import RutasProtegidas from "./Componentes/RutasProtegidas/RutasProtegidas";
import Empleados from "./Componentes/Empleados/Empleados";
import CookieBanner from "./Componentes/CookieBanner/CookieBanner";

const App = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([]);
  const [cuentaActiva, setCuentaActiva] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Función para verificar sesión con backend
  const checkSession = async () => {
    try {
      let res = await fetch("http://localhost:3001/api/perfil", {
        credentials: "include",
      });
  
      // Si el access token expiró, intentamos refresh automáticamente
      if (res.status === 401) {
        const refreshRes = await fetch("http://localhost:3001/api/refresh", {
          method: "POST",
          credentials: "include",
        });
  
        if (refreshRes.ok) {
          // refresh exitoso, volvemos a pedir perfil
          res = await fetch("http://localhost:3001/api/perfil", {
            credentials: "include",
          });
        } else {
          // refresh expiró => cerramos sesión automáticamente
          setCuentaActiva(null);
          return;
        }
      }
  
      if (res.ok) {
        const data = await res.json();
        setCuentaActiva(data.user);
      } else {
        setCuentaActiva(null);
      }
    } catch (err) {
      console.error("Error verificando sesión:", err);
      setCuentaActiva(null);
    } finally {
      setLoading(false);
    }
  };  

  // ⚡ Al montar: si ya aceptó cookies, verificar sesión
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (accepted) checkSession();
    else setLoading(false);
  }, []);

  // ⚡ Cargar empleados
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/getWorkers", {
          credentials: "include",
        });
        const data = await res.json();
        setEmpleados(data);
      } catch (err) {
        console.error("Error al cargar empleados:", err);
      }
    };
    fetchEmpleados();
  }, []);

  if (loading) return <p>Cargando sesión...</p>;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Layout cuentaActiva={cuentaActiva} setCuentaActiva={setCuentaActiva} />}
        >
          {/* PÚBLICAS */}
          <Route index element={<Home />} />
          <Route path="/IniciarSesion" element={<IniciarSesion setCuentaActiva={setCuentaActiva} />} />
          <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
          <Route path="/Informacion" element={<Informacion />} />
          <Route path="/Contacto" element={<Contacto />} />

          {/* PROTEGIDAS */}
          <Route element={<RutasProtegidas cuentaActiva={cuentaActiva} />}>
            <Route path="/DashboardsGen" element={<DashboardsGen />} />
            <Route path="/DashboardsInd" element={<DashboardsInd empleados={empleados} />} />
            <Route path="/DashboardsInd/:workerId" element={<DashboardsInd empleados={empleados} />} />
            <Route path="/TiempoRealGen" element={<TiempoRealGen empleados={empleados} />} />
            <Route path="/ConfiguracionView" element={<Configuracion empleados={empleados} setEmpleados={setEmpleados} />} />
          </Route>

          {/* ERROR 404 */}
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>

      {/* Banner de cookies conectado */}
      <CookieBanner onCookiesAccepted={checkSession} />
    </>
  );
};

export default App;
