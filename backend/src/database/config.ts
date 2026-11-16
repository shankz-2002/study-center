import "dotenv/config";
import { DataSource } from "typeorm";

import { Fields } from "../entity/fields.js";
import { Category } from "../entity/category.js";
import { User } from "../entity/user.js";
import { Topic } from "../entity/topic.js";
import { Level } from "../entity/level.js";
import { Learning } from "../entity/learning.js";
import { Question } from "../entity/question.js";
import { UserLevelProgress } from "../entity/levelProgress.js";
import { UserTopicCompletion } from "../entity/userTopicCompletion.js";
import { PasswordResetToken } from "../entity/passwordReset.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: false,
  entities: [
    Fields,
    Category,
    User,
    Topic,
    Level,
    Learning,
    Question,
    UserLevelProgress,
    UserTopicCompletion,
    PasswordResetToken,
  ],
});
