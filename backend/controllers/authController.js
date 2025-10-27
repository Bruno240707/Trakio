import { loginUser, refreshAccessToken } from "../services/authService.js";

// 🟢 LOGIN
export async function loginController(req, res) {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);

    const { user, accessToken, refreshToken } = result;

    // Access token (1h)
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    // Refresh token (7d)
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
}

export async function refreshTokenController(req, res) {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return res.status(401).json({ success: false, message: "No hay refresh token" });

  try {
    const newAccessToken = await refreshAccessToken(refreshToken);

    // Guardamos nuevo access token en cookie
    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: false, // true en producción HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1h
      path: "/",
    });

    res.json({ success: true });
  } catch (err) {
    // Si el refresh token expiró o es inválido => cerramos sesión
    res.clearCookie("auth_token", { httpOnly: true, path: "/" });
    res.clearCookie("refresh_token", { httpOnly: true, path: "/" });
    return res.status(401).json({ success: false, message: "Refresh token expirado. Sesión cerrada." });
  }
}

// PERFIL
export function perfilController(req, res) {
  res.json({ user: req.user });
}

// LOGOUT
export function logoutController(req, res) {
  res.clearCookie("auth_token", { httpOnly: true, secure: false, sameSite: "strict", path: "/" });
  res.clearCookie("refresh_token", { httpOnly: true, secure: false, sameSite: "strict", path: "/" });
  res.json({ message: "Sesión cerrada exitosamente" });
}
