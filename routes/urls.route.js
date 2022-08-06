import express from "express";
import { requireToken } from "../services/requireToken.js";
import { shorten } from "../controllers/urls.controller.js";
import { validateUrl } from "../middlewares/urls.middleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", requireToken, validateUrl, shorten);

export default urlsRouter;
