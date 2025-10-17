import { queryWorkers, insertWorker, updateWorkerById, deleteWorkerById, setWorkerActivoById } from "../repositories/workerRepository.js";

export async function getWorkers(filtro, sucursal, includeInactive = false) {
  // Intentamos incluir la columna activo si existe; si no, hacemos fallback
  let condiciones = [];
  let valores = [];

  // --- FILTRO DE NOMBRE / APELLIDO ---
  if (filtro) {
    if (filtro.includes(" ")) {
      const [nombreFiltro, apellidoFiltro] = filtro.split(" ", 2);
      condiciones.push("nombre LIKE ? AND apellido LIKE ?");
      valores.push(`${nombreFiltro}%`, `${apellidoFiltro}%`);
    } else {
      condiciones.push("(nombre LIKE ? OR apellido LIKE ?)");
      valores.push(`${filtro}%`, `${filtro}%`);
    }
  }

  // --- FILTRO DE SUCURSAL ---
  if (sucursal) {
    condiciones.push("id_sucursal = ?");
    valores.push(sucursal);
  }

  // Excluir inactivos por defecto
  if (!includeInactive) {
    condiciones.push("activo = 1");
  }

  // Construyo dos queries: uno que incluye la columna activo y otro fallback sin ella
  const queryWithActivo = "SELECT id, nombre, apellido, foto_url, id_sucursal, activo FROM workers" + (condiciones.length ? " WHERE " + condiciones.join(" AND ") : "");

  const condicionesFallback = condiciones.filter(c => c !== "activo = 1");
  const queryFallback = "SELECT id, nombre, apellido, foto_url, id_sucursal FROM workers" + (condicionesFallback.length ? " WHERE " + condicionesFallback.join(" AND ") : "");

  try {
    return await queryWorkers(queryWithActivo, valores);
  } catch (err) {
    // Si la columna activo no existe, volvemos al fallback
    if (err && err.code === 'ER_BAD_FIELD_ERROR') {
      return await queryWorkers(queryFallback, valores);
    }
    throw err;
  }
}

export async function addWorker(worker) {
  const { nombre, apellido, email, telefono, foto_url, id_sucursal, activo } = worker;
  return insertWorker(nombre, apellido, email, telefono, foto_url, id_sucursal, activo !== undefined ? activo : 1);
}

export async function updateWorker(worker) {
  const { id, nombre, apellido, email, telefono, foto_url, id_sucursal, activo } = worker;
  return updateWorkerById(id, nombre, apellido, email, telefono, foto_url, id_sucursal, activo);
}

export async function setWorkerActivo(id, activo) {
  const res = await setWorkerActivoById(id, activo ? 1 : 0);
  if (res === false) {
    const err = new Error("La columna 'activo' no existe en la base de datos");
    err.code = 'NO_ACTIVO_COLUMN';
    throw err;
  }
  return res;
}

export async function deleteWorker(id) {
  return deleteWorkerById(id);
}
