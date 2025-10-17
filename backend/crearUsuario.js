import { createUserWithPlain } from "./services/authService.js";

async function crearUsuario(username, plainPassword) {
  try {
    const insertId = await createUserWithPlain(username, plainPassword);
    console.log(`✅ Usuario '${username}' creado con ID ${insertId}`);
  } catch (err) {
    console.error("❌ Error al crear el usuario:", err.message);
  }
}