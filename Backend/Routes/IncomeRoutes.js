import express from "express";
import { addIncome } from "../Controllers/IncomeController.js";

const incomeRoutes = express.Router();

incomeRoutes.post("/addIncome", addIncome);

export default incomeRoutes;