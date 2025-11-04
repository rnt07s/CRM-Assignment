// server/models/Enquiry.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      lowercase: true,
    },
    phone: {
      type: String,
    },
    courseInterest: {
      type: String,
    },
    message: {
      type: String,
    },

    // If unclaimed => null. If claimed => ObjectId of Employee (Counselor) who claimed it
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    // status: 'unclaimed' or 'claimed'
    status: {
      type: String,
      enum: ["unclaimed", "claimed"],
      default: "unclaimed",
    },

    // Optional: when it was claimed
    claimedAt: {
      type: Date,
    },

    // Source of the enquiry: 'public_form', 'counselor_shared', etc.
    source: {
      type: String,
      default: "public_form",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;