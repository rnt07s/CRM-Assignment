// server/routes/enquiryRoutes.js
import express from "express";
import {
  createEnquiryPublic,
  getUnclaimedEnquiries,
  claimEnquiry,
  getMyEnquiries,
} from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Public route - anyone can submit the form
 * POST /api/enquiries/public
 */
router.post("/public", createEnquiryPublic);

/**
 * Protected routes - only logged-in users (counselors/students) can fetch / claim
 */
router.get("/unclaimed", protect, getUnclaimedEnquiries);
router.post("/claim/:id", protect, claimEnquiry);
router.get("/my", protect, getMyEnquiries);

export default router;