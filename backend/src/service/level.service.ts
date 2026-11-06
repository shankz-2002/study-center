import { LessThan } from "typeorm";
import { ApiError } from "../utils/ApiError.js";
import {
  learningRepository,
  levelRepository,
  progressRepository,
  topicRepository,
} from "../utils/repository.js";

export class levelService {
  static createLevel = async (
    id: string,
    levelName: string,
    description: string,
    order: number,
  ) => {
    const topic = await topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new ApiError(404, "Topic not Found");
    }
    const level = levelRepository.create({
      levelName,
      description,
      order,
      topic,
    });
    return await levelRepository.save(level);
  };
  static getAllLevels = async (topicId: string, userId: string) => {
    const levels = await levelRepository.find({
      where: {
        topic: { id: topicId },
      },
      order: {
        order: "ASC",
      },
    });

    if (levels.length === 0) {
      throw new ApiError(404, "No levels found");
    }

    // Fetch this user's completed levels for this topic
    const progress = await progressRepository.find({
      where: {
        user: { id: userId },
        level: {
          topic: { id: topicId },
        },
      },
      relations: {
        level: true,
      },
    });

    const completedLevelIds = new Set(progress.map((item) => item.level.id));

    // Calculate completion and unlock status
    const levelsWithStatus = levels.map((level, index) => {
      const isCompleted = completedLevelIds.has(level.id);

      const isUnlocked =
        index === 0 || completedLevelIds.has(levels[index - 1].id);

      return {
        ...level,
        isCompleted,
        isUnlocked,
      };
    });

    return levelsWithStatus;
  };
  static getLevel = async (id: string) => {
    const level = await levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new ApiError(404, "Level not found");
    }
    return level;
  };

  static getLevelVersion2 = async (levelId: string, userId: string) => {
    const level = await levelRepository.findOne({
      where: { id: levelId },
      relations: {
        topic: true,
      },
    });

    if (!level) {
      throw new ApiError(404, "Level not found");
    }

    // Find the immediately preceding level
    const previousLevel = await levelRepository.findOne({
      where: {
        topic: { id: level.topic.id },
        order: LessThan(level.order),
      },
      order: {
        order: "DESC",
      },
    });

    // First level has no previous level
    if (previousLevel) {
      const isPreviousCompleted = await progressRepository.findOne({
        where: {
          user: { id: userId },
          level: { id: previousLevel.id },
        },
      });

      if (!isPreviousCompleted) {
        throw new ApiError(403, "Complete the previous level first");
      }
    }

    return level;
  };

  static deleteLevel = async (id: string) => {
    const level = await this.getLevel(id);
    await levelRepository.remove(level);
    return level;
  };

  static editLevel = async (
    id: string,
    levelName: string,
    description: string,
    order: number,
  ) => {
    const level = await this.getLevel(id);
    level.levelName = levelName;
    level.description = description;
    level.order = order;
    return await levelRepository.save(level);
  };
  static getLevels = async () => {
    return await levelRepository.find({
      relations: {
        topic: {
          category: {
            field: true,
          },
        },
      },
      order: {
        order: "ASC",
      },
    });
  };
}
