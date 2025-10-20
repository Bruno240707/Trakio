import express from "express";
import { loginController, perfilController, logoutController } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// LOGIN
router.post("/login", loginController);

// LOGOUT (borra la cookie)
router.post("/logout", logoutController);

// PERFIL (verifica sesión desde cookie)
router.get("/perfil", requireAuth, perfilController);

export default router;
