import mysql from "mysql2/promise";
import crypto from "node:crypto";

// CONFIGURACIÓN DE CONEXIÓN A LA BASE DE DATOS
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "trakio",
};

// FUNCIÓN PARA GENERAR HASH TIPO DJANGO
async function generarHash(password) {
  const salt = crypto.randomBytes(8).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);
  const iterations = 36000;

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, 32, "sha256", (err, derivedKey) => {
      if (err) return reject(err);
      const hash = derivedKey.toString("base64");
      const fullHash = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;
      resolve(fullHash);
    });
  });
}

// FUNCIÓN PRINCIPAL PARA CREAR EL USUARIO
async function crearUsuario(username, plainPassword) {
  try {
    const passwordHash = await generarHash(plainPassword);

    const connection = await mysql.createConnection(dbConfig);

    const [resultado] = await connection.execute(
      "INSERT INTO restapi_user (username, password) VALUES (?, ?)",
      [username, passwordHash]
    );

    console.log(`✅ Usuario '${username}' creado con ID ${resultado.insertId}`);
    await connection.end();
  } catch (err) {
    console.error("❌ Error al crear el usuario:", err.message);
  }
}

// 🔧 USÁ ESTO PARA CREAR USUARIOS NUEVOS
crearUsuario("Jose", "Jose");
// podés llamar varias veces con diferentes usuarios y contraseñas
// crearUsuario("jefe1", "contraseñasegura123");
