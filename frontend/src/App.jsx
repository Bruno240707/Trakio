import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import Graficos from "./Views/Graficos/Graficos";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import Header from "./Componentes/Header";
import Footer from "./Componentes/footer";
import EntradasSalidasInd from "./Views/EntradasSalidasInd/EntradasSalidasInd";
import DashboardsInd from "./Views/DashboardsInd/DashboardsInd";

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
        </Routes>
        <Footer/>
      </div>
    </>
  );
};

export default App;
