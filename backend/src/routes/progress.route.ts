import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { levelProgressController } from "../controller/progress.controller.js";
const progressRouter = express.Router();
progressRouter.use(authMiddleware.authenticate);

progressRouter.get("/:id", levelProgressController.checkProgress);

export default progressRouter;
