import express from "express";
import { learningController } from "../controller/learning.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const learningRouter = express.Router();
learningRouter.use(authMiddleware.authenticate);

learningRouter.get("/:id", learningController.getAllLearning);
learningRouter.get("/:id/learning", learningController.getLearning);

export default learningRouter;
