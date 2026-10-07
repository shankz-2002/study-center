import type { QuestionData } from "../types/Question";
import commonAPI, { baseUrl } from "./commonApi";

export const getQuestions = async (id: string) => {
  return await commonAPI("GET", `${baseUrl}/question/${id}`);
};
export const checkAnswer = async (
  levelId: string,
  answers: Record<string, string | string[]>,
) => {
  return await commonAPI("POST", `${baseUrl}/question/${levelId}/submit`, {
    answers,
  });
};
export const getAllQuestions = async () => {
  return await commonAPI("GET", `${baseUrl}/admin/questions`);
};

export const createQuestion = async (data: QuestionData, id: string) => {
  return await commonAPI("POST", `${baseUrl}/admin/question/${id}`, data);
};

export const updateQuestion = async (id: string, data: QuestionData) => {
  return await commonAPI("PUT", `${baseUrl}/admin/question/${id}`, data);
};
export const deleteQuestion = async (id: string) => {
  return await commonAPI("DELETE", `${baseUrl}/admin/question/${id}`);
};
