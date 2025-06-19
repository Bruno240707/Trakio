import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./IniciarSesion.css";

const IniciarSesion = ({companiasRegistradas, setCuentaActiva}) => {

  const navigate = useNavigate()

  const [nombreCompania, setNombreCompania] = useState("")
  const [contrasenia, setContrasenia] = useState("")
  const [mensajeErrorInicio, setMensajeErrorInicio] = useState("")

  const onClickIniciarSesion = () => {

    const compania = companiasRegistradas.find((comp) => comp.nombre === nombreCompania && comp.contrasenia === contrasenia)

    if (compania) {
      setCuentaActiva(compania)

      sessionStorage.setItem("cuentaActiva", JSON.stringify(compania))

      navigate("/dashboardsInd")
    } 
    else {
      setMensajeErrorInicio("Nombre de compañía o contraseña incorrectos")
      setCuentaActiva(null)
      setNombreCompania("")
      setContrasenia("")

      sessionStorage.removeItem("cuentaActiva")    }
  }

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
            <input type="text" value={nombreCompania} onChange={(e) => setNombreCompania(e.target.value)} placeholder="Company" maxLength={40}/>
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
