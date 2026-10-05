import express from "express";
import { questionController } from "../controller/question.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const questionRouter = express.Router();
questionRouter.use(authMiddleware.authenticate);
questionRouter.post("/:id", questionController.createQuestion);
questionRouter.get("/:id", questionController.getAllQuestions);
questionRouter.get("/:id/question", questionController.getQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);
questionRouter.put("/:id", questionController.editQuestion);
questionRouter.post("/:id/submit", questionController.checkAnswer);

export default questionRouter;
