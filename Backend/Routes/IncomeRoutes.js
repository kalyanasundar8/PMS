import express from "express";
import { addIncome, getIncomes, updateIncome } from "../Controllers/IncomeController.js";

const incomeRoutes = express.Router();

incomeRoutes.post("/addIncome", addIncome);
incomeRoutes.get("/getIncomes", getIncomes);
incomeRoutes.put("/updateIncome", updateIncome);

export default incomeRoutes;