import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import Graficos from "./Views/Graficos/Graficos";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import Header from "./Componentes/Header";
import Footer from "./Componentes/footer";
import EntradasSalidasInd from "./Views/EntradasSalidasInd/EntradasSalidasInd";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";
import OlvidoPassword from "./Views/OlvidoPassword/OlvidoPassword";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Graficos" element={<Graficos />} />
          <Route path="/DashboardsInd" element={<DashboardsInd />} />
          <Route path="/EntradasSalidasInv" element={<EntradasSalidasInd/>} />
          <Route path="/IniciarSesion" element={<IniciarSesion />} />
          <Route path="/OlvidoPassword" element={<OlvidoPassword />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default App;
