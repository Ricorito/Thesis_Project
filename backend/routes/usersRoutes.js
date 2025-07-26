import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/profile",verifyToken, getUserProfile);
router.put("/profile", verifyToken,updateUserProfile);
router.delete("/profile", verifyToken,deleteUser);

export default router;
