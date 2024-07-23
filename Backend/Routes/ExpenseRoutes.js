import express from "express";
import { addExpense, deleteExpense, getExpenseByMonth, getExpenses, updateExpense } from "../Controllers/ExpenseController.js";

const expenseRoutes = express.Router();

expenseRoutes.post("/addExpense", addExpense);
expenseRoutes.get("/getExpenses", getExpenses);
expenseRoutes.put("/updateExpense", updateExpense);
expenseRoutes.delete("/deleteExpense", deleteExpense);
expenseRoutes.get("/getExpenseByMonth", getExpenseByMonth);

export default expenseRoutes;