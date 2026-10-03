import express from "express";
import { learningController } from "../controller/learning.controller.js";
const learningRouter = express.Router();

learningRouter.post("/:id", learningController.createLearning);
learningRouter.get("/:id", learningController.getAllLearning);
learningRouter.get("/:id/learning", learningController.getLearning);
learningRouter.delete("/:id", learningController.deleteLearning);
learningRouter.put("/:id",learningController.editLearning);

export default learningRouter;
