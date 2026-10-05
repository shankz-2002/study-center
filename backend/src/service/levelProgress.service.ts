import { progressRepository } from "../utils/repository.js";
import { levelService } from "./level.service.js";
import { userService } from "./user.service.js";

export class levelProgressService {
  static createProgress = async (
    userId: string,
    levelId: string,
    score: number,
    percentage: number,
  ) => {
    const user = await userService.getUser(userId);
    const level = await levelService.getLevel(levelId);
    const progress = await progressRepository.create({
      user,
      level,
      score,
      percentage,
      completedAt: new Date(),
    });
    await progressRepository.save(progress);
  };
  static checkProgress = async (userId: string, levelId: string) => {
    const progress = await progressRepository.findOne({
      where: {
        user: { id: userId },
        level: { id: levelId },
      },
    });
    return progress
  };
}
