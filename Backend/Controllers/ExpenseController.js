import asyncHandler from "express-async-handler";
import TotalBalanace from "../Models/TotalBalanceModel.js";
import Expense from "../Models/ExpenseModel.js";

// Method   POST
// Route    /api/expense/addExpense
const addExpense = asyncHandler(async (req, res) => {
  const { userId, amount, category, description, date } = req.body;

  if (!userId || !amount || !category) {
    return res.status(400).json({ err: "Please fill all the fields" });
  }

  const totalBalanceAmount = await TotalBalanace.findOne({ userId });

  if (totalBalanceAmount) {
    const totalBalance = totalBalanceAmount.balance;

    if (typeof totalBalance !== "number" && typeof amount !== "number") {
      return res
        .status(400)
        .json({ err: "Invalid data types for balance or amount" });
    }

    const expense = await Expense.create({
      userId,
      amount,
      category,
      description,
      date,
    });

    const newBalance = totalBalance - amount;

    await TotalBalanace.findOneAndUpdate(
      { userId },
      { $set: { balance: newBalance } },
      { new: true }
    );

    return res.status(201).json({
      id: expense.userId,
      amount: expense.amount,
    });
  } else {
    return res
      .status(400)
      .json({ err: "Something went wrong!, Please try again later" });
  }
});

// Method   PUT
// Route    /api/expense/updateExpense
const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId, amount, category, description, date } = req.body;

  const expenseExists = await Expense.findOne({ _id: expenseId });

  if (!expenseExists) {
    return res.status(400).json({ err: "There is no expense" });
  }

  const totalBalance = await TotalBalanace.findOne({
    userId: expenseExists.userId,
  });

  if (!totalBalance) {
    return res.status(400).json({ err: "Total balance not found" });
  }

  const oldAmount = expenseExists.amount; // 15
  console.log("Old amount: " + oldAmount);
  const newAmount = amount !== undefined ? amount : oldAmount; // newamount = 10
  console.log("New amount: " + newAmount);
  const balanceDifference = oldAmount - newAmount; // 15 - 10 = 5
  console.log("Balance diff: " + balanceDifference);
  let newBalance;

  if (newAmount > oldAmount) {
    newBalance = totalBalance.balance + balanceDifference;
    console.log("GT" + newBalance);
  } else if (newAmount < oldAmount) {
    newBalance = totalBalance.balance + balanceDifference;
    console.log("LT" + newBalance);
  }

  // Update expense
  expenseExists.amount = amount !== undefined ? amount : expenseExists.amount;
  expenseExists.category =
    category !== undefined ? category : expenseExists.category;
  expenseExists.description =
    description !== undefined ? description : expenseExists.description;
  expenseExists.date = date !== undefined ? date : expenseExists.date;
  await expenseExists.save();

  // Update total balance
  totalBalance.balance = newBalance;
  await totalBalance.save();

  return res.status(200).json({
    message: "Expense updated successfully",
    expense: {
      id: expenseExists._id,
      amount: expenseExists.amount,
      category: expenseExists.category,
      description: expenseExists.description,
      date: expenseExists.date,
    },
    newBalance: totalBalance.balance,
  });
});

// Method   DELETE
// Route    /api/expense/deleteExpense
const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId, userId } = req.query;

  const expenseExists = await Expense.findOne({ _id: expenseId });
  const balanceExists = await TotalBalanace.findOne({ userId });

  if (expenseExists.amount > balanceExists.balance) {
    const newBalance = expenseExists.amount + balanceExists.balance;
    balanceExists.balance = newBalance;
    await balanceExists.save();
    const del = await Expense.findByIdAndDelete({ _id: expenseId });
    return res.status(200).json({ mssg: "Expense deleted successfuly" });
  } else if (expenseExists.amount < balanceExists.balance) {
    const newBalance = balanceExists.balance - expenseExists.amount;
    balanceExists.balance = newBalance;
    await balanceExists.save();
    const del = await Expense.findByIdAndDelete({ _id: expenseId });
    return res.status(200).json({ mssg: "Expense deleted successfuly" });
  }
});

export { addExpense, updateExpense, deleteExpense };
