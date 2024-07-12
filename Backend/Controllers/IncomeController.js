import asyncHandler from "express-async-handler";
// Models
import User from "../Models/UserModel.js";
import Income from "../Models/IncomeModel.js";
import TotalBalance from "../Models/TotalBalanceModel.js";

// Method   POST
// Route    /api/incomes/addIncome
const addIncome = asyncHandler(async (req, res) => {
  const { userId, amount, source, description, date } = req.body;

  if (!userId || !amount || !source) {
    return res.status(400).json({ err: "Please enter all fields" });
  } // Check all the fields are filled by the user

  const userExists = await User.findOne({ _id: userId }); // Check the user in the DB

  if (!userExists) {
    return res.status(400).json({ err: "User ID not exists in our records" });
  } // Sent the error message if user not in the DB

  if (amount < 0) {
    return res.status(400).json({ err: "Please enter the valid income" });
  } // Don't alllow the user to add negative amount on the income

  const income = await Income.create({
    userId,
    amount,
    source,
    description,
    date,
  }); // Create a income in the DB

  const totalBalance = await TotalBalance.findOne({ userId }); // Find the existing balance for the user
  totalBalance.balance = totalBalance.balance + amount; // Add the new income to the existing balance amount
  await totalBalance.save(); // Save it in the DB

  return res.status(200).json({
    mssg: "Income added successfully",
    income: {
      id: income._id,
      userId: income.userId,
      amount: income.amount,
      source: income.source,
      description: income.description,
      date: income.date,
    },
    newBalance: totalBalance.balance,
  }); // Return the response if income is created
});

export { addIncome };
