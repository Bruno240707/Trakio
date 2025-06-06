import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/lineData", (req, res) => {
  res.json([
    { label: "Lunes", Regularidad: 100},
    { label: "Martes", Regularidad: 70 },
    { label: "Miercoles", Regularidad: 80 },
    { label: "Jueves", Regularidad: 75 },
    { label: "Viernes", Regularidad:85 },
    { label: "Sabado", Regularidad:5 },
    { label: "Domingo", Regularidad:4 }
  ]);
});

app.get("/api/doughnutData", (req, res) => {
  res.json([
    { label: "A Tiempo", value: 70 },
    { label: "Tardanzas", value: 30 }
  ]);
});

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

app.get("/api/CompaniasRegistradas", (req, res) => {
  res.json([
    { nombre: "Prueba", contrasenia: "Prueba" },
    { nombre: "Trakio Corp", contrasenia: "trakio123" },
    { nombre: "VisionSafe", contrasenia: "vs456secure" },
    { nombre: "SeguriCam", contrasenia: "cam789seg" },
    { nombre: "DataFlow", contrasenia: "flowpass321" },
    { nombre: "OjoDigital", contrasenia: "ojo!digital2024" }
  ]);
});

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
