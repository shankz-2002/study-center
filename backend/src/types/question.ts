export enum QuestionType {
  MCQ = "MCQ",
  MULTIPLE_SELECT = "MULTIPLE_SELECT",
  TRUE_FALSE = "TRUE_FALSE",
}
export type CreateQuestionData = {
  id: string;
  question: string;
  questionType: QuestionType;
  options: string[] | null;
  correctAnswer: string | string[];
  explanation: string;
  order: number;
};


export type EditQuestionData = {
  question: string;
  questionType: QuestionType;
  options: string[] | null;
  correctAnswer: string | string[];
  explanation: string;
  order: number;
};