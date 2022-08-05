import express from "express";
import { signup } from "../controllers/auth.controller.js";
import {
  validateSignup,
  checkEmailExists,
} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, checkEmailExists, signup);

export default authRouter;
