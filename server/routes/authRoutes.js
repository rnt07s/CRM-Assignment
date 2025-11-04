// server/routes/authRoutes.js
import express from "express";
import {
  registerEmployee,
  loginEmployee,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerEmployee);
router.post("/login", loginEmployee);

// Protected Route
router.get("/profile", protect, getProfile);

export default router;