import { useState } from 'react';
import './Contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Correo enviado correctamente');
    setFormData({
      nombre: '',
      email: '',
      mensaje: '',
    });
  };

  return (
    <div className="contacto-container">
      <h1 className="contacto-titulo">Contacto</h1>
      <form onSubmit={handleSubmit} className="contacto-formulario">
        <div className="form-grupo">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-grupo">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-grupo">
          <label htmlFor="mensaje" className="form-label">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-boton">Enviar</button>
      </form>
    </div>
  );
}