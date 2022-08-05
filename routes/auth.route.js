import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import {
  validateSignup,
  checkEmailExists,
  validateSignin,
  checkUserMatches,
  checkUserSession,
} from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, checkEmailExists, signup);
authRouter.post(
  "/signin",
  validateSignin,
  checkUserMatches,
  checkUserSession,
  signin
);

export default authRouter;
