import db from "./db.js";

export function querySucursales(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function insertSucursal(nombre, direccion, telefono) {
  const query = `
    INSERT INTO sucursales (nombre, direccion, telefono)
    VALUES (?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [nombre, direccion, telefono], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
}

export function updateSucursalById(id, nombre, direccion, telefono) {
  const query = `
    UPDATE sucursales
    SET nombre = ?, direccion = ?, telefono = ?
    WHERE id = ?
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [nombre, direccion, telefono, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

export function deleteSucursalById(id) {
  const query = "DELETE FROM sucursales WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}
