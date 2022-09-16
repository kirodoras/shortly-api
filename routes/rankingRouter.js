import express from "express";
import { rankingByVisitCount } from "../controllers/rankingController.js";

const rankingRouter = express.Router();

rankingRouter.get("/ranking", rankingByVisitCount);

export default rankingRouter;
