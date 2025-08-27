import { loginUser } from "../services/authService.js";

export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    if (error.code === "AUTH_INVALID") {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Error en la consulta" });
  }
}

