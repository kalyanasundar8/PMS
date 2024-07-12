import express from "express";
import { addIncome, getIncomes } from "../Controllers/IncomeController.js";

const incomeRoutes = express.Router();

incomeRoutes.post("/addIncome", addIncome);
incomeRoutes.get("/getIncomes", getIncomes);

export default incomeRoutes;