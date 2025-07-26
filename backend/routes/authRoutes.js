import express from "express";
import {
  login,
  logout,
  register,
  googleLogin,
  verifyEmail,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/verify", verifyEmail);

router.post("/logout", verifyToken, logout);

export default router;
