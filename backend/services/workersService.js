import { queryWorkers, insertWorker, updateWorkerById, deleteWorkerById } from "../repositories/workerRepository.js";

export async function getWorkers(filtro, sucursal) {
  let query = "SELECT id, nombre, apellido, foto_url, id_sucursal FROM workers";
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

  // Si hay condiciones, las uno con AND
  if (condiciones.length > 0) {
    query += " WHERE " + condiciones.join(" AND ");
  }

  return queryWorkers(query, valores);
}

export async function addWorker(worker) {
  const { nombre, apellido, email, telefono, foto_url } = worker;
  return insertWorker(nombre, apellido, email, telefono, foto_url);
}

export async function updateWorker(worker) {
  const { id, nombre, apellido, email, telefono, foto_url } = worker;
  return updateWorkerById(id, nombre, apellido, email, telefono, foto_url);
}

export async function deleteWorker(id) {
  return deleteWorkerById(id);
}
