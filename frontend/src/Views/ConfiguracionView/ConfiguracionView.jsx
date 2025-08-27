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

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

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

  // Iniciar edición
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setEditValues({
      nombre: emp.nombre,
      apellido: emp.apellido,
      email: emp.email,
      telefono: emp.telefono,
      foto_url: emp.foto_url || ""
    });
  };

  // Guardar cambios
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/updateWorker/${id}`, editValues);
      setEditingId(null);
      fetchEmpleados();
    } catch (err) {
      console.error("Error actualizando empleado:", err);
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  return (
    <div className="configuracionContainer">
      <h2>Configuración de Empleados</h2>

      <ul className="configuracionLista">
        {empleados.map((emp) => (
          <li key={emp.id} className="configuracionItem">
            {editingId === emp.id ? (
              <div className="editContainer">
                <input
                  type="text"
                  value={editValues.nombre}
                  onChange={(e) => setEditValues({ ...editValues, nombre: e.target.value })}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={editValues.apellido}
                  onChange={(e) => setEditValues({ ...editValues, apellido: e.target.value })}
                  placeholder="Apellido"
                />
                <input
                  type="email"
                  value={editValues.email}
                  onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editValues.telefono}
                  onChange={(e) => setEditValues({ ...editValues, telefono: e.target.value })}
                  placeholder="Teléfono"
                />
                <input
                  type="text"
                  value={editValues.foto_url}
                  onChange={(e) => setEditValues({ ...editValues, foto_url: e.target.value })}
                  placeholder="Foto URL"
                />
                <div className="editButtons">
                  <button className="configuracionBoton configuracionBotonGuardar" onClick={() => handleSave(emp.id)}>
                    💾 Guardar
                  </button>
                  <button className="configuracionBoton configuracionBotonCancelar" onClick={handleCancel}>
                    ❌ Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <img src={emp.foto_url || "https://via.placeholder.com/50"} alt="foto" className="configuracionFoto" />
                <span>{emp.nombre} {emp.apellido}</span>
                <button
                  className="configuracionBoton configuracionBotonEditar"
                  onClick={() => handleEdit(emp)}
                >
                  ✏ Editar
                </button>
                <button
                  className="configuracionBoton configuracionBotonEliminar"
                  onClick={() => handleDelete(emp.id)}
                >
                  🗑 Eliminar
                </button>
              </>
            )}
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
