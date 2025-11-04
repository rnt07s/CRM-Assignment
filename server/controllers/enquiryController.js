// server/controllers/enquiryController.js
import Enquiry from "../models/Enquiry.js";

/**
 * Public: Create an enquiry (no auth required)
 * POST /api/enquiries/public
 */
export const createEnquiryPublic = async (req, res) => {
  try {
    const { name, email, phone, courseInterest, message, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      courseInterest,
      message,
      source: source || "public_form",
    });

    res.status(201).json(enquiry);
  } catch (error) {
    console.error("❌ createEnquiryPublic error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Protected: fetch unclaimed enquiries (visible to logged-in users)
 * GET /api/enquiries/unclaimed
 */
export const getUnclaimedEnquiries = async (req, res) => {
  try {
    // Return enquiries not yet claimed
    const enquires = await Enquiry.find({ status: "unclaimed" }).sort({ createdAt: -1 });
    res.json(enquires);
  } catch (error) {
    console.error("❌ getUnclaimedEnquiries error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Protected: claim an enquiry by id
 * POST /api/enquiries/claim/:id
 * Body optional: note or source
 */
export const claimEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const userId = req.user._id; // from protect middleware

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    if (enquiry.status === "claimed" && enquiry.assignedTo) {
      // Already claimed
      // Optionally return who claimed it
      return res.status(400).json({ message: "Enquiry already claimed" });
    }

    enquiry.status = "claimed";
    enquiry.assignedTo = userId;
    enquiry.claimedAt = new Date();

    await enquiry.save();

    res.json({ message: "Enquiry claimed successfully", enquiry });
  } catch (error) {
    console.error("❌ claimEnquiry error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Protected: fetch enquiries claimed by logged-in user
 * GET /api/enquiries/my
 */
export const getMyEnquiries = async (req, res) => {
  try {
    const userId = req.user._id;
    const enquiries = await Enquiry.find({ assignedTo: userId }).sort({ claimedAt: -1, createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    console.error("❌ getMyEnquiries error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};