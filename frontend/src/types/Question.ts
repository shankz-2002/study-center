import type { Level } from "./Level";

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
  level: Level;
}

export type QuestionType = "MCQ" | "MULTIPLE_SELECT" | "TRUE_FALSE";

export type QuestionModalProps = {
  open: boolean;
  title: string;
  levels: Level[];
  initialData?: AdminQuestion;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    question: string;
    questionType: QuestionType;
    options: string[] | null;
    correctAnswer: string | string[];
    explanation: string | null;
    order: number;
    levelId: string;
  }) => void | Promise<void>;
};

export interface AdminQuestion extends Question {
  correctAnswer: string | string[];
}

export interface QuestionData {
  levelId: string;
  question: string;
  questionType: QuestionType;
  options: string[] | null;
  correctAnswer: string | string[];
  explanation: string | null;
  order: number;
}
