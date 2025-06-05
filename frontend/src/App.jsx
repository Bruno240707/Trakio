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
//

const App = () => {

  const [companiasRegistradas, setCompaniasRegistradas] = useState([])
  const [cuentaActiva, setCuentaActiva] = useState(false)

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
            <Route path="/DashboardsGen" element={<DashboardsGen />} />
            <Route path="/DashboardsInd" element={<DashboardsInd />} />
            <Route path="/TiempoRealGen" element={<TiempoRealGen/>} />
            <Route path="/IniciarSesion" element={<IniciarSesion companiasRegistradas={companiasRegistradas} setCuentaActiva={setCuentaActiva}/>} />
            <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
            <Route path="/Informacion" element={<Informacion />} />
          </Route>
        </Routes>
    </>
  );
};

export default App;
