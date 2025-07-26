import express from "express";
import {
  getJournals,
  getJournal,
  addJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getJournals);
router.get("/:id", verifyToken, getJournal);
router.post("/", verifyToken, addJournal);
router.put("/:id", verifyToken, updateJournal);
router.delete("/:id", verifyToken, deleteJournal);

export default router;
