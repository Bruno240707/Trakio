import React from 'react';
import { Link } from 'react-router-dom';
import './error404.css';

const error404 = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-message">Página no encontrada</h2>
      <p className="notfound-description">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="notfound-link">
        Volver al inicio
      </Link>
    </div>
  );
};

export default error404;
