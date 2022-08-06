import express from "express";
import { requireToken } from "../services/requireToken.js";
import {
  shorten,
  getShortenById,
  redirectToUrl,
} from "../controllers/urls.controller.js";
import { validateUrl } from "../middlewares/urls.middleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", requireToken, validateUrl, shorten);
urlsRouter.get("/urls/:id", getShortenById);
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);

export default urlsRouter;
