import { AppDataSource } from "../database/config.js";
import { Category } from "../entity/category.js";
import { Fields } from "../entity/fields.js";

export const fieldRepository = AppDataSource.getRepository(Fields);
export const categoryRepository=AppDataSource.getRepository(Category);
