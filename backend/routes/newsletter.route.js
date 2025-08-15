import express from "express";
import {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getAllSubscribers,
  sendNewsletter,
} from "../controllers/newsletter.controller.js";

const router = express.Router();

// Public routes
router.post("/subscribe", subscribeToNewsletter);
router.post("/unsubscribe", unsubscribeFromNewsletter);

// Admin routes (you might want to add authentication middleware later)
router.get("/subscribers", getAllSubscribers);
router.post("/send", sendNewsletter);

export default router; 