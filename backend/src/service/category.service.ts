import type { Fields } from "../entity/fields.js";
import { ApiError } from "../utils/ApiError.js";
import { categoryRepository } from "../utils/repository.js";

export class categoryService {
  static createCategory = async (
    categoryName: string,
    description: string,
    field: Fields,
  ) => {
    const category = await categoryRepository.findOne({
      where: { categoryName },
    });
    if (category) {
      throw new ApiError(409, "Category already exists");
    }
    const newCategory = await categoryRepository.create({
      categoryName,
      description,
      field,
    });
    return await categoryRepository.save(newCategory);
  };
  static deleteCategory = async (id: string) => {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    await categoryRepository.remove(category);
    return category;
  };
  static editCategory = async (
    id: string,
    categoryName: string,
    description: string,
  ) => {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    category.categoryName = categoryName;
    category.description = description;
    return await categoryRepository.save(category);
  };
}
