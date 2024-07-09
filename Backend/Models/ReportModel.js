import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    type: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.Model("report", reportSchema);
export default Report;
