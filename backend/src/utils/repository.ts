import { AppDataSource } from "../database/config.js";
import { Category } from "../entity/category.js";
import { Fields } from "../entity/fields.js";
import { Topic } from "../entity/topic.js";
import { User } from "../entity/user.js";

export const fieldRepository = AppDataSource.getRepository(Fields);
export const categoryRepository=AppDataSource.getRepository(Category);
export const userRepository=AppDataSource.getRepository(User);
export const topicRepository=AppDataSource.getRepository(Topic)
