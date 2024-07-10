import mongoose from "mongoose";

const totalBalanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const TotalBalanace = mongoose.model("Balance", totalBalanceSchema);
export default TotalBalanace;
