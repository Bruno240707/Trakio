import db from "../repositories/db.js";

export async function getLineDataGeneral(queryParams) {
  let { year, month } = queryParams;
  if (!year || !month) {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
  } else {
    year = parseInt(year);
    month = parseInt(month);
  }

  const semanasDias = [[], [], [], []];
  const lastDay = new Date(year, month, 0).getDate();
  for (let day = 1; day <= lastDay && day <= 30; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const fechaStr = date.toISOString().slice(0, 10);
      if (day >= 1 && day <= 7) semanasDias[0].push(fechaStr);
      else if (day >= 8 && day <= 15) semanasDias[1].push(fechaStr);
      else if (day >= 16 && day <= 23) semanasDias[2].push(fechaStr);
      else if (day >= 24 && day <= 30) semanasDias[3].push(fechaStr);
    }
  }

  const workers = await queryDb("SELECT id FROM workers");
  const empleados = workers.map(w => w.id);

  const query = `
    WITH primeras_entradas AS (
      SELECT worker_id, DATE(created_at) AS fecha_local, TIME(created_at) AS hora_local
      FROM (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY worker_id, DATE(created_at) ORDER BY created_at ASC) AS rn
        FROM eventos
        WHERE event_type IN ('door-unlocked-from-app','hiplock-door-lock-open-log-event')
          AND YEAR(created_at) = ? AND MONTH(created_at) = ?
      ) t
      WHERE rn = 1
    )
    SELECT worker_id, fecha_local, hora_local
    FROM primeras_entradas
  `;

  const results = await queryDb(query, [year, month]);

  const entradasPorDia = {};
  results.forEach(r => {
    const fechaStr = new Date(r.fecha_local).toISOString().slice(0,10);
    if (!entradasPorDia[fechaStr]) entradasPorDia[fechaStr] = {};
    entradasPorDia[fechaStr][r.worker_id] = r.hora_local;
  });

  const semanas = [
    { label: "Semana 1", temprano: 0, tarde: 0, ausente: 0, dias: semanasDias[0].length },
    { label: "Semana 2", temprano: 0, tarde: 0, ausente: 0, dias: semanasDias[1].length },
    { label: "Semana 3", temprano: 0, tarde: 0, ausente: 0, dias: semanasDias[2].length },
    { label: "Semana 4", temprano: 0, tarde: 0, ausente: 0, dias: semanasDias[3].length }
  ];
  const limiteTemprano = "09:00:00";

  semanasDias.forEach((diasSemana, semanaIdx) => {
    diasSemana.forEach(fecha => {
      empleados.forEach(workerId => {
        const hora_local = entradasPorDia[fecha]?.[workerId];
        if (!hora_local) {
          semanas[semanaIdx].ausente++;
        } else if (hora_local < limiteTemprano) {
          semanas[semanaIdx].temprano++;
        } else {
          semanas[semanaIdx].tarde++;
        }
      });
    });
  });

  return semanas.map(s => ({
    label: s.label,
    temprano: s.dias ? Number((s.temprano / s.dias).toFixed(2)) : 0,
    tarde: s.dias ? Number((s.tarde / s.dias).toFixed(2)) : 0,
    ausente: s.dias ? Number((s.ausente / s.dias).toFixed(2)) : 0
  }));
}

export async function getEventsByWorkerAndDate(workerId, queryParams) {
  let { year, month, day } = queryParams;
  if (!year || !month || !day) {
    const today = new Date();
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString();
    day = today.getDate().toString();
  }
  let query = `
    SELECT created_at
    FROM eventos
    WHERE worker_id = ?
      AND event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
  `;
  const params = [workerId];
  if (year) { query += " AND YEAR(created_at) = ?"; params.push(year); }
  if (month) { query += " AND MONTH(created_at) = ?"; params.push(month); }
  if (day) { query += " AND DAY(created_at) = ?"; params.push(day); }
  query += " ORDER BY created_at ASC";
  const results = await queryDb(query, params);
  let isEntrada = true;
  return results.map(row => {
    const dateObj = new Date(row.created_at);
    const label = dateObj.toTimeString().slice(0, 5);
    const tipo = isEntrada ? "Entradas" : "Salidas";
    isEntrada = !isEntrada;
    return { label, Entradas: tipo === "Entradas" ? 1 : 0, Salidas: tipo === "Salidas" ? 1 : 0 };
  });
}

export async function getBarData() {
  return [
    { label: "8AM", Entradas: 1, Salidas: 30 },
    { label: "9AM", Entradas: 25, Salidas: 35 },
    { label: "10AM", Entradas: 30, Salidas: 10 },
    { label: "11AM", Entradas: 28, Salidas: 32 },
    { label: "12PM", Entradas: 12, Salidas: 20 },
    { label: "13PM", Entradas: 22, Salidas: 15 },
    { label: "14PM", Entradas: 42, Salidas: 25 },
    { label: "15PM", Entradas: 12, Salidas: 35 },
    { label: "16PM", Entradas: 22, Salidas: 25 },
    { label: "17PM", Entradas: 42, Salidas: 15 },
    { label: "18PM", Entradas: 22, Salidas: 15 },
  ];
}

