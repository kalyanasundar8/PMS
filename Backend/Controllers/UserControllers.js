// Packages
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
// Models
import User from "../Models/UserModel.js";
import TotalBalanace from "../Models/TotalBalanceModel.js";
// Services
import generateToken from "../Services/GenerateToken.js";
import Income from "../Models/IncomeModel.js";
import Expense from "../Models/ExpenseModel.js";

// Method   POST
// Route    /api/users/signup
const signup = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  //  Email validation
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email validation
  const validEmail = emailFormat.test(email); // Test the user email with the email regex

  if (!validEmail) {
    return res.status(400).json({ err: "Please enter a valid email" });
  } // If email is not valid return response to the user

  const emailExists = await User.findOne({ email }); // Find the email is exists in the User document

  if (!emailExists) {
    // Only allow if user is not exists

    // Encrypt the users password
    const salt = await bcrypt.genSalt(10); // Process the data 10 times
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password using salt (random generated value)

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    }); // Create a user with the hashedPassword

    if (user) {
      const totalBalance = await TotalBalanace.create({
        userId: user._id,
        balance: 0,
      }); // Create a balance once the user is created

      return res.status(200).json({
        id: user._id,
        userName: user.userName,
        email: user.email,
        accountBalance: totalBalance.balance,
        token: generateToken(user._id),
      }); // Return the response if the user created
    } // Create a balance only if the user created succesfully
  } else {
    return res.status(400).json({ err: "Email already exists" });
  } // If the email already exists return the error response to the user
});

// Method   POST
// Route    /api/users/signin
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Email validation
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for email validation
  const validEmail = emailFormat.test(email); // Test the user email with the email regex

  if (!validEmail) {
    return res.status(400).json({ err: "Please enter a valid email" });
  } // If email is not valid return response to the user

  const emailExists = await User.findOne({ email }); // Find the email is exists in the User document

  if (emailExists) {
    // Only allow if user is exists
    const validPassword = await bcrypt.compare(password, emailExists.password); // Compare the user password and hased password in the user document

    if (validPassword) {
      // If the password valid allow user to signin
      return res.status(200).json({
        id: emailExists._id,
        userName: emailExists.userName,
        email: emailExists.email,
        token: generateToken(emailExists._id),
      });
    } else {
      return res.status(400).json({ err: "Invalid password" });
    } // If invalid password return the response to the user
  } else {
    return res.status(400).json({ err: "Email does not exists" });
  } // If the email is not exists return the error message to the user
});

// Method   POST
// Route    /api/users/profile
const profile = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const userExists = await User.findOne({ _id: id }); // Find the user exists in the User document

  const incomeExists = await Income.find({ userId: id }); // Find the income exists for the user

  if (!incomeExists) {
    return res.status(400).json({ err: "Income not exists for this user" });
  }

  const expenseExists = await Expense.find({ userId: id }); // Find the expense exists for the user

  if (!expenseExists) {
    return res.status(400).json({ err: "Expense not exists for this user" });
  }

  const totalBalance = await TotalBalanace.findOne({ userId: id });

  const totalExpense = expenseExists.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0); // Method for adding allexpense together

  const totalIncome = incomeExists.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0); // Method for adding allincome together

  const groupByMonth = (items) => {
    const monthTotals = items.reduce((acc, item) => {
      const month = item.date.toLocaleString("default", { month: "long" });
      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += item.amount;
      return acc;
    }, {});

    const result = Object.keys(monthTotals).map((month) => {
      return { month, salary: monthTotals[month] };
    });

    return result;
  };

  const incomeByMonth = groupByMonth(incomeExists);
  const expenseByMonth = groupByMonth(expenseExists);

  if (userExists) {
    // Only show if the userExists
    return res.status(200).json({
      id: userExists._id,
      userName: userExists.userName,
      email: userExists.email,
      totalIncome: incomeExists.length === 0 ? 0 : totalIncome,
      totalExpense: incomeExists.length === 0 ? 0 : totalExpense,
      totalBalance: totalBalance.balance,
      incomeByMonth: incomeByMonth,
      expenceByMonth: expenseByMonth,
    });
  } else {
    return res.status(400).json({ err: "No user in this id" });
  } // Return error response if the user not exists in the User document
});


export { signup, signin, profile };
