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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Graficos" element={<Graficos />} />
        <Route path="/IniciarSesion" element={<IniciarSesion />} />
      </Routes>
    </>
  );
};

export default App;
