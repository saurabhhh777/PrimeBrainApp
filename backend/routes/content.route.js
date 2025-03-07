import express from "express";
import { createContent, deleteContent } from "../controllers/content.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create new content
router.post("/", verifyToken, createContent);

// Delete content
router.delete("/:contentId", verifyToken, deleteContent);

export default router;
