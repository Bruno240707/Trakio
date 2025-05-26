import React from "react";
import { Link } from "react-router-dom";
import "./OlvidoPassword.css";

const OlvidoPassword = () => {
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




          <p class="textoOlvido">Ingresa tu mail para enviar un link de recuperacion de contraseña</p>  
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Gmail" />
          </div>



          <button className="login-button">Enviar</button>


        <div className="forgot-password">

      </div>


        </div>

      </div>
    </>
  );
};

export default OlvidoPassword;