export async function getDashboardStats() {
  const queryTotalEmpleados = "SELECT COUNT(*) AS total FROM workers";
  const queryLlegadas = `
    WITH primera_llegada AS (
      SELECT *,
             ROW_NUMBER() OVER (
               PARTITION BY worker_id, DATE(created_at)
               ORDER BY created_at
             ) AS rn
      FROM eventos
      WHERE event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
    )
    SELECT 
      SUM(CASE WHEN TIME(created_at) <= '15:00:00' THEN 1 ELSE 0 END) AS llegadas_a_tiempo,
      SUM(CASE WHEN TIME(created_at) >  '15:00:00' THEN 1 ELSE 0 END) AS llegadas_tarde
    FROM primera_llegada
    WHERE rn = 1;
  `;
  const totalResults = await queryDb(queryTotalEmpleados);
  const llegadasResults = await queryDb(queryLlegadas);
  return {
    totalEmpleados: totalResults[0]?.total || 0,
    llegadasATiempo: llegadasResults[0]?.llegadas_a_tiempo || 0,
    llegadasTarde: llegadasResults[0]?.llegadas_tarde || 0,
  };
}

export async function getWorkerEventsToday() {
  const query = `
    WITH eventos_filtrados AS (
      SELECT *
      FROM eventos
      WHERE 
        event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
        AND DATE(created_at) = CURDATE()
    ),
    numerados AS (
      SELECT *,
             ROW_NUMBER() OVER (
               PARTITION BY worker_id, DATE(created_at)
               ORDER BY created_at
             ) - 1 AS evento_previo_count
      FROM eventos_filtrados
    )
    SELECT *,
           CASE 
             WHEN MOD(evento_previo_count, 2) = 0 THEN 'Entrance'
             ELSE 'Exit'
           END AS event_direction
    FROM numerados
    WHERE created_at >= CURDATE()
    ORDER BY created_at DESC;
  `;
  return queryDb(query);
}

export async function getLineDataByWorker(workerId, queryParams) {
  let { year, month } = queryParams;
  if (!year || !month) {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
  } else {
    year = parseInt(year);
    month = parseInt(month);
  }

  const diasHabiles = [];
  const lastDay = new Date(year, month, 0).getDate();
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      diasHabiles.push(date.toISOString().slice(0, 10));
    }
  }

  const query = `
    WITH primeras_entradas AS (
      SELECT DATE(created_at) AS fecha_local, TIME(created_at) AS hora_local
      FROM (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY worker_id, DATE(created_at) ORDER BY created_at ASC) AS rn
        FROM eventos
        WHERE worker_id = ? 
          AND event_type IN ('door-unlocked-from-app','hiplock-door-lock-open-log-event')
          AND YEAR(created_at) = ? AND MONTH(created_at) = ?
      ) t
      WHERE rn = 1
    )
    SELECT * FROM primeras_entradas
  `;

  const results = await queryDb(query, [workerId, year, month]);
  const registrosMap = {};
  results.forEach(r => {
    const fechaStr = new Date(r.fecha_local).toISOString().slice(0,10);
    const [h,m,s] = r.hora_local.split(":").map(Number);
    const horaSec = h*3600 + m*60 + s;
    registrosMap[fechaStr] = horaSec;
  });

  const semanas = [1,2,3,4,5].map(n => ({ semana: n, temprano: 0, tarde: 0, ausente: 0 }));
  const limiteTemprano = 9*3600;
  diasHabiles.forEach(fecha => {
    const dia = new Date(fecha).getDate();
    const semana = Math.ceil(dia/7);
    const hora = registrosMap[fecha];
    if (hora === undefined) semanas[semana-1].ausente++;
    else if (hora < limiteTemprano) semanas[semana-1].temprano++;
    else semanas[semana-1].tarde++;
  });
  return semanas.map((s,i) => ({ label: `Semana ${i+1}`, temprano: s.temprano, tarde: s.tarde, ausente: s.ausente }));
}

