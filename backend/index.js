import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { getWorkersController, addWorkerController, updateWorkerController } from "./controllers/workersController.js";
import { setWorkerActivoController } from "./controllers/workersController.js";
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

app.use(cors({
  origin: "http://localhost:5174", // Cambiar a 5174 para que coincida con el frontend
  credentials: true,               // importante para cookies
}));
app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos subidos
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
import { dirname } from 'path';
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// multer for file uploads
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads', 'workers'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Map common mimetypes to preferred extensions to avoid .jfif
    const mimeExtMap = {
      'image/jpeg': '.jpg',
      'image/pjpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
      'image/svg+xml': '.svg'
    };
    const extFromMime = mimeExtMap[file.mimetype] || path.extname(file.originalname) || '';
    cb(null, `${unique}${extFromMime}`);
  }
});

// Accept only images
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes.'), false);
    }
  }
});

// Auth
app.use("/api", authRoutes);

//Sucursales
app.get("/api/getSucursales", getSucursalesController);
app.post("/api/addSucursal", addSucursalController);
app.put("/api/updateSucursal/:id", updateSucursalController);
app.delete("/api/deleteSucursal/:id", deleteSucursalController);

// Workers
app.get("/api/getWorkers", getWorkersController);
// Use upload.single('foto') for endpoints that accept a photo file field named 'foto'
app.post("/api/addWorker", upload.single('foto'), addWorkerController);
app.put("/api/updateWorker/:id", upload.single('foto'), updateWorkerController);
app.put("/api/setWorkerActivo/:id", setWorkerActivoController);

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
