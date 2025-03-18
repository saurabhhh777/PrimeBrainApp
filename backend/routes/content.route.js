import express from "express";
import { createContent, deleteContent,getAllContent,getContentById, updateContent } from "../controllers/content.controller.js";
import { isAuth } from "../middleware/Authentication.middle.js";

const router = express.Router();

//get all content
router.get("/",isAuth,getAllContent);

//get content by id
router.get("/:id",isAuth,getContentById);

// Create new content
router.post("/create", isAuth, createContent);

router.put("/:id",isAuth,updateContent);

// Delete content
router.delete("/:contentId",isAuth, deleteContent);

export default router;
