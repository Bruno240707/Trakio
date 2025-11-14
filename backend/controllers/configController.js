import { getHoraEntradaTardeService, updateHoraEntradaTardeService, getHoraDesdeService, updateHoraDesdeService  } from "../services/configService.js";

export async function getHoraEntradaTardeController(req, res) {
  try {
    const results = await getHoraEntradaTardeService();
    
    if (results.length === 0) {
      console.log("No hay resultados para ID 1");
      return res.status(404).send('Configuración no encontrada');
    }

    res.json({ horaEntradaTarde: results[0].hora_entrada_tarde });
  } catch (error) {
    console.error("Error obteniendo hora:", error);
    res.status(500).send('Error obteniendo hora: ' + error.message);
  }
}

export async function updateHoraEntradaTardeController(req, res) {
  try {
    const { horaEntradaTarde } = req.body;

    if (!horaEntradaTarde) {
      return res.status(400).json({ error: 'Falta horaEntradaTarde' });
    }

    const result = await updateHoraEntradaTardeService(horaEntradaTarde);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }

    res.json({ message: 'Hora actualizada correctamente' });
  } catch (error) {
    console.error("Error actualizando hora:", error);
    res.status(500).json({ error: 'Error actualizando hora' });
  }
}

export async function getHoraDesdeController(req, res) {
  try {
    const results = await getHoraDesdeService();

    if (results.length === 0) {
      return res.status(404).send('Configuración no encontrada');
    }

    res.json({ horaDesde: results[0].hora_desde });
  } catch (error) {
    console.error("Error obteniendo hora_desde:", error);
    res.status(500).send('Error obteniendo hora_desde: ' + error.message);
  }
}

export async function updateHoraDesdeController(req, res) {
  try {
    const { horaDesde } = req.body;

    if (!horaDesde) {
      return res.status(400).json({ error: 'Falta horaDesde' });
    }

    const result = await updateHoraDesdeService(horaDesde);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }

    res.json({ message: 'hora_desde actualizada correctamente' });
  } catch (error) {
    console.error("Error actualizando hora_desde:", error);
    res.status(500).json({ error: 'Error actualizando hora_desde' });
  }
}