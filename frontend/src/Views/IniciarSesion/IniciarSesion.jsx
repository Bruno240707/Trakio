import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = ({setCuentaActiva}) => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [contrasenia, setContrasenia] = useState("")
  const [mensajeErrorInicio, setMensajeErrorInicio] = useState("")

  const onClickIniciarSesion = async () => {
    setMensajeErrorInicio("");
  
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password: contrasenia }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setCuentaActiva(data.user);
        sessionStorage.setItem("cuentaActiva", JSON.stringify(data.user));
        navigate("/dashboardsInd");
      } else {
        const errorData = await response.json();
        setMensajeErrorInicio(errorData.message || "Error en inicio de sesión");
        setCuentaActiva(null);
        setUsername("");
        setContrasenia("");
        sessionStorage.removeItem("cuentaActiva");
      }
    } catch (error) {
      setMensajeErrorInicio("Error de conexión con el servidor");
    }
  };

  const onClickMasInfo = () => {
    navigate("/Informacion")
  }

  

  return (
    <>
      <img src="../src/Imagenes/fondoLogIn.png" alt="FondoDelLogIn" className="fondoLog" />

      <div className="contenedorPrincipal">
        
          <div className="contenidoGeneral">
            <h1 className="titulo">Introduciendo Trakio</h1>
            <p className="textoInfo"> Conectamos cámaras inteligentes con inteligencia artificial para que sepas quién entra, quién sale y cuándo. Desde mapas de calor hasta alertas de seguridad, nuestra app y plataforma web te dan el control total en tiempo real. Ideal para empresas que buscan orden, eficiencia y tranquilidad.</p>
            <button className="boton" onClick={onClickMasInfo}> <p>Más información</p><span className="arrow-icon">➔</span></button>
          </div>

        <div className="contenidoLog login-container">
          <img src="../src/Imagenes/logo.png" alt="Logo Trakio" className="logoImg" />

          <div className="input-group">
            <i className="fas fa-user"></i>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" maxLength={40}/>
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} placeholder="Password" maxLength={40} />
          </div>

          <p className="error-message">{mensajeErrorInicio}</p>

          <button className="login-button" onClick={onClickIniciarSesion}>Iniciar sesión</button>

          <div className="btnOlvido">
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
