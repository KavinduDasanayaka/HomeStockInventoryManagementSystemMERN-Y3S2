import express from "express";
const router = express.Router();
import {authenticate} from '../utils/verifyUser.js';
import { createPost,createReview ,getAllPosts,getSpecificPost,likepost} from "../controllers/post.controller.js"; 

router.post("/create-post",authenticate,createPost)
router.get("/get-all-posts",authenticate,getAllPosts)
router.post("/:id/create-review",authenticate,createReview)
router.get("/specific-post/:id",getSpecificPost)
router.patch("/:id/like",authenticate,likepost)

export default router;


