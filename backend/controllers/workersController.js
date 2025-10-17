import { getWorkers, addWorker, updateWorker, deleteWorker, setWorkerActivo } from "../services/workersService.js";

export async function getWorkersController(req, res) {
  try {
    const filtro = (req.query.filtro || "").trim();
    const sucursal = (req.query.sucursal || "").trim();
    // Por defecto, solo devolver activos (a menos que ?includeInactive=true)
    const includeInactive = req.query.includeInactive === 'true';
    const workers = await getWorkers(filtro, sucursal, includeInactive);
    res.json(workers);
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function addWorkerController(req, res) {
  try {
    const { nombre, apellido, email, telefono, foto_url, id_sucursal } = req.body;
    if (!nombre || !apellido || !email || !telefono) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const id = await addWorker({ nombre, apellido, email, telefono, foto_url, id_sucursal });
    res.json({ success: true, id });
  } catch (error) {
    console.error("Error al agregar trabajador:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function updateWorkerController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, foto_url, id_sucursal } = req.body;
    await updateWorker({ id, nombre, apellido, email, telefono, foto_url, id_sucursal });
    res.json({ success: true });
  } catch (error) {
    console.error("Error al modificar trabajador:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function deleteWorkerController(req, res) {
  try {
    const { id } = req.params;
    // Mantener por compatibilidad: seguir borrando físicamente si hace falta
    await deleteWorker(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar trabajador:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function setWorkerActivoController(req, res) {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    await setWorkerActivo(id, activo);
    res.json({ success: true });
  } catch (error) {
    console.error('Error al cambiar estado de trabajador:', error);
    if (error && error.code === 'NO_ACTIVO_COLUMN') {
      return res.status(400).json({ error: "La columna 'activo' no existe en la base de datos. Agregala con: ALTER TABLE workers ADD COLUMN activo TINYINT(1) DEFAULT 1" });
    }
    res.status(500).json({ error: 'Error en la consulta' });
  }
}

