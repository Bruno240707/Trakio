import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate(); 

  const Informacion = () => {
    navigate("/informacion"); 
  };

  const DashboardsInd = () => { // <-- Corregí el nombre de la función
    navigate("/DashboardsInd"); 
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="left-section">
          <div className="barra-lateral"></div>
          <p className="logo-text">TRAKIO</p>
        </div>
        <p className="footer-slogan">
          LA SEGURIDAD Y LA GESTIÓN, EN UN SOLO SISTEMA.
        </p>
        <div className="footer-social">
          <a href="#"><img src="../src/imagenes/icono_ig.png" alt="Instagram" className="social-icon" /></a>
          <a href="#"><img src="../src/imagenes/Facebook_Logo.png" alt="Facebook" className="social-icon" /></a>
          <a href="#"><img src="../src/imagenes/x_Logo.png" alt="X" className="social-icon" /></a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <h4>SOBRE NOSOTROS</h4>
          <p>CONTACTO</p>
          <p onClick={Informacion}>INFORMACION</p>
        </div>
        <div className="footer-column">
          <h4>DASHBOARDS</h4>
          <p>GENERALES</p>
          <p onClick={DashboardsInd}>INDIVIDUALES</p> {/* Cambié el nombre de la función aquí */}
        </div>
      </div>

      <div className="footer-copyright">
        Copyright © 2025 TRAKIO
      </div>
    </footer>
  );
};

export default Footer;

