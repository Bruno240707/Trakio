import { useState, useEffect } from "react";
import axios from "axios";
import "./ConfiguracionView.css";

export default function Configuracion({ empleados, setEmpleados }) {
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    foto_url: "",
    sucursal: "",
    id_sucursal: null,

  });
  const [sucursales, setSucursales] = useState([]);
  const [filtroConf, setFiltroConf] = useState("")
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [horarioTarde, setHorarioTarde] = useState("");

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getWorkers?includeInactive=${mostrarInactivos}`);
      setEmpleados(res.data);
    } catch (err) {
      console.error("Error al cargar los empleados:", err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/getWorkers?filtro=${filtroConf}&includeInactive=${mostrarInactivos}`)
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [filtroConf]);
  

useEffect(() => {
  const fetchHorario = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/configurar-hora-entrada");
      const data = await res.json();
      if (data.horaEntradaTarde) {
        setHorarioTarde(data.horaEntradaTarde.slice(0, 5));
      }
    } catch (error) {
      console.error("Error obteniendo horario:", error);
    }
  };

  fetchHorario();
}, []);

  

  useEffect(() => {
    fetchEmpleados();
  }, []);

  useEffect(() => {
    // cuando cambie mostrarInactivos, recargar empleados
    fetchEmpleados();
  }, [mostrarInactivos]);

  // Fetch sucursales para el select
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/getSucursales");
        const data = await res.json();
        setSucursales(data || []);
      } catch (err) {
        console.error("Error cargando sucursales:", err);
      }
    };
    fetchSucursales();
  }, []);

  const handleHorario = async () => {
    if (!horarioTarde) {
      alert("Seleccioná una hora primero.");
      return;
    }
  
    const horaConSegundos = `${horarioTarde}:00`;
  
    try {
      const response = await fetch('http://localhost:3001/api/configurar-hora-entrada', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          horaEntradaTarde: horaConSegundos
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      alert("Horario actualizado a " + horaConSegundos);
    } catch (error) {
      console.error("Error actualizando horario:", error);
      alert("Error actualizando el horario.");
    }
  };
  

  // Agregar nuevo empleado
  const handleAdd = async () => {
    try {
      if (!nuevoEmpleado.nombre || !nuevoEmpleado.apellido || !nuevoEmpleado.email || !nuevoEmpleado.telefono) {
        alert("Faltan datos obligatorios");
        return;
      }
      // Envia id_sucursal como id_sucursal (o null)
      const payload = { ...nuevoEmpleado };
      if (!payload.id_sucursal) payload.id_sucursal = null;
      await axios.post("http://localhost:3001/api/addWorker", payload);
      setNuevoEmpleado({ nombre: "", apellido: "", email: "", telefono: "", foto_url: "" });
      fetchEmpleados();
    } catch (err) {
      console.error("Error agregando empleado:", err);
    }
  };

  // Eliminar empleado
  const handleDelete = async (emp) => {
    // ahora mostramos confirmación para inactivar
    setDeleteId(emp.id)
  };

  const toggleActivo = async (empId, nuevoEstado) => {
    try {
      await axios.put(`http://localhost:3001/api/setWorkerActivo/${empId}`, { activo: nuevoEstado });
      fetchEmpleados();
    } catch (err) {
      console.error('Error cambiando estado:', err);
    }
  }

  // Iniciar edición
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setEditValues({
      nombre: emp.nombre,
      apellido: emp.apellido,
      sucursal: emp.sucursal,
      email: emp.email,
      telefono: emp.telefono,
      foto_url: emp.foto_url || ""
    });
  };

  // Guardar cambios
  const handleSave = async (id) => {
    try {
      const payload = { ...editValues };
      if (!payload.id_sucursal) payload.id_sucursal = null;
      console.log("Updating worker payload:", payload);
      await axios.put(`http://localhost:3001/api/updateWorker/${id}`, payload);
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

  const handleDeleteConfirmado = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/deleteWorker/${id}`);
      fetchEmpleados();
    } catch (err) {
      console.error("Error eliminando empleado:", err);
    }
  }

  const handleCancelDelete = () => {
    setDeleteId(null)
  }

  return (
    <div className="configuracionContainer">
      <h2>Configuración de Empleados</h2>

      <div className="input-search-container">
          <input
            type="text"
            className="input-search"
            placeholder="Empleados..."
            value={filtroConf}
            onChange={(e) => setFiltroConf(e.target.value)}
          />
          {filtroConf && (
            <button
              className="input-search-clear"
              onClick={() => setFiltroConf("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
      </div>

      <ul className="configuracionLista">
        <div className="configuracionLista">
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
                {/* Select de sucursales en edición */}
                <select
                  value={editValues.id_sucursal || ""}
                  onChange={(e) => setEditValues({ ...editValues, id_sucursal: e.target.value || null, sucursal: (sucursales.find(s => String(s.id) === e.target.value) || {}).nombre || editValues.sucursal })}
                >
                  <option value="">-- Mantener sucursal --</option>
                  {sucursales.map((s) => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>
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
            ) : deleteId == emp.id ? (
              <div className="editContainer">
                  <button className="configuracionBoton configuracionBotonGuardar" onClick={() => handleDeleteConfirmado(emp.id)}>
                   🗑️ Borrar
                  </button>
                  <button className="configuracionBoton configuracionBotonCancelar" onClick={handleCancelDelete}>
                    ❌ Cancelar
                  </button>
              </div>
            ) : (
              <>
                <img src={emp.foto_url || "https://via.placeholder.com/50"} alt="foto" className="configuracionFoto" />
                <span>{emp.nombre} {emp.apellido}</span>
                {/* Mostrar botón para inactivar/reactivar */}
                {emp.activo === 1 || emp.activo === undefined ? (
                  <button className="configuracionBoton configuracionBotonEliminar" onClick={() => toggleActivo(emp.id, 0)}>
                    🚫 Inactivar
                  </button>
                ) : (
                  <button className="configuracionBoton configuracionBotonAgregar" onClick={() => toggleActivo(emp.id, 1)}>
                    ✅ Reactivar
                  </button>
                )}
                <button
                  className="configuracionBoton configuracionBotonEditar"
                  onClick={() => handleEdit(emp)}
                >
                  ✏ Editar
                </button>
                <button
                  className="configuracionBoton configuracionBotonEliminar"
                  onClick={() => handleDelete(emp)}
                >
                  🗑 Eliminar
                </button>
              </>
            )}
          </li>
        ))}
        </div>
      </ul>

      <div style={{ marginTop: 12 }}>
        <label style={{ color: '#fff' }}>
          <input type="checkbox" checked={mostrarInactivos} onChange={(e) => setMostrarInactivos(e.target.checked)} /> Mostrar inactivos
        </label>
      </div>

  <h3 className="textAgregar">Agregar nuevo empleado</h3>
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
      {/* Reemplazar input de sucursal por select con sucursales disponibles */}
      <label style={{ display: 'block', marginTop: '8px', color: '#fff' }}>Sucursal</label>
      <select
        className="configuracionInput"
        value={nuevoEmpleado.id_sucursal || ""}
        onChange={(e) => setNuevoEmpleado({ ...nuevoEmpleado, id_sucursal: e.target.value || null, sucursal: (sucursales.find(s => String(s.id) === e.target.value) || {}).nombre || "" })}
      >
        <option value="">-- Seleccionar sucursal --</option>
        {sucursales.map((s) => (
          <option key={s.id} value={s.id}>{s.nombre}</option>
        ))}
      </select>
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

  <h3 className="textConfig">Configurar horarios</h3>
  <h4 className="textTarde">Hora tarde</h4>
      <input
        className="confiTiempo"
        type="time"
        value={horarioTarde}
        onChange={(e) => setHorarioTarde(e.target.value)}
      />
      <button className="configuracionBotonAgregar" onClick={handleHorario}>
        ➕ Actualizar horario
      </button>
    </div>
  );
}
