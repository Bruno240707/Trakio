import { queryWorkers, insertWorker, updateWorkerById, deleteWorkerById } from "../repositories/workerRepository.js";

export async function getWorkers(filtro) {
  let query = "SELECT id, nombre, apellido, foto_url, id_sucursal FROM workers";
  let valores = [];
  if (filtro.includes(" ")) {
    const [nombreFiltro, apellidoFiltro] = filtro.split(" ", 2);
    query += " WHERE nombre LIKE ? AND apellido LIKE ?";
    valores = [`${nombreFiltro}%`, `${apellidoFiltro}%`];
  } else {
    query += " WHERE nombre LIKE ?";
    valores = [`${filtro}%`];
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

