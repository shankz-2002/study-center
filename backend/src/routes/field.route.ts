import express from "express";
import { fieldController } from "../controller/field.controller.js";
import { categoryController } from "../controller/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const fieldRouter = express.Router();

fieldRouter.get("/", fieldController.getAllFields);

fieldRouter.get("/:id", fieldController.getField);

fieldRouter.get("/:id/categories",categoryController.getAllCategories);

export default fieldRouter;
