import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Views/Home"
import Graficos from "./Views/Graficos";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Graficos" element={<Graficos/>} />
    </Routes>
  );
};

export default App;
