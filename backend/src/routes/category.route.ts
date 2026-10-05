import express from "express";
import { categoryController } from "../controller/category.controller.js";
import { topicController } from "../controller/topic.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const categoryRouter = express.Router();
categoryRouter.use(authMiddleware.authenticate);

categoryRouter.post("/create/:id", categoryController.createCategory);

categoryRouter.get("/:id", categoryController.getCategory);

categoryRouter.delete("/:id", categoryController.deleteCategory);

categoryRouter.put("/:id", categoryController.editCategory);

categoryRouter.get("/:id/topics", topicController.getAllTopics);

export default categoryRouter;
