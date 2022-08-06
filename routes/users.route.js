import express from "express";
import { requireToken } from "../services/requireToken.js";
import { getUserInfo } from "../controllers/users.controller.js";
const usersRouter = express.Router();

usersRouter.get("/users/me", requireToken, getUserInfo);

export default usersRouter;
