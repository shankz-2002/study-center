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
