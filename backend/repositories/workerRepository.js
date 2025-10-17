import db from "./db.js";

export function queryWorkers(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function insertWorker(nombre, apellido, email, telefono, foto_url, id_sucursal, activo) {
  // Construir SQL dinámico según los valores que no sean undefined
  const columns = ["nombre", "apellido", "email", "telefono", "foto_url"];
  const values = [nombre, apellido, email, telefono, foto_url];
  if (id_sucursal !== undefined) {
    columns.push("id_sucursal");
    values.push(id_sucursal || null);
  }
  if (activo !== undefined) {
    columns.push("activo");
    values.push(activo ? 1 : 0);
  }
  const placeholders = columns.map(() => "?").join(", ");
  const query = `INSERT INTO workers (${columns.join(", ")}) VALUES (${placeholders})`;
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
}

export function updateWorkerById(id, nombre, apellido, email, telefono, foto_url, id_sucursal, activo) {
  const sets = [];
  const values = [];
  if (nombre !== undefined) { sets.push("nombre = ?"); values.push(nombre); }
  if (apellido !== undefined) { sets.push("apellido = ?"); values.push(apellido); }
  if (email !== undefined) { sets.push("email = ?"); values.push(email); }
  if (telefono !== undefined) { sets.push("telefono = ?"); values.push(telefono); }
  if (foto_url !== undefined) { sets.push("foto_url = ?"); values.push(foto_url); }
  if (id_sucursal !== undefined) { sets.push("id_sucursal = ?"); values.push(id_sucursal || null); }
  if (activo !== undefined) { sets.push("activo = ?"); values.push(activo ? 1 : 0); }
  if (sets.length === 0) return Promise.resolve(true);
  const query = `UPDATE workers SET ${sets.join(", ")} WHERE id = ?`;
  values.push(id);
  return new Promise((resolve, reject) => {
    db.query(query, values, (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

export function setWorkerActivoById(id, activo) {
  // Antes de intentar el UPDATE verifiquemos si la columna 'activo' existe
  return new Promise((resolve, reject) => {
    db.query("SHOW COLUMNS FROM workers LIKE 'activo'", (err, results) => {
      if (err) return reject(err);
      if (!results || results.length === 0) {
        // La columna no existe -> no hacemos el update y devolvemos false
        return resolve(false);
      }
      const query = `UPDATE workers SET activo = ? WHERE id = ?`;
      db.query(query, [activo ? 1 : 0, id], (err2) => {
        if (err2) return reject(err2);
        resolve(true);
      });
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

