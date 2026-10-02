import type { Request, Response } from "express";
import { topicService } from "../service/topic.service.js";
import { categoryController } from "./category.controller.js";
import { categoryService } from "../service/category.service.js";
import { ApiError } from "../utils/ApiError.js";
import { json } from "node:stream/consumers";
import { topicRepository } from "../utils/repository.js";

export class topicController {
  static createTopic = async (req: Request, res: Response) => {
    const { topicName, description } = req.body;
    const id = String(req.params.id);
    const category = await categoryService.getCategory(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    const oldTopic = await topicRepository.findOne({ where: { topicName } });
    if (oldTopic) {
      throw new ApiError(409, "Topic Name already exists");
    } else {
      const topic = await topicService.createTopic(
        topicName,
        description,
        category,
      );
      res.status(200).json({
        success: true,
        topic,
      });
    }
  };
  static getAllTopics = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const topics = await topicService.getAllTopics(id);
    res.status(200).json({
      success: true,
      topics,
    });
  };
  static deleteTopic = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const deletedTopic = await topicService.deleteTopic(id);
    res.status(200).json({
      success: true,
      deletedTopic,
    });
  };
  static getTopic = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const topic = await topicService.getTopic(id);
    res.status(200).json({
      success: true,
      topic,
    });
  };
  static editTopic = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { topicName, description } = req.body;
    const topic = await topicService.editTopic(id, topicName, description);
    res.status(200).json({
      success: true,
      topic,
    });
  };
}
