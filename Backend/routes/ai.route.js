import express from "express";
import  {getAiData}  from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/get-recipe", getAiData)

export default router;
