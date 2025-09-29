import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loginController } from "./controllers/authController.js";
import { getWorkersController, addWorkerController, updateWorkerController, deleteWorkerController } from "./controllers/workersController.js";
import { getHoraEntradaTardeController, updateHoraEntradaTardeController } from "./controllers/configController.js";
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
import {
  getSucursalesController,
  addSucursalController,
  updateSucursalController,
  deleteSucursalController,
} from "./controllers/sucursalesController.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Auth
app.post("/api/login", loginController);

//Sucursales
app.get("/api/getSucursales", getSucursalesController);
app.post("/api/addSucursal", addSucursalController);
app.put("/api/updateSucursal/:id", updateSucursalController);
app.delete("/api/deleteSucursal/:id", deleteSucursalController);

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

// Configuration
app.get("/api/configurar-hora-entrada", getHoraEntradaTardeController);
app.post("/api/configurar-hora-entrada", updateHoraEntradaTardeController);



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

