// Packages
import express from "express";
import colors from "colors"
import parser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
// Routes
import userRoutes from "./Routes/UserRoutes.js";
import expenseRoutes from "./Routes/ExpenseRoutes.js";
import incomeRoutes from "./Routes/IncomeRoutes.js";
// Config
import PMSDB from "./Config/PMSDB.js";


const app = express();

PMSDB();

const port = process.env.PORT;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);

app.listen(port, (req, res) => {
    console.log(`App listening to port ${port} :)`.blue);
})