import { loginUser } from "../services/authService.js";

export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
  
    const { user, token } = result;

    // Guardar token en cookie HTTP segura (compatible con desarrollo)
res.cookie("auth_token", token, {
  httpOnly: true,
  secure: false,      // true solo en producción HTTPS
  sameSite: "lax",    // permite navegación interna sin borrarla
  path: "/",
  maxAge: 60 * 60 * 1000,
});

    res.json({
      success: true,
      user,
      message: "Inicio de sesión exitoso",
    });

  } catch (error) {
    if (error.code === "AUTH_INVALID") {
      return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Error en la consulta" });
  }
}

export function perfilController(req, res) {
  // El middleware verificarToken ya validó el token y puso req.user
  res.json({ user: req.user });
}

export function logoutController(req, res) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: false,       // false para desarrollo local
    sameSite: "strict",
    path: "/",           // debe ser igual al path de login
    domain: "localhost", // si pusiste domain en login
  });

  res.json({ message: "Sesión cerrada exitosamente" });
}
