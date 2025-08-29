import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./repositories/db.js";
import { loginController } from "./controllers/authController.js";
import { getWorkersController, addWorkerController, updateWorkerController, deleteWorkerController } from "./controllers/workersController.js";
import {
  lineDataGeneralController,
  eventsByWorkerAndDateController,
  barDataController,
  dashboardStatsController,
  workerEventsTodayController,
  lineDataByWorkerController,
  attendanceDoughnutByWorkerController,
  eventsAllWorkersController,
  attendanceDoughnutAllWorkersController,
} from "./controllers/chartsController.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Auth
app.post("/api/login", loginController);

// Workers
app.get("/api/getWorkers", getWorkersController);
app.post("/api/addWorker", addWorkerController);
app.put("/api/updateWorker/:id", updateWorkerController);
app.delete("/api/deleteWorker/:id", deleteWorkerController);

// Charts and dashboards
app.get("/api/lineData", lineDataGeneralController);
app.get("/api/eventsEntradasSalidasByWorkerAndDate/:workerId", eventsByWorkerAndDateController);
app.get("/api/barData", barDataController);
app.get("/api/dashboardStats", dashboardStatsController);
app.get("/api/worker-events", workerEventsTodayController);
app.get("/api/lineData/:workerId", lineDataByWorkerController);
app.get("/api/attendanceDoughnut/:workerId", attendanceDoughnutByWorkerController);
app.get("/api/eventsEntradasSalidasAllWorkers", eventsAllWorkersController);
app.get("/api/attendanceDoughnutAllWorkers", attendanceDoughnutAllWorkersController);


app.post('/api/configurar-hora-entrada', (req, res) => {
  const { horaEntradaTarde } = req.body;

  if (!horaEntradaTarde) {
    return res.status(400).json({ error: 'Falta horaEntradaTarde' });
  }

  db.query(
    'UPDATE configuracion_horarios SET hora_entrada_tarde = ? WHERE id = 1',
    [horaEntradaTarde],
    (err, result) => {
      if (err) {
        console.error("Error actualizando hora:", err);
        return res.status(500).json({ error: 'Error actualizando hora' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Configuración no encontrada' });
      }

      res.json({ message: 'Hora actualizada correctamente' });
    }
  );
});


app.get('/api/configurar-hora-entrada', (req, res) => {
  console.log("GET /api/configurar-hora-entrada");

  db.query(
    'SELECT hora_entrada_tarde FROM configuracion_horarios WHERE id = 1',
    (err, results) => {
      if (err) {
        console.error("Error obteniendo hora:", err); // Aquí ya lo haces
        return res.status(500).send('Error obteniendo hora: ' + err.message);
      }

      if (results.length === 0) {
        console.log("No hay resultados para ID 1");
        return res.status(404).send('Configuración no encontrada');
      }

      res.json({ horaEntradaTarde: results[0].hora_entrada_tarde });
    }
  );
});




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

