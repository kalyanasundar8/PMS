import express from "express";
import { addExpense, updateExpense } from "../Controllers/ExpenseController.js";

const expenseRoutes = express.Router();

expenseRoutes.post("/addExpense", addExpense);
expenseRoutes.put("/updateExpense", updateExpense);

export default expenseRoutes;