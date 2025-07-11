import express from "express";
import cors from "cors";
import db from "./db.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "trakio_super_secreta_12345!@#";

function verificarPassword(plainPassword, hashedPassword) {
  const [algorithm, iterationsStr, salt, storedHash] = hashedPassword.split("$");
  const iterations = parseInt(iterationsStr, 10);

  return new Promise((resolve, reject) => {
    if (!salt || !storedHash || !iterationsStr || !algorithm) {
      return reject(new Error("Hash mal formado"));
    }

    crypto.pbkdf2(plainPassword, salt, iterations, 32, "sha256", (err, derivedKey) => {
      if (err) return reject(err);
      const derivedBase64 = derivedKey.toString("base64");
      resolve(derivedBase64 === storedHash);
    });
  });
}

// Users LogIn
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT id, username, password FROM restapi_user WHERE username = ?`;

  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

    const user = results[0];
    const isValid = await verificarPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      user: { id: user.id, username: user.username },
      token
    });
  });
});

// traer Workers
app.get("/api/getWorkers", (req, res) => {
  const filtro = req.query.filtro?.trim() || "";

  let query = `
    SELECT id, nombre, apellido, foto_url 
    FROM workers 
  `;
  let valores = [];

  if (filtro.includes(" ")) {
    // filtro tiene espacio => "nombre apellido"
    const [nombreFiltro, apellidoFiltro] = filtro.split(" ", 2);
    query += " WHERE nombre LIKE ? AND apellido LIKE ?";
    valores = [`${nombreFiltro}%`, `${apellidoFiltro}%`];
  } else {
    // filtro sin espacio => solo nombre
    query += " WHERE nombre LIKE ?";
    valores = [`${filtro}%`];
  }

  db.query(query, valores, (err, results) => {
    if (err) {
      console.error("Error al obtener los trabajadores:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});


// Grafico en lineas
app.get("/api/lineData", (req, res) => {
  res.json([
    { label: "Lunes", Regularidad: 100},
    { label: "Martes", Regularidad: 70 },
    { label: "Miercoles", Regularidad: 90 },
    { label: "Jueves", Regularidad: 75 },
    { label: "Viernes", Regularidad:85 },
    { label: "Sabado", Regularidad:5 },
    { label: "Domingo", Regularidad:4 }
  ]);
});

app.get("/api/eventsEntradasSalidasByWorkerAndDate/:workerId", (req, res) => {
  const workerId = req.params.workerId;
  let { year, month, day } = req.query;

  if (!year && !month && !day) {
    const today = new Date();
    year = today.getFullYear().toString();
    month = (today.getMonth() + 1).toString(); // getMonth() da 0-11
    day = today.getDate().toString();
  }
  
  let query = `
    SELECT created_at
    FROM eventos
    WHERE worker_id = ?
      AND event_type IN ('door-unlocked-from-app', 'hiplock-door-lock-open-log-event')
  `;

  const params = [workerId];

  if (year) {
    query += " AND YEAR(created_at) = ?";
    params.push(year);
  }
  if (month) {
    query += " AND MONTH(created_at) = ?";
    params.push(month);
  }
  if (day) {
    query += " AND DAY(created_at) = ?";
    params.push(day);
  }

  query += " ORDER BY created_at ASC";

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error en la consulta de eventos:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    // Tomar los primeros dos y últimos dos eventos
    const selectedEvents = [];
    if (results.length >= 2) {
      selectedEvents.push(results[0]);
      if (results.length > 1) selectedEvents.push(results[1]);
      if (results.length > 3) {
        selectedEvents.push(results[results.length - 2]);
        selectedEvents.push(results[results.length - 1]);
      }
    } else {
      selectedEvents.push(...results);
    }

    // Asignar alternancia Entrada/Salida
    let isEntrada = true;
    const responseData = selectedEvents.map(row => {
      const dateObj = new Date(row.created_at);
      const label = dateObj.toTimeString().slice(0,5); // HH:mm
      const tipo = isEntrada ? "Entradas" : "Salidas";
      isEntrada = !isEntrada;
      return {
        label,
        Entradas: tipo === "Entradas" ? 1 : 0,
        Salidas: tipo === "Salidas" ? 1 : 0
      };
    });

    res.json(responseData);
  });
});


// Grafico en rueda
app.get("/api/doughnutData", (req, res) => {
  res.json([
    { label: "A Tiempo", value: 70 },
    { label: "Tardanzas", value: 30 }
  ]);
});


// Grafico en barras
app.get("/api/barData", (req, res) => {
  res.json([
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

  ]);
});

app.get("/api/dashboardStats", (req, res) => {
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

  db.query(queryTotalEmpleados, (err, totalResults) => {
    if (err) {
      console.error("Error al obtener total empleados:", err);
      return res.status(500).json({ error: "Error en la consulta total empleados" });
    }

    db.query(queryLlegadas, (err, llegadasResults) => {
      if (err) {
        console.error("Error al obtener llegadas:", err);
        return res.status(500).json({ error: "Error en la consulta llegadas" });
      }

      const totalEmpleados = totalResults[0].total || 0;
      const llegadasATiempo = llegadasResults[0].llegadas_a_tiempo || 0;
      const llegadasTarde = llegadasResults[0].llegadas_tarde || 0;

      res.json({
        totalEmpleados,
        llegadasATiempo,
        llegadasTarde
      });
    });
  });
});




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Registro E/S en tiempo real
app.get("/api/entradasSalidasTiempoReal", (req, res) => {
  res.json([
    { nombreEmpleado: "Jose Alfonso", tipo: "entrada", hora: "18:05"},
    { nombreEmpleado: "Ana Gómez", tipo: "entrada", hora: "13:05" },
    { nombreEmpleado: "Luis Pérez", tipo: "salida", hora: "12:05" },
    { nombreEmpleado: "María Fernández", tipo: "entrada", hora: "11:05" },
    { nombreEmpleado: "Carlos Díaz", tipo: "salida", hora: "11:00" },
    { nombreEmpleado: "Sofía Martínez", tipo: "entrada", hora: "09:00" },
    { nombreEmpleado: "Nicolas Blaser", tipo: "salida", hora: "08:30 " },
    { nombreEmpleado: "Salvador Soncini", tipo: "entrada", hora: " 08:15"},
    { nombreEmpleado: "Jose Alfonso", tipo: "entrada", hora: "08:05"  },

  ]);
});


// query para las entradas y salida de los workers en tiempo real del dia de hoy
app.get("/api/worker-events", (req, res) => {
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

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener eventos de entrada/salida:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    res.json(results);
  });
});

