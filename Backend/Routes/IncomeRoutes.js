import express from "express";
import { addIncome, deleteIncome, getIncomes, updateIncome } from "../Controllers/IncomeController.js";

const incomeRoutes = express.Router();

incomeRoutes.post("/addIncome", addIncome);
incomeRoutes.get("/getIncomes", getIncomes);
incomeRoutes.put("/updateIncome", updateIncome);
incomeRoutes.delete("/deleteIncome", deleteIncome);

export default incomeRoutes;