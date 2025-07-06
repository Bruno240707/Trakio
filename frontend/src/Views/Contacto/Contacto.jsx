import { useState } from 'react';
import emailjs from "@emailjs/browser";
import './Contacto.css';

const Contacto = () => {

  const [email, setEmail] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [nombre, setNombre] = useState("")

  const handleSubmit = (e) => {
  e.preventDefault();

      emailjs
        .send(
          'service_4a7w54d',
          'template_pn8s8vk',
          {
            user_nombre: nombre,
            user_email: email,
            message: mensaje,
          },
          'pQTqNKaaHQW1qydJY'
        )
        .then(
          (result) => {
            console.log('Correo enviado', result.text);
            alert('Mensaje enviado con éxito');
            setEmail('');
            setMensaje('');
            setNombre('');
          },
          (error) => {
            console.error('Error al enviar', error);
            alert('Hubo un problema al enviar el mensaje');
          }
        );
    };

  return (
    <div className="contacto-container">
      <h1 className="contacto-titulo">¡ Contactanos !</h1>
      <img src="../src/Imagenes/logo.png" alt="logo" className="logoContacto" />
      <form onSubmit={handleSubmit} className="contacto-formulario">
        <div className="form-grupo">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-grupo">
          <label htmlFor="mensaje" className="form-label">Consulta:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <button type="submit" className="contacto-individual">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto