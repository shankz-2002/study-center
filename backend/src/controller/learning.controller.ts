import type { Request, Response } from "express";
import { learningService } from "../service/learning.service.js";

export class learningController {
  static createLearning = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { title, content, order } = req.body;
    const learning = await learningService.createLearning(
      id,
      title,
      content,
      order,
    );
    res.status(200).json({
      success: true,
      learning,
    });
  };
  static getAllLearning = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const learning = await learningService.getAllLearning(id);
    res.status(200).json({
      success: true,
      learning,
    });
  };
  static getLearning = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const learning = await learningService.getLearning(id);
    res.status(200).json({
      success: true,
      learning,
    });
  };
  static deleteLearning = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const learning = await learningService.deleteLearning(id);
    res.status(200).json({
      success: true,
      learning,
    });
  };
  static editLearning = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { title, content, order } = req.body;
    const learning = await learningService.editLearning(
      id,
      title,
      content,
      order,
    );
    res.status(200).json({
      success: true,
      learning,
    });
  };
}
