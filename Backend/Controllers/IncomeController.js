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

  const amountNumber = parseFloat(amount);

  const userExists = await User.findOne({ _id: userId }); // Check the user in the DB

  if (!userExists) {
    return res.status(400).json({ err: "User ID not exists in our records" });
  } // Sent the error message if user not in the DB

  if (amount < 0) {
    return res.status(400).json({ err: "Please enter the valid income" });
  } // Don't alllow the user to add negative amount on the income

  const income = await Income.create({
    userId,
    amount: amountNumber,
    source,
    description,
    date,
  }); // Create a income in the DB

  const totalBalance = await TotalBalance.findOne({ userId }); // Find the existing balance for the user
  totalBalance.balance = parseFloat(totalBalance.balance) + amountNumber; // Add the new income to the existing balance amount
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

// Method   GET
// Route    /api/incomes/getIncomes
const getIncomes = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  const userExists = await User.findById({ _id: userId }); // Check the user exists in the DB

  if (!userExists) {
    return res.status(400).json({ err: "The user not exists in our records" });
  } // Send a response if user not exists

  const incomes = await Income.find({ userId }); // Get all incomes for the given userID

  return res.status(200).json(incomes);
});

// Method   PUT
// Route    /api/incomes/updateIncome
const updateIncome = asyncHandler(async (req, res) => {
  const { incomeId, userId, amount, source, description, date } = req.body;

  const incomeExists = await Income.findOne({ _id: incomeId }); // Check the income is created by the user or exists in the DB

  if (!incomeExists) {
    return res.status(400).json({ err: "The income is not exists" });
  }

  const totalBalance = await TotalBalance.findOne({
    userId: incomeExists.userId,
  });

  if (!totalBalance) {
    return res.status(400).json({ err: "Total balance not found" });
  }

  const oldAmount = incomeExists.amount; // 100
  console.log("Old amount: " + oldAmount);
  const newAmount = amount !== undefined ? amount : oldAmount; // newamount = 120
  console.log("New amount: " + newAmount);
  let newBalance;

  if (newAmount > oldAmount) {
    const balanceDifference = newAmount - oldAmount; // 120 - 20 = 100
    newBalance = totalBalance.balance + balanceDifference; // 100 + 100 = 120
    console.log("GT" + newBalance);
  } else if (newAmount < oldAmount) {
    const balanceDifference = oldAmount - newAmount; // 100 - 20 = 80
    newBalance = totalBalance.balance - balanceDifference; // 100 - 80 = 20
    console.log("LT" + newBalance);
  }

  //Update expense
  incomeExists.amount = amount !== undefined ? amount : incomeExists.amount;
  incomeExists.source =
    source !== undefined ? source : incomeExists.source;
  incomeExists.description =
    description !== undefined ? description : incomeExists.description;
  incomeExists.date = date !== undefined ? date : incomeExists.date;
  await incomeExists.save();

  // Update total balance
  totalBalance.balance = newBalance;
  await totalBalance.save();

  return res.status(200).json({
    message: "Expense updated successfully",
    expense: {
      id: incomeExists._id,
      amount: incomeExists.amount,
      source: incomeExists.source,
      description: incomeExists.description,
      date: incomeExists.date,
    },
    newBalance: totalBalance.balance,
  });
});

export { addIncome, getIncomes, updateIncome };
