import express from "express";
import { questionController } from "../controller/question.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const questionRouter = express.Router();
questionRouter.use(authMiddleware.authenticate);

questionRouter.get("/:id", questionController.getAllQuestions);
questionRouter.get("/:id/question", questionController.getQuestion);

questionRouter.post("/:id/submit", questionController.checkAnswer);

export default questionRouter;
