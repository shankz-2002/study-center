import express from "express";
import { fieldController } from "../controller/field.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { categoryController } from "../controller/category.controller.js";
import { topicController } from "../controller/topic.controller.js";
import { levelControler } from "../controller/level.controller.js";
import { learningController } from "../controller/learning.controller.js";
import { questionController } from "../controller/question.controller.js";
import { RoleType } from "../types/user.js";
import { userController } from "../controller/user.controller.js";

const adminRouter = express.Router();
adminRouter.use(authMiddleware.authenticate);
adminRouter.use(authMiddleware.authorize(RoleType.ADMIN));

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
adminRouter.delete("/topic/:id", topicController.deleteTopic);
adminRouter.put("/topic/:id", topicController.editTopic);

//level
adminRouter.get("/levels",levelControler.getLevels)
adminRouter.post("/level/:id", levelControler.createLevel);
adminRouter.delete("/level/:id", levelControler.deleteLevel);
adminRouter.put("/level/:id", levelControler.editLevel);

//learningContent
adminRouter.get("/contents",learningController.getContents)
adminRouter.post("/content/:id", learningController.createLearning);
adminRouter.delete("/content/:id", learningController.deleteLearning);
adminRouter.put("/content/:id", learningController.editLearning);

//question
adminRouter.get("/questions",questionController.getQuestions)
adminRouter.post("/question/:id", questionController.createQuestion);
adminRouter.delete("/question/:id", questionController.deleteQuestion);
adminRouter.put("/question/:id", questionController.editQuestion);

//user
adminRouter.get("/users",userController.getUsers)
adminRouter.put("/user/:id",userController.editUser)
adminRouter.delete("/user/:id",userController.deleteUser)
export default adminRouter;
