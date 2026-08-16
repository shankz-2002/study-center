import express from 'express'
import { categoryController } from '../controller/category.controller.js';
const categoryRouter=express.Router();

categoryRouter.post("/create/:id",categoryController.createCategory);


categoryRouter.get("/:id",categoryController.getCategory);

categoryRouter.delete("/:id",categoryController.deleteCategory);

categoryRouter.put("/:id",categoryController.editCategory)



export default categoryRouter;