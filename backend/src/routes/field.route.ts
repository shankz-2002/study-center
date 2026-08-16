import express from "express";
import { fieldController } from "../controller/field.controller.js";
import { categoryController } from "../controller/category.controller.js";
const fieldRouter = express.Router();

fieldRouter.get("/", fieldController.getAllFields);

fieldRouter.post("/create", fieldController.createField);
fieldRouter.delete("/delete/:id", fieldController.deleteField);
fieldRouter.put("/edit/:id", fieldController.editField);
fieldRouter.get("/:id", fieldController.getField);

fieldRouter.get("/:id/categories",categoryController.getAllCategories)

export default fieldRouter;
