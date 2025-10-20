import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import mysql from "mysql2/promise";
import { findUserByUsername } from "../repositories/userRepository.js";

const SECRET_KEY = "trakio_super_secreta_12345!@#";

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

export async function loginUser(username, password) {
  const user = await findUserByUsername(username);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.code = "AUTH_INVALID";
    throw err;
  }
  const isValid = await verificarPassword(password, user.password);
  if (!isValid) {
    const err = new Error("Invalid credentials");
    err.code = "AUTH_INVALID";
    throw err;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  return { success: true, user: { id: user.id, username: user.username }, token };
}

export async function generarHash(password) {
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

// Helper for scripts to create users
export async function createUserWithPlain(username, plainPassword) {
  const passwordHash = await generarHash(plainPassword);
  const connection = await mysql.createConnection({ host: "localhost", user: "root", password: "", database: "trakio" });
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

