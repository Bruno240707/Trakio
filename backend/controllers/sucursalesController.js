import { getSucursales, addSucursal, updateSucursal, deleteSucursal } from "../services/sucursalesService.js";

export async function getSucursalesController(req, res) {
  try {
    const filtro = (req.query.filtro || "").trim();
    const sucursales = await getSucursales(filtro);
    res.json(sucursales);
  } catch (error) {
    console.error("Error al obtener las sucursales:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function addSucursalController(req, res) {
  try {
    const { nombre, direccion, telefono } = req.body;
    if (!nombre || !direccion || !telefono) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const id = await addSucursal({ nombre, direccion, telefono });
    res.json({ success: true, id });
  } catch (error) {
    console.error("Error al agregar sucursal:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function updateSucursalController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono } = req.body;
    await updateSucursal({ id, nombre, direccion, telefono });
    res.json({ success: true });
  } catch (error) {
    console.error("Error al modificar sucursal:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

export async function deleteSucursalController(req, res) {
  try {
    const { id } = req.params;
    await deleteSucursal(id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar sucursal:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}
