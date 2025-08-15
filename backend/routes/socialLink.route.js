import express from "express";
import { createOrUpdateSocialLink, getUserSocialLinks, getSocialLinksByUserId, deleteSocialLink, toggleSocialLink } from "../controllers/socialLink.controller.js";
import { isAuth } from "../middleware/Authentication.middle.js";

const router = express.Router();

// Protected routes
router.post("/", isAuth, createOrUpdateSocialLink);
router.get("/user", isAuth, getUserSocialLinks);
router.delete("/:id", isAuth, deleteSocialLink);
router.patch("/:id/toggle", isAuth, toggleSocialLink);

// Public route
router.get("/user/:userId", getSocialLinksByUserId);

export default router; 