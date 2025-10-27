import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { findUserByUsername } from "../repositories/userRepository.js";

const SECRET_KEY = "trakio_super_secreta_12345!@#";
const REFRESH_SECRET = "trakio_refresh_key_67890!@#";

// 🔐 Verifica contraseña hasheada (PBKDF2)
export function verificarPassword(plainPassword, hashedPassword) {
  const [algorithm, iterationsStr, salt, storedHash] = hashedPassword.split("$");
  const iterations = parseInt(iterationsStr, 10);

  return new Promise((resolve, reject) => {
    if (!salt || !storedHash || !iterationsStr || !algorithm) {
      return reject(new Error("Hash mal formado"));
    }

    crypto.pbkdf2(plainPassword, salt, iterations, 32, "sha256", (err, derivedKey) => {
      if (err) return reject(err);
      const derivedBase64 = derivedKey.toString("base64");
      resolve(derivedBase64 === storedHash);
    });
  });
}

// 🔑 Genera tokens
function generarAccessToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

function generarRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
}

// 🔄 Verifica refresh token
function verificarRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch {
    return null;
  }
}

// 🟢 LOGIN
export async function loginUser(username, password) {
  const user = await findUserByUsername(username);
  if (!user) throw new Error("Credenciales inválidas");

  const isValid = await verificarPassword(password, user.password);
  if (!isValid) throw new Error("Credenciales inválidas");

  const payload = { id: user.id, username: user.username };

  const accessToken = generarAccessToken(payload);
  const refreshToken = generarRefreshToken(payload);

  return {
    success: true,
    user: { id: user.id, username: user.username },
    accessToken,
    refreshToken,
  };
}

// 🧩 REFRESH TOKEN
export async function refreshAccessToken(refreshToken) {
  const decoded = verificarRefreshToken(refreshToken);
  if (!decoded) throw new Error("Refresh token inválido o expirado");

  // ✅ No se consulta DB — el refresh es válido por sí mismo
  const newAccessToken = generarAccessToken({
    id: decoded.id,
    username: decoded.username,
  });

  return newAccessToken;
}

// 🔧 Crear usuario helper
export async function createUserWithPlain(username, plainPassword) {
  const passwordHash = await generarHash(plainPassword);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trakio",
  });
  try {
    const [resultado] = await connection.execute(
      "INSERT INTO restapi_user (username, password) VALUES (?, ?)",
      [username, passwordHash]
    );
    return resultado.insertId;
  } finally {
    await connection.end();
  }
}
