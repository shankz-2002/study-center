import express from 'express'
import { topicController } from '../controller/topic.controller.js';
const topicRouter=express.Router();

topicRouter.post("/:id/create",topicController.createTopic);
topicRouter.delete("/:id",topicController.deleteTopic);
topicRouter.get("/:id",topicController.getTopic);
topicRouter.put("/:id",topicController.editTopic)


export default topicRouter;