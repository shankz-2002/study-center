import type { Request, Response } from "express";
import { categoryRepository, fieldRepository } from "../utils/repository.js";
import { ApiError } from "../utils/ApiError.js";
import { categoryService } from "../service/category.service.js";
export class categoryController {
  static createCategory = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { categoryName, description } = req.body;
    const field = await fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new ApiError(404, "Field not Found");
    }
    const category = await categoryService.createCategory(
      categoryName,
      description,
      field,
    );
    res.status(200).json({
      success: true,
      category,
    });
  };
  static getAllCategories = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const field = await fieldRepository.findOne({ where: { id } });
    if (!field) {
      throw new ApiError(404, "Field not Found");
    }
    const allCategories = await categoryRepository.find({
      where: { field: { id } },
    });
    if (!allCategories) {
      throw new ApiError(404, "Category empty");
    }
    res.status(200).json({
      success: true,
      allCategories,
    });
  };
  static getCategory = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    res.status(200).json({
      success: true,
      category,
    });
  };
  static deleteCategory = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const deletedCategory = await categoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      deletedCategory,
    });
  };
  static editCategory = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { categoryName, description } = req.body;
    const updateCategory = await categoryService.editCategory(
      id,
      categoryName,
      description,
    );
    res.status(200).json({
      success: true,
      updateCategory,
    });
  };
}
