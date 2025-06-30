import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import SessionStorageTest from "./Views/SessionStorageTest/SessionStorageTest";
//
import RutasProtegidas from "./Componentes/RutasProtegidas/RutasProtegidas"

const App = () => {

  const navigate = useNavigate();

  const [workers, setWorkers] = useState([])
  const [cuentaActiva, setCuentaActiva] = useState(null)

  useEffect(() => {
    const savedCuentaActiva = sessionStorage.getItem("cuentaActiva")

    if (savedCuentaActiva) {
      setCuentaActiva(JSON.parse(savedCuentaActiva))
    }
  }, [])

  useEffect(() => {
    if (cuentaActiva) {
      sessionStorage.setItem("cuentaActiva", JSON.stringify(cuentaActiva))
    } else {
      sessionStorage.removeItem("cuentaActiva")
    }
  }, [cuentaActiva])

  useEffect(() => {
    fetch("http://localhost:3001/api/workers")
      .then(res => res.json())
      .then(data => setWorkers(data))
      .catch(err => console.error("Error al traer trabajadores", err));
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
            <Route path="/SessionStorageTest" element={<SessionStorageTest />} />
            
            <Route element={<RutasProtegidas cuentaActiva={cuentaActiva} />}>
              <Route path="/DashboardsGen" element={<DashboardsGen />} />
              <Route path="/DashboardsInd" element={<DashboardsInd />} />
              <Route path="/TiempoRealGen" element={<TiempoRealGen />} />
            </Route>

            <Route path="*" element={<Error404/>} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
