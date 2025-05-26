import React from "react";
import { Link } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  return (
    <>
      <img src="../src/Imagenes/fondoLogIn.png" alt="FondoDelLogIn" className="fondoLog" />

      <div className="contenedorPrincipal">
        
          <div className="contenidoGeneral">
            <h1 className="titulo">Introduciendo Trakio</h1>
            <p className="textoInfo"> Conectamos cámaras inteligentes con inteligencia artificial para que sepas quién entra, quién sale y cuándo. Desde mapas de calor hasta alertas de seguridad, nuestra app y plataforma web te dan el control total en tiempo real. Ideal para empresas que buscan orden, eficiencia y tranquilidad.</p>
            <a href="#" className="boton">Más información <span className="arrow-icon">➔</span></a>
          </div>

        <div className="contenidoLog login-container">
          <img src="../src/Imagenes/logo.png" alt="Logo Trakio" className="logoImg" />

          <div className="input-group">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Company" />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div>

          <button className="login-button">Iniciar sesión</button>




        <div class="btnOlvido">
        <Link to="/OlvidoPassword" class="txtOlvido">
        ¿Olvidaste tu contraseña?
        </Link>
        </div>


        </div>

      </div>
    </>
  );
};

export default IniciarSesion;
