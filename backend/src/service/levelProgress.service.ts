import { progressRepository, topicRepository } from "../utils/repository.js";
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
    return progress;
  };
  static continueLearning = async (userId: string) => {
    const topics = await topicRepository.find({
      relations: {
        levels: true,
      },
    });
    const completedProgress = await progressRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        level: {
          topic: true,
        },
      },
    });
    const completedLevelsMap = new Map<string, Set<string>>();
    completedProgress.forEach((progress) => {
      const topicId = progress.level.topic.id;

      if (!completedLevelsMap.has(topicId)) {
        completedLevelsMap.set(topicId, new Set());
      }

      completedLevelsMap.get(topicId)!.add(progress.level.id);
    });
    return topics
      .map((topic) => {
        const totalLevels = topic.levels.length;
        const completedLevels = completedLevelsMap.get(topic.id)?.size ?? 0;

        const percentage =
          totalLevels > 0
            ? Math.round((completedLevels / totalLevels) * 100)
            : 0;

        return {
          topicId: topic.id,
          topicName: topic.topicName,
          description: topic.description,
          totalLevels,
          completedLevels,
          percentage,
        };
      })
      .filter(
        (topic) =>
          topic.completedLevels > 0 &&
          topic.completedLevels < topic.totalLevels,
      );
  };
}
