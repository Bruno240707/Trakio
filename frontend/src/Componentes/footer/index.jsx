import React from "react";
import "./footer.css";

const Footer = () => {
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
      </div>

      <div className="footer-right">
        <div className="footer-column">
          <h4>SOBRE NOSOTROS</h4>
          <p>CONTACTO</p>
          <p>VALORES</p>
        </div>
        <div className="footer-column">
          <h4>LOREM IMPSUM</h4>
        </div>
      </div>

      <div className="footer-copyright">
        Copyright © 2025 TRAKIO
      </div>
    </footer>
  );
};

export default Footer;


