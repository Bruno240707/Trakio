import { getHoraEntradaTardeService, updateHoraEntradaTardeService } from "../services/configService.js";

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
