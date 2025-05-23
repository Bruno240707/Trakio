import React from "react";
import { Link } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = () => {
  return (
    <>
      
      <img src="../src/Imagenes/fondoLogIn.png" alt="FondoDelLogIn" class="fondoLog" />
      <div class="contenidoGeneral">
      <h1 class="titulo">Introduciendo Trakio</h1>
      <p class="textoInfo">Conectamos cámaras inteligentes con inteligencia artificial para que sepas quién entra, quién sale y cuándo. Desde mapas de calor hasta alertas de seguridad, nuestra app y plataforma web te dan el control total en tiempo real. Ideal para empresas que buscan orden, eficiencia y tranquilidad.</p>
      <a href="#" class="boton">
      Learn More <span class="arrow-icon">➔</span>
      </a>
      </div>

      <div class="contenidoLog">
      <div class="login-container">
    <div class="logo">
      <img src="../src/Imagenes/logo.png" alt="Logo Trakio"/>
    </div>

    <div class="input-group">
      <i class="fas fa-user"></i>
      <input type="text" placeholder="Salvador Soncini"/>
    </div>

    <div class="input-group">
      <i class="fas fa-envelope"></i>
      <input type="email" placeholder="salvadorsoncini@gmail.com"/>
    </div>

    <div class="input-group">
      <i class="fas fa-lock"></i>
      <input type="password" placeholder="xxxxxxxxxx"/>
    </div>

    <button class="login-button">Iniciar Sesion</button>

    <div class="forgot-password">
      <a href="#">¿Olvidaste tu contraseña?</a>
    </div>
  </div>
      </div>
    </>
  );
};

export default IniciarSesion;