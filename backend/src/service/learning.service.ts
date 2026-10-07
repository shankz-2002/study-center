import { ApiError } from "../utils/ApiError.js";
import { learningRepository, levelRepository } from "../utils/repository.js";

export class learningService {
  static createLearning = async (
    id: string,
    title: string,
    content: string,
    order: number,
  ) => {
    const level = await levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new ApiError(404, "Level not found");
    }
    const learning = learningRepository.create({
      title,
      content,
      order,
      level,
    });
    return await learningRepository.save(learning);
  };
  static getAllLearning = async (id: string) => {
    const level = await levelRepository.findOne({ where: { id } });
    if (!level) {
      throw new ApiError(404, "Level not found");
    }
    const learning = await learningRepository.find({
      where: {
        level: { id },
      },
      order: {
        order: "ASC",
      },
    });
    return learning;
  };

  static getLearning = async (id: string) => {
    const learning = await learningRepository.findOne({ where: { id } });
    if (!learning) {
      throw new ApiError(404, "Learning Content not found");
    }
    return learning;
  };
  static deleteLearning = async (id: string) => {
    const learning = await this.getLearning(id);
    await learningRepository.remove(learning);
    return learning;
  };
  static editLearning = async (
    id: string,
    title: string,
    content: string,
    order: number,
  ) => {
    const learning = await this.getLearning(id);
    learning.title = title;
    learning.content = content;
    learning.order = order;
    return await learningRepository.save(learning);
  };
  static getContents = async () => {
    return await learningRepository.find({
      relations: {
        level: {
          topic: {
            category: {
              field: true,
            },
          },
        },
      },
    });
  };
}