export async function getAttendanceDoughnutByWorker(workerId, queryParams) {
  let { year, month } = queryParams;
  if (!year || !month) {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
  } else {
    year = parseInt(year);
    month = parseInt(month);
  }
  const today = new Date();
  const lastDay = (year === today.getFullYear() && month === today.getMonth() + 1) ? today.getDate() : new Date(year, month, 0).getDate();
  const diasHabiles = [];
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) diasHabiles.push(date.toISOString().slice(0, 10));
  }
  const query = `
    WITH primeras_entradas AS (
      SELECT 
        DATE(created_at) AS fecha_local,
        TIME(created_at) AS hora_local,
        ROW_NUMBER() OVER (
          PARTITION BY DATE(created_at)
          ORDER BY created_at ASC
        ) AS rn
      FROM eventos
      WHERE 
        event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
        AND worker_id = ?
        AND YEAR(created_at) = ?
        AND MONTH(created_at) = ?
    )
    SELECT fecha_local, hora_local
    FROM primeras_entradas
    WHERE rn = 1
  `;
  const results = await queryDb(query, [workerId, year, month]);
  let aTiempo = 0, tardanza = 0, inasistencia = 0;
  diasHabiles.forEach(dia => {
    const registro = results.find(r => r.fecha_local.toISOString().slice(0, 10) === dia);
    if (!registro) inasistencia++;
    else if (registro.hora_local < "09:00:00") aTiempo++;
    else tardanza++;
  });
  return [
    { label: "A Tiempo", value: aTiempo, color: "#18b2e7" },
    { label: "Tardanza", value: tardanza, color: "#3877f0" },
    { label: "Inasistencia", value: inasistencia, color: "#e63946" }
  ];
}

export async function getEventsAllWorkers(queryParams) {
  let { year, month, week } = queryParams;
  const today = new Date();
  if (!year || !month) {
    year = today.getFullYear();
    month = today.getMonth() + 1;
  } else {
    year = parseInt(year);
    month = parseInt(month);
  }
  week = parseInt(week) || 0;

  const diasHabiles = [];
  const lastDay = new Date(year, month, 0).getDate();
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) diasHabiles.push(date);
  }
  let diasFiltrados = diasHabiles;
  if (week >= 1 && week <= 4) {
    const inicio = (week - 1) * 7;
    diasFiltrados = diasHabiles.slice(inicio, Math.min(inicio + 7, diasHabiles.length));
  }
  const fechasStr = diasFiltrados.map(d => d.toISOString().slice(0,10));
  if (fechasStr.length === 0) return [];
  const placeholders = fechasStr.map(() => '?').join(',');
  const query = `
    SELECT created_at
    FROM eventos
    WHERE event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
      AND DATE(created_at) IN (${placeholders})
    ORDER BY created_at ASC
  `;
  const results = await queryDb(query, fechasStr);
  const dataMap = {};
  results.forEach(row => {
    const dateObj = new Date(row.created_at);
    const hh = dateObj.getHours();
    const mm = Math.floor(dateObj.getMinutes() / 10) * 10;
    const timeLabel = `${hh.toString().padStart(2,'0')}:${mm.toString().padStart(2,'0')}`;
    if (!dataMap[timeLabel]) dataMap[timeLabel] = { label: timeLabel, Entradas: 0, Salidas: 0 };
    if (dataMap[timeLabel].Entradas <= dataMap[timeLabel].Salidas) dataMap[timeLabel].Entradas++;
    else dataMap[timeLabel].Salidas++;
  });
  return Object.values(dataMap).sort((a,b) => a.label.localeCompare(b.label));
}

export async function getAttendanceDoughnutAllWorkers(queryParams) {
  let { year, month } = queryParams;
  const today = new Date();
  if (!year || !month) {
    year = today.getFullYear();
    month = today.getMonth() + 1;
  } else {
    year = parseInt(year);
    month = parseInt(month);
  }
  const lastDay = (year === today.getFullYear() && month === today.getMonth() + 1) ? today.getDate() : new Date(year, month, 0).getDate();
  const diasHabiles = [];
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) diasHabiles.push(date.toISOString().slice(0, 10));
  }
  const query = `
    WITH primeras_entradas AS (
      SELECT 
        worker_id,
        DATE(created_at) AS fecha_local,
        TIME(created_at) AS hora_local,
        ROW_NUMBER() OVER (
          PARTITION BY worker_id, DATE(created_at)
          ORDER BY created_at ASC
        ) AS rn
      FROM eventos
      WHERE 
        event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
        AND YEAR(created_at) = ?
        AND MONTH(created_at) = ?
    )
    SELECT worker_id, fecha_local, hora_local
    FROM primeras_entradas
    WHERE rn = 1
  `;
  const results = await queryDb(query, [year, month]);
  const workerIds = [...new Set(results.map(r => r.worker_id))];
  let aTiempo = 0, tardanza = 0, inasistencia = 0;
  workerIds.forEach(workerId => {
    diasHabiles.forEach(dia => {
      const registro = results.find(r => r.worker_id === workerId && r.fecha_local.toISOString().slice(0,10) === dia);
      if (!registro) inasistencia++;
      else if (registro.hora_local < "09:00:00") aTiempo++;
      else tardanza++;
    });
  });
  return [
    { label: "A Tiempo", value: aTiempo, color: "#18b2e7" },
    { label: "Tardanza", value: tardanza, color: "#3877f0" },
    { label: "Inasistencia", value: inasistencia, color: "#e63946" }
  ];
}

function queryDb(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

