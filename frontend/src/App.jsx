import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home/Home";
import Graficos from "./Views/Graficos/Graficos";
import IniciarSesion from "./Views/IniciarSesion/IniciarSesion";
import Header from "./Componentes/Header";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "45px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Graficos" element={<Graficos />} />
          <Route path="/IniciarSesion" element={<IniciarSesion />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
