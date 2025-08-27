import {
  getLineDataGeneral,
  getEventsByWorkerAndDate,
  getBarData,
  getDashboardStats,
  getWorkerEventsToday,
  getLineDataByWorker,
  getAttendanceDoughnutByWorker,
  getEventsAllWorkers,
  getAttendanceDoughnutAllWorkers,
} from "../services/chartsService.js";

export async function lineDataGeneralController(req, res) {
  try {
    const data = await getLineDataGeneral(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function eventsByWorkerAndDateController(req, res) {
  try {
    const data = await getEventsByWorkerAndDate(req.params.workerId, req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function barDataController(req, res) {
  try {
    const data = await getBarData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function dashboardStatsController(req, res) {
  try {
    const data = await getDashboardStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function workerEventsTodayController(req, res) {
  try {
    const data = await getWorkerEventsToday();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function lineDataByWorkerController(req, res) {
  try {
    const data = await getLineDataByWorker(req.params.workerId, req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function attendanceDoughnutByWorkerController(req, res) {
  try {
    const data = await getAttendanceDoughnutByWorker(req.params.workerId, req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function eventsAllWorkersController(req, res) {
  try {
    const data = await getEventsAllWorkers(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function attendanceDoughnutAllWorkersController(req, res) {
  try {
    const data = await getAttendanceDoughnutAllWorkers(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
}

