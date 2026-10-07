import express from "express";
import { categoryController } from "../controller/category.controller.js";
import { topicController } from "../controller/topic.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const categoryRouter = express.Router();
categoryRouter.use(authMiddleware.authenticate);

categoryRouter.get("/:id", categoryController.getCategory);

categoryRouter.get("/:id/topics", topicController.getAllTopics);

export default categoryRouter;
