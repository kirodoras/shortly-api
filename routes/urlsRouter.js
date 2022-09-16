import express from "express";
import { requireToken } from "../services/requireToken.js";
import {
  shorten,
  getShortenById,
  redirectToUrl,
  deleteShortenById,
} from "../controllers/urlsController.js";
import {
  validateUrl,
  checkUserOwnerUrl,
} from "../middlewares/urlsMiddleware.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", requireToken, validateUrl, shorten);
urlsRouter.get("/urls/:id", getShortenById);
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlsRouter.delete(
  "/urls/:id",
  requireToken,
  checkUserOwnerUrl,
  deleteShortenById
);

export default urlsRouter;
