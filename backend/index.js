import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());


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


// Users LogIn
app.get("/api/CompaniasRegistradas", (req, res) => {
  res.json([
    { nombre: "coca", contrasenia: "cola", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/2560px-Coca-Cola_logo.svg.png" },
    { nombre: "instagram", contrasenia: "instagram", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" },
    { nombre: "twitter", contrasenia: "twitter", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1245px-Logo_of_Twitter.svg.png" },
    { nombre: "facebook", contrasenia: "facebook", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtBILdC5ouxGYjeaYJPmVqMsSpsItocXSI5A&s" },
    { nombre: "trakio", contrasenia: "trakio2025", logo: "../frontend/src/Imagenes/logo.png" }
  ]);
});


// Registro E/S en tiempo real
app.get("/api/entradasSalidasTiempoReal", (req, res) => {
  res.json([
    { nombreEmpleado: "Ana Gómez", tipo: "entrada", hora: "08:15" },
    { nombreEmpleado: "Luis Pérez", tipo: "salida", hora: "17:30" },
    { nombreEmpleado: "María Fernández", tipo: "entrada", hora: "08:00" },
    { nombreEmpleado: "Carlos Díaz", tipo: "salida", hora: "18:00" },
    { nombreEmpleado: "Sofía Martínez", tipo: "entrada", hora: "08:05" },
  ]);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
