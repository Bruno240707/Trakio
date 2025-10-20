import jwt from "jsonwebtoken";
const SECRET_KEY = "trakio_super_secreta_12345!@#";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const headerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const cookieToken = req.cookies?.auth_token || null;

  const token = headerToken || cookieToken;
  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}
