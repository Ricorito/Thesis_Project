import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/articleController.js";

import { verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

router.get("/",verifyToken, getPosts);
router.get("/:id", verifyToken,getPost);
router.post("/",verifyToken,addPost);
router.delete("/:id", verifyToken,deletePost);
router.put("/:id", verifyToken,updatePost);

export default router;
