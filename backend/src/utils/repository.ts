import { AppDataSource } from "../database/config.js";
import { Category } from "../entity/category.js";
import { Fields } from "../entity/fields.js";
import { Learning } from "../entity/learning.js";
import { Level } from "../entity/level.js";
import { UserLevelProgress } from "../entity/levelProgress.js";
import { Question } from "../entity/question.js";
import { Topic } from "../entity/topic.js";
import { User } from "../entity/user.js";
import { UserTopicCompletion } from "../entity/userTopicCompletion.js";

export const fieldRepository = AppDataSource.getRepository(Fields);
export const categoryRepository = AppDataSource.getRepository(Category);
export const userRepository = AppDataSource.getRepository(User);
export const topicRepository = AppDataSource.getRepository(Topic);
export const levelRepository = AppDataSource.getRepository(Level);
export const learningRepository = AppDataSource.getRepository(Learning);
export const questionRepository = AppDataSource.getRepository(Question);
export const progressRepository=AppDataSource.getRepository(UserLevelProgress);
export const userTopicCompletionRepository=AppDataSource.getRepository(UserTopicCompletion)
