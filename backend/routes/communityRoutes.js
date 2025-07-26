import express from "express";
import {
  createCommunityPost,
  updateCommunityPost,
  deleteCommunityPost,
  upvoteCommunityPost,
  reportCommunityPost,
  addCommunityComment,
  updateCommunityComment,
  deleteCommunityComment,
  upvoteCommunityComment,
  reportCommunityComment,
  getCommunityPosts,
  getSingleCommunityPost,
  getCommentsForPost
} from "../controllers/communityController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ----------- COMMUNITY POSTS ------------
router.post("/community-posts",verifyToken, createCommunityPost);                    
router.put("/community-posts/:id", verifyToken,updateCommunityPost);                 
router.delete("/community-posts/:id", verifyToken,deleteCommunityPost);             
router.post("/community-posts/:id/upvote", verifyToken,upvoteCommunityPost);        
router.post("/community-posts/:id/report",verifyToken, reportCommunityPost);         
router.get("/community-posts", verifyToken,getCommunityPosts);
router.get("/community-posts/:id", verifyToken,getSingleCommunityPost);

// ----------- COMMUNITY COMMENTS --------
router.post("/community-posts/:id/comments",verifyToken, addCommunityComment);           
router.put("/community-comments/:commentId", verifyToken,updateCommunityComment);        
router.delete("/community-comments/:commentId", verifyToken,deleteCommunityComment);     
router.post("/community-comments/:commentId/upvote",verifyToken, upvoteCommunityComment); 
router.post("/community-comments/:commentId/report", verifyToken,reportCommunityComment); 
router.get("/community-posts/:id/comments", verifyToken,getCommentsForPost);


export default router;
