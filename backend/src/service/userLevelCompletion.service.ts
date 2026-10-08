import { ApiError } from "../utils/ApiError.js";
import {
  questionRepository,
  userTopicCompletionRepository,
} from "../utils/repository.js";
import { levelRepository, progressRepository } from "../utils/repository.js";

export class UserTopicCompletionService {
  static createCompletion = async (userId: string, levelId: string) => {
    const level = await levelRepository.findOne({
      where: {
        id: levelId,
      },
      relations: {
        topic: true,
      },
    });

    if (!level || !level.topic) {
      throw new Error("Level not found");
    }

    const topicId = level.topic.id;

    const levels = await levelRepository.find({
      where: {
        topic: {
          id: topicId,
        },
      },
    });

    const progress = await progressRepository.find({
      where: {
        user: {
          id: userId,
        },
        level: {
          topic: {
            id: topicId,
          },
        },
      },
      relations: {
        level: true,
      },
    });

  
   

  

    const allCompleted = levels.every((level) =>
      progress.some((item) => item.level.id === level.id),
    );


    if (!allCompleted) {
      return;
    }

    const existing = await userTopicCompletionRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        topic: {
          id: topicId,
        },
      },
    });

    if (existing) {
      return existing;
    }

    const totalScore = progress.reduce((total, item) => total + item.score, 0);

    const questions = await questionRepository.find({
      where: {
        level: {
          topic: {
            id: topicId,
          },
        },
      },
      relations: {
        level: {
          topic: true,
        },
      },
    });

    const totalPossibleScore = questions.length;

    const percentage =
      totalPossibleScore > 0 ? (totalScore / totalPossibleScore) * 100 : 0;

    const completion = userTopicCompletionRepository.create({
      user: {
        id: userId,
      },
      topic: {
        id: topicId,
      },
      totalScore,
      totalPossibleScore,
      percentage,
      totalLevels: levels.length,
      completedLevels: progress.length,
    });

    return await userTopicCompletionRepository.save(completion);
  };
  static checkTopicCompletion = async (userId: string, topicId: string) => {
    return await userTopicCompletionRepository.findOne({
      where: {
        user: { id: userId },
        topic: { id: topicId },
      },
    });
  };
}
