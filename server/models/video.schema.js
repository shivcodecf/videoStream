import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    filename: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["processing", "completed"],
      default: "processing",
    },
    sensitivity: {
      type: String,
      enum: ["safe", "flagged"],
      default: "safe",
    },
  },
  { timestamps: true },
);

export const Video =  mongoose.model("Video", videoSchema);


