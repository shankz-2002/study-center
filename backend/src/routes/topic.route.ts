import express from 'express'
import { topicController } from '../controller/topic.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const topicRouter=express.Router();
topicRouter.use(authMiddleware.authenticate)
topicRouter.post("/:id/create",topicController.createTopic);
topicRouter.delete("/:id",topicController.deleteTopic);
topicRouter.get("/:id",topicController.getTopic);
topicRouter.put("/:id",topicController.editTopic)


export default topicRouter;