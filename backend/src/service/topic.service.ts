import type { Category } from "../entity/category.js";
import { ApiError } from "../utils/ApiError.js";
import { categoryRepository, topicRepository } from "../utils/repository.js";

export class topicService {
  static createTopic = async (
    topicName: string,
    description: string,
    category: Category,
  ) => {
    const topic = await topicRepository.findOne({ where: { topicName } });
    if (topic) {
      throw new ApiError(409, "Topic Already exists");
    }
    const newTopic = topicRepository.create({
      topicName,
      description,
      category,
    });
    return await topicRepository.save(newTopic);
  };

  static getAllTopics = async (id: string) => {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new ApiError(404, "No Category not found");
    }
    const topics = await topicRepository.find({ where: { category: { id } } });
    if (topics.length == 0) {
      throw new ApiError(404, "Topics empty");
    }
    return topics;
  };

  static getTopic = async (id: string) => {
    const topic = topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new ApiError(404, "Topic not Found");
    }
    return topic;
  };
  static deleteTopic = async (id: string) => {
    const topic = await this.getTopic(id);
    if (!topic) {
      throw new ApiError(404, "Topic not found");
    }
    await topicRepository.remove(topic);
    return topic;
  };
  static editTopic = async (
    id: string,
    topicName: string,
    description: string,
  ) => {
    const topic = await topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new ApiError(404, "Topic not found");
    }
    topic.topicName = topicName;
    topic.description = description;
    return await topicRepository.save(topic);
  };
}
