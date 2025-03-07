import express from "express";
import { createLink, getLinkByHash, deleteLink } from "../controllers/link.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create new link
router.post("/", verifyToken, createLink);

// Get link by hash
router.get("/:hash", getLinkByHash);

// Delete link
router.delete("/:linkId", verifyToken, deleteLink);

export default router;
