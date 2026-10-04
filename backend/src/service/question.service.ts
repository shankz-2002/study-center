import type { SubmitAnswer } from "../types/answer.js";
import type {
  CreateQuestionData,
  EditQuestionData,
} from "../types/question.js";
import { ApiError } from "../utils/ApiError.js";
import { questionRepository } from "../utils/repository.js";
import { levelService } from "./level.service.js";

export class questionService {
  static createQuestion = async (data: CreateQuestionData) => {
    const {
      id,
      question,
      questionType,
      correctAnswer,
      explanation,
      order,
      options,
    } = data;
    const level = await levelService.getLevel(id);
    const newQuestion = questionRepository.create({
      question,
      questionType,
      correctAnswer,
      explanation,
      order,
      options,
      level,
    });
    return await questionRepository.save(newQuestion);
  };
  static getAllQuestions = async (id: string) => {
    await levelService.getLevel(id);
    const questions = await questionRepository.find({
      where: { level: { id } },
    });
    return questions.map(({ correctAnswer: _, ...question }) => question);
  };
  static getQuestion = async (id: string) => {
    const question = await questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new ApiError(404, "Question not found");
    }
    const { correctAnswer: _, ...newQuestion } = question;
    return newQuestion;
  };
  static deleteQuestion = async (id: string) => {
    const question = await questionRepository.findOne({
      where: { id },
    });
    if (!question) {
      throw new ApiError(404, "Question not found");
    }
    await questionRepository.remove(question);
    return question;
  };
  static editQuestion = async (id: string, data: EditQuestionData) => {
    const newQuestion = await questionRepository.preload({
      id,
      ...data,
    });
    if (!newQuestion) {
      throw new ApiError(404, "Question not found");
    }

    return await questionRepository.save(newQuestion);
  };

  static checkAnswer = async (id: string, data: SubmitAnswer) => {
    const questions = await questionRepository.find({
      where: {
        level: { id },
      },
    });

    let score = 0;

    for (const question of questions) {
      const submittedAnswer = data.answers[question.id];

      if (submittedAnswer === undefined) {
        continue;
      }

      if (question.questionType === "MCQ") {
        if (submittedAnswer === question.correctAnswer) {
          score++;
        }
      }

      if (question.questionType === "TRUE_FALSE") {
        if (submittedAnswer === question.correctAnswer) {
          score++;
        }
      }

      if (question.questionType === "MULTIPLE_SELECT") {
        if (!Array.isArray(submittedAnswer)) {
          continue;
        }

        if (!Array.isArray(question.correctAnswer)) {
          continue;
        }

        const submitted = [...submittedAnswer].sort();
        const correct = [...question.correctAnswer].sort();

        const isCorrect =
          submitted.length === correct.length &&
          submitted.every((answer, index) => answer === correct[index]);

        if (isCorrect) {
          score++;
        }
      }
    }

    return {
      score,
      total: questions.length,
      percentage: questions.length > 0 ? (score / questions.length) * 100 : 0,
    };
  };
}
