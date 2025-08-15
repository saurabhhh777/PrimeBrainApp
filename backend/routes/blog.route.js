import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getUserBlogs } from "../controllers/blog.controller.js";
import { isAuth } from "../middleware/Authentication.middle.js";

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected routes
router.post("/create", isAuth, createBlog);
router.put("/:id", isAuth, updateBlog);
router.delete("/:id", isAuth, deleteBlog);
router.get("/user/blogs", isAuth, getUserBlogs);

export default router; 