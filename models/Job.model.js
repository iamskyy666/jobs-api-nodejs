import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "🔴 Please provide company name!"],
      maxLength: 40,
    },
    position: {
      type: String,
      required: [true, "🔴 Please provide position!"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "🔴 Please provide user!"],
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Job", JobSchema);
export default Job;
