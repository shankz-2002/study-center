import express from "express";
import { questionController } from "../controller/question.controller.js";
const questionRouter = express.Router();

questionRouter.post("/:id", questionController.createQuestion);
questionRouter.get("/:id", questionController.getAllQuestions);
questionRouter.get("/:id/question", questionController.getQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);
questionRouter.put("/:id", questionController.editQuestion);
questionRouter.post("/:id/submit",questionController.checkAnswer)

export default questionRouter;
