import express from "express";
import { fieldController } from "../controller/field.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { categoryController } from "../controller/category.controller.js";
import { topicController } from "../controller/topic.controller.js";
import { levelControler } from "../controller/level.controller.js";
import { learningController } from "../controller/learning.controller.js";
import { questionController } from "../controller/question.controller.js";
import { RoleType } from "../types/user.js";

const adminRouter = express.Router();
// adminRouter.use(authMiddleware.authenticate);
// adminRouter.use(authMiddleware.authorize(RoleType.ADMIN));

//fields
adminRouter.post("/field", fieldController.createField);
adminRouter.delete("/field/:id", fieldController.deleteField);
adminRouter.put("/field/:id", fieldController.editField);

//category
adminRouter.get("/categories", categoryController.getCategories);
adminRouter.post("/category/:id", categoryController.createCategory);
adminRouter.delete("/category/:id", categoryController.deleteCategory);
adminRouter.put("/category/:id", categoryController.editCategory);

//topic
adminRouter.get("/topics",topicController.getTopics)
adminRouter.post("/topic/:id", topicController.createTopic);
adminRouter.delete("topic/:id", topicController.deleteTopic);
adminRouter.put("topic/:id", topicController.editTopic);

//level
adminRouter.get("/levels",levelControler.getLevels)
adminRouter.post("/:id", levelControler.createLevel);
adminRouter.delete("/:id", levelControler.deleteLevel);
adminRouter.put("/:id", levelControler.editLevel);

//learningContent

adminRouter.post("/:id", learningController.createLearning);
adminRouter.delete("/:id", learningController.deleteLearning);
adminRouter.put("/:id", learningController.editLearning);

//question
adminRouter.post("/:id", questionController.createQuestion);
adminRouter.delete("/:id", questionController.deleteQuestion);
adminRouter.put("/:id", questionController.editQuestion);

export default adminRouter;
