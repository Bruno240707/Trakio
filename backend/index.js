import express from "express";
import cors from "cors";
import db from "./db.js";
import fs from "fs";

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

// Users LogIn
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = `
    SELECT u.username, u.password
    FROM restapi_user u
    WHERE u.username = ? AND u.password = ?
  `;

  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });

    if (results.length > 0) {
      // Usuario encontrado y password coincide
      res.json({ success: true, user: results[0] });
    } else {
      // No encontrado o password incorrecta
      res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
  });
});

// traer Workers
app.get("/api/workers", (req, res) => {
  const query = `
    SELECT *
    FROM workers
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los trabajadores:", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }

    res.json(results);
  });
});

// traer usuarios registrados



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


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
