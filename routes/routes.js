import express from "express";
import authRouter from "./auth.route.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use(authRouter);

export default router;
