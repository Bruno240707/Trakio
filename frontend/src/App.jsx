import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import DashboardsGen from "./Views/DashboardsGen/DashboardsGen";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import Footer from "./Componentes/footer";
import TiempoRealGen from "./Views/TiempoRealGen/TiempoRealGen";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";
import OlvidoPassword from "./Views/OlvidoPassword/OlvidoPassword";
import HeaderInactivo from "./Componentes/HeaderInactivo";
import HeaderActivo from "./Componentes/HeaderActivo";
import Informacion from "./Views/Informacion/Informacion";

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
      {cuentaActiva ?  <HeaderActivo setCuentaActiva={setCuentaActiva}/> : <HeaderInactivo/>}
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DashboardsGen" element={<DashboardsGen />} />
          <Route path="/DashboardsInd" element={<DashboardsInd />} />
          <Route path="/TiempoRealGen" element={<TiempoRealGen/>} />
          <Route path="/IniciarSesion" element={<IniciarSesion companiasRegistradas={companiasRegistradas} setCuentaActiva={setCuentaActiva}/>} />
          <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
          <Route path="/Informacion" element={<Informacion />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default App;
