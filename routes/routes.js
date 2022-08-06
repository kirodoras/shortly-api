import express from "express";
import authRouter from "./auth.route.js";
import urlsRouter from "./urls.route.js";
import usersRouter from "./users.route.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;
