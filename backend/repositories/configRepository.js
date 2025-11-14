import db from "./db.js";

export function getHoraEntradaTarde() {
  const query = "SELECT hora_entrada_tarde FROM configuracion_horarios WHERE id = 1";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function updateHoraEntradaTarde(horaEntradaTarde) {
  const query = "UPDATE configuracion_horarios SET hora_entrada_tarde = ? WHERE id = 1";
  return new Promise((resolve, reject) => {
    db.query(query, [horaEntradaTarde], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function getHoraDesde() {
  const query = "SELECT hora_desde FROM configuracion_horarios WHERE id = 1";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

export function updateHoraDesde(horaDesde) {
  const query = "UPDATE configuracion_horarios SET hora_desde = ? WHERE id = 1";
  return new Promise((resolve, reject) => {
    db.query(query, [horaDesde], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}