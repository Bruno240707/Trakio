import db from "./db.js";

export function queryWorkers(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function insertWorker(nombre, apellido, email, telefono, foto_url) {
  const query = `
    INSERT INTO workers (nombre, apellido, email, telefono, foto_url)
    VALUES (?, ?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [nombre, apellido, email, telefono, foto_url], (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
}

export function updateWorkerById(id, nombre, apellido, email, telefono, foto_url) {
  const query = `
    UPDATE workers 
    SET nombre = ?, apellido = ?, email = ?, telefono = ?, foto_url = ?
    WHERE id = ?
  `;
  return new Promise((resolve, reject) => {
    db.query(query, [nombre, apellido, email, telefono, foto_url, id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

export function deleteWorkerById(id) {
  const query = "DELETE FROM workers WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

