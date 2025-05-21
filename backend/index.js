import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/lineData", (req, res) => {
  res.json([
    { label: "Lunes", Regularidad: 100},
    { label: "Martes", Regularidad: 30 },
    { label: "Miercoles", Regularidad: 40 },
    { label: "Jueves", Regularidad: 50 },
    { label: "Viernes", Regularidad: 20 }
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
    { label: "10AM", Entradas: 30, Salidas: 40 },
    { label: "11AM", Entradas: 28, Salidas: 42 },
    { label: "12PM", Entradas: 32, Salidas: 45 },
    { label: "13PM", Entradas: 32, Salidas: 45 },
    { label: "14PM", Entradas: 32, Salidas: 45 },
  ]);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
