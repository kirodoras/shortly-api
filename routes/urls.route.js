import express from "express";
import { requireToken } from "../services/requireToken.js";
import { shorten, getShortenById } from "../controllers/urls.controller.js";
import { validateUrl } from "../middlewares/urls.middleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", requireToken, validateUrl, shorten);
urlsRouter.get("/urls/:id", getShortenById);

export default urlsRouter;
