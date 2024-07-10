import express from "express";
import { signin, signup } from "../Controllers/UserControllers.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/signin", signin);

export default userRoutes;