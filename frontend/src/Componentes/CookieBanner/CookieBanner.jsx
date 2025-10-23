import { useState, useEffect } from "react";
import "./CookieBanner.css";

const CookieBanner = ({ onCookiesAccepted }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setVisible(true);
    } else if (onCookiesAccepted) {
      // ya aceptó antes, verificamos sesión inmediatamente
      onCookiesAccepted();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
    if (onCookiesAccepted) onCookiesAccepted(); // notificar a App.jsx
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__content">
        <p>
          🍪 Usamos cookies para mantener tu sesión activa y mejorar tu experiencia.
          Al continuar navegando, aceptás su uso.
        </p>
        <button className="cookie-banner__button" onClick={handleAccept}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
