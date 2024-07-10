import express from "express";
import { profile, signin, signup } from "../Controllers/UserControllers.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/signin", signin);
userRoutes.post("/profile", profile);

export default userRoutes;
