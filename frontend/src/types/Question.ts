export interface QuestionTypeProps {
  levelId: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[] | null;
  explanation: string | null;
  order: number;
  questionType: QuestionType;
}

export type QuestionType = "MCQ" | "MULTIPLE_SELECT" | "TRUE_FALSE";
