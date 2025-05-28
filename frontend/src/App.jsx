import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import Graficos from "./Views/Graficos/Graficos";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import Footer from "./Componentes/footer";
import EntradasSalidasInd from "./Views/EntradasSalidasInd/EntradasSalidasInd";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";
import OlvidoPassword from "./Views/OlvidoPassword/OlvidoPassword";
import HeaderInactivo from "./Componentes/HeaderInactivo";
import HeaderActivo from "./Componentes/HeaderActivo";


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
      {cuentaActiva ?  <HeaderActivo/> : <HeaderInactivo/>}
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Graficos" element={<Graficos />} />
          <Route path="/DashboardsInd" element={<DashboardsInd />} />
          <Route path="/EntradasSalidasInv" element={<EntradasSalidasInd/>} />
          <Route path="/IniciarSesion" element={<IniciarSesion companiasRegistradas={companiasRegistradas} setCuentaActiva={setCuentaActiva}/>} />
          <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default App;
