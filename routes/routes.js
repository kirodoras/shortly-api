import express from "express";
import authRouter from "./authRouter.js";
import rankingRouter from "./rankingRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./usersRouter.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);
router.use(rankingRouter)

export default router;
