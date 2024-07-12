import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("income", incomeSchema);
export default Income;
