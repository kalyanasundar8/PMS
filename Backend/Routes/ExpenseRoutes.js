import express from "express";
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../Controllers/ExpenseController.js";

const expenseRoutes = express.Router();

expenseRoutes.post("/addExpense", addExpense);
expenseRoutes.get("/getExpenses", getExpenses);
expenseRoutes.put("/updateExpense", updateExpense);
expenseRoutes.delete("/deleteExpense", deleteExpense);

export default expenseRoutes;