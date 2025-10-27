import express from "express";
import { loginController, perfilController, logoutController, refreshTokenController } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// LOGIN
router.post("/login", loginController);

// PERFIL
router.get("/perfil", requireAuth, perfilController);

// REFRESH TOKEN (nuevo endpoint)
router.post("/refresh", refreshTokenController);

// LOGOUT
router.post("/logout", logoutController);

export default router;
