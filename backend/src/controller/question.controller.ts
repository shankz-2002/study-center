import type { Request, Response } from "express";
import { questionService } from "../service/question.service.js";
import type {
  CreateQuestionData,
  EditQuestionData,
} from "../types/question.js";

export class questionController {
  static createQuestion = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const data: CreateQuestionData = {
      id,
      ...req.body,
    };
    const question = await questionService.createQuestion(data);
    res.status(200).json({
      success: true,
      question,
    });
  };
  static getAllQuestions = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const questions = await questionService.getAllQuestions(id);
    res.status(200).json({
      success: true,
      questions,
    });
  };
  static getQuestion = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const question = await questionService.getQuestion(id);
    res.status(200).json({
      success: true,
      question,
    });
  };
  static deleteQuestion = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const question = await questionService.deleteQuestion(id);
    res.status(200).json({
      success: true,
      question,
    });
  };
  static editQuestion = async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const data: EditQuestionData = req.body;
    const question = await questionService.editQuestion(id, data);
    res.status(200).json({
      success: true,
      question,
    });
  };
}
