import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
        <div>
        <h1>Página de inicio</h1>
        <p>Bienvenido a la app.</p>
        </div>

        <Link to={"/Graficos"}> Graficos </Link>
    </>
  );
};

export default Home;
