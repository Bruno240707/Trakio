import { getHoraEntradaTarde, updateHoraEntradaTarde } from "../repositories/configRepository.js";

export async function getHoraEntradaTardeService() {
  return getHoraEntradaTarde();
}

export async function updateHoraEntradaTardeService(horaEntradaTarde) {
  return updateHoraEntradaTarde(horaEntradaTarde);
}

export async function getHoraEntradaTardeForQueries() {
  const results = await getHoraEntradaTarde();
  if (results.length === 0) {
    // Default fallback if no configuration is found
    return "09:00:00";
  }
  return results[0].hora_entrada_tarde;
}
