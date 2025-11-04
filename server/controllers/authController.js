// server/controllers/authController.js
import Employee from "../models/Employee.js";
import generateToken from "../utils/generateToken.js";

// ✅ Register (Counselor or Student)
export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const employee = await Employee.create({ name, email, password, role });

    res.status(201).json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      token: generateToken(employee._id),
    });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Login (Counselor or Student)
export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await employee.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      token: generateToken(employee._id),
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get Logged-In User Profile
export const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("❌ Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};