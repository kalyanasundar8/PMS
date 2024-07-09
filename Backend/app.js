import express from "express";
import colors from "colors"
import parser from "body-parser";
import dotenv from "dotenv";
import PMSDB from "./Config/PMSDB.js";
dotenv.config();

const app = express();

PMSDB();

const port = process.env.PORT;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// app.use("/api/users");

app.listen(port, (req, res) => {
    console.log(`App listening to port ${port} :)`.blue);
})