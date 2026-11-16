import type { SubmitAnswer } from "../types/answer.js";
import type {
  CreateQuestionData,
  EditQuestionData,
} from "../types/question.js";
import { ApiError } from "../utils/ApiError.js";
import { progressRepository, questionRepository } from "../utils/repository.js";
import { levelService } from "./level.service.js";
import { levelProgressService } from "./levelProgress.service.js";
import { UserTopicCompletionService } from "./userLevelCompletion.service.js";

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

  static checkAnswer = async (
    userId: string,
    id: string,
    data: SubmitAnswer,
  ) => {
    const progress = await progressRepository.findOne({
      where: {
        user: { id: userId },
        level: { id },
      },
    });

    if (progress) {
      throw new ApiError(409, "Already answered the questions and passed");
    }

    const questions = await questionRepository.find({
      where: {
        level: { id },
      },
      order: {
        order: "ASC",
      },
    });

    let score = 0;

    for (const question of questions) {
      const submittedAnswer = data.answers[question.id];

      if (submittedAnswer === undefined) {
        continue;
      }

      let isCorrect = false;

      // MCQ comparison
      if (question.questionType === "MCQ") {
        isCorrect =
          typeof submittedAnswer === "string" &&
          typeof question.correctAnswer === "string" &&
          submittedAnswer.trim() === question.correctAnswer.trim();
      }

      // TRUE_FALSE comparison (case-insensitive)
      if (question.questionType === "TRUE_FALSE") {
        isCorrect =
          typeof submittedAnswer === "string" &&
          typeof question.correctAnswer === "string" &&
          submittedAnswer.trim().toLowerCase() ===
            question.correctAnswer.trim().toLowerCase();
      }

      // MULTIPLE_SELECT comparison
      if (question.questionType === "MULTIPLE_SELECT") {
        if (
          Array.isArray(submittedAnswer) &&
          Array.isArray(question.correctAnswer)
        ) {
          const submitted = submittedAnswer
            .map((answer) => String(answer).trim())
            .sort();

          const correct = question.correctAnswer
            .map((answer) => String(answer).trim())
            .sort();

          isCorrect =
            submitted.length === correct.length &&
            submitted.every((answer, index) => answer === correct[index]);
        }
      }

      if (isCorrect) {
        score++;
      }
    }

    const total = questions.length;

    const percentage =
      total > 0 ? Number(((score / total) * 100).toFixed(2)) : 0;

    const passed = percentage >= 80;

    if (passed) {
      await levelProgressService.createProgress(userId, id, score, percentage);

      await UserTopicCompletionService.createCompletion(userId, id);
    }

    return {
      score,
      total,
      percentage,
      passed,
    };
  };

  static getQuestions = async () => {
    return await questionRepository.find({
      relations: {
        level: {
          topic: {
            category: {
              field: true,
            },
          },
        },
      },
      order: {
        order: "ASC",
      },
    });
  };
}
