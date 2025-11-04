// server/app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 CRM Backend API is running...");
});

export default app;