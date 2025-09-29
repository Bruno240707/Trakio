import { querySucursales, insertSucursal, updateSucursalById, deleteSucursalById } from "../repositories/sucursalesRepository.js";

export async function getSucursales(filtro) {
  let query = "SELECT id, nombre, direccion, telefono FROM sucursales";
  let valores = [];
  if (filtro) {
    query += " WHERE nombre LIKE ?";
    valores = [`${filtro}%`];
  }
  return querySucursales(query, valores);
}

export async function addSucursal(sucursal) {
  const { nombre, direccion, telefono } = sucursal;
  return insertSucursal(nombre, direccion, telefono);
}

export async function updateSucursal(sucursal) {
  const { id, nombre, direccion, telefono } = sucursal;
  return updateSucursalById(id, nombre, direccion, telefono);
}

export async function deleteSucursal(id) {
  return deleteSucursalById(id);
}
