// Configuracion.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./ConfiguracionView.css";

export default function Configuracion({ empleados, setEmpleados }) {
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    foto_url: ""
  });

  // Función para traer empleados desde el backend
  const fetchEmpleados = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/getWorkers");
      setEmpleados(res.data);
    } catch (err) {
      console.error("Error al cargar los empleados:", err);
    }
  };
  
  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Agregar nuevo empleado
  const handleAdd = async () => {
    try {
      if (!nuevoEmpleado.nombre || !nuevoEmpleado.apellido || !nuevoEmpleado.email || !nuevoEmpleado.telefono) {
        alert("Faltan datos obligatorios");
        return;
      }
      await axios.post("http://localhost:3001/api/addWorker", nuevoEmpleado);
      setNuevoEmpleado({ nombre: "", apellido: "", email: "", telefono: "", foto_url: "" });
      fetchEmpleados();
    } catch (err) {
      console.error("Error agregando empleado:", err);
    }
  };

  // Eliminar empleado
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro quieres eliminar este empleado?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/deleteWorker/${id}`);
      fetchEmpleados();
    } catch (err) {
      console.error("Error eliminando empleado:", err);
    }
  };

  // Editar empleado
  const handleUpdate = async (emp) => {
    try {
      const nombre = prompt("Nuevo nombre:", emp.nombre);
      if (nombre === null) return;
      const apellido = prompt("Nuevo apellido:", emp.apellido);
      if (apellido === null) return;
      const email = prompt("Nuevo email:", emp.email);
      if (email === null) return;
      const telefono = prompt("Nuevo teléfono:", emp.telefono);
      if (telefono === null) return;
      const foto_url = prompt("Nueva foto URL:", emp.foto_url || "");
      if (foto_url === null) return;

      const updatedEmpleado = { nombre, apellido, email, telefono, foto_url };
      await axios.put(`http://localhost:3001/api/updateWorker/${emp.id}`, updatedEmpleado);
      fetchEmpleados();
    } catch (err) {
      console.error("Error actualizando empleado:", err);
    }
  };

  return (
    <div className="configuracionContainer">
      <h2>Configuración de Empleados</h2>

      <ul className="configuracionLista">
        {empleados.map((emp) => (
          <li key={emp.id} className="configuracionItem">
            <img src={emp.foto_url || "https://via.placeholder.com/50"} alt="foto" className="configuracionFoto" />
            <span>{emp.nombre} {emp.apellido}</span>

            <button
              className="configuracionBoton configuracionBotonEditar"
              onClick={() => handleUpdate(emp)}
            >
              ✏ Editar
            </button>

            <button
              className="configuracionBoton configuracionBotonEliminar"
              onClick={() => handleDelete(emp.id)}
            >
              🗑 Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h3>Agregar nuevo empleado</h3>
      <input
        className="configuracionInput"
        type="text"
        placeholder="Nombre"
        value={nuevoEmpleado.nombre}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })}
      />
      <input
        className="configuracionInput"
        type="text"
        placeholder="Apellido"
        value={nuevoEmpleado.apellido}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, apellido: e.target.value })}
      />
      <input
        className="configuracionInput"
        type="email"
        placeholder="Email"
        value={nuevoEmpleado.email}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, email: e.target.value })}
      />
      <input
        className="configuracionInput"
        type="text"
        placeholder="Teléfono"
        value={nuevoEmpleado.telefono}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, telefono: e.target.value })}
      />
      <input
        className="configuracionInput"
        type="text"
        placeholder="Foto URL"
        value={nuevoEmpleado.foto_url}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, foto_url: e.target.value })}
      />
      <button className="configuracionBotonAgregar" onClick={handleAdd}>
        ➕ Agregar
      </button>
    </div>
  );
}
