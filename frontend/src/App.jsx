import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//VIEWS
import Home from "./Views/Home/Home";
import DashboardsGen from "./Views/DashboardsGen/DashboardsGen";
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

  const [companiasRegistradas, setCompaniasRegistradas] = useState([])
  const [cuentaActiva, setCuentaActiva] = useState(false)
  const [logoActivo, setLogoActivo] = useState("")


  useEffect(() => {
    fetch("http://localhost:3001/api/CompaniasRegistradas")
      .then((res) => res.json())
      .then((data) => setCompaniasRegistradas(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, []);

  return (
    <>
        <Routes>
          <Route path="/" element={<Layout cuentaActiva={cuentaActiva} setCuentaActiva={setCuentaActiva}/>}>

            <Route index element={<Home />} />
            <Route path="/IniciarSesion" element={<IniciarSesion companiasRegistradas={companiasRegistradas} setCuentaActiva={setCuentaActiva} logoActivo={setLogoActivo}/>} />
            <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
            <Route path="/Informacion" element={<Informacion />} />
            
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
