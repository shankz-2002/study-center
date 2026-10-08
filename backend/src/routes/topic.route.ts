import express from "express";
import { topicController } from "../controller/topic.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const topicRouter = express.Router();
topicRouter.use(authMiddleware.authenticate);

topicRouter.get("/:id", topicController.getTopic);
topicRouter.get("/:id/completion", topicController.checkTopicCompletion);

export default topicRouter;
