import express from "express";
import { createTag, getAllTags, deleteTag } from "../controllers/tags.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create new tag
router.post("/", verifyToken, createTag);

// Get all tags
router.get("/", getAllTags);

// Delete tag
router.delete("/:tagId", verifyToken, deleteTag);

export default router;
