// server/server.js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Define Port
const PORT = process.env.PORT || 5001;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});