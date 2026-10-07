import type { Level } from "./Level";

export interface LearningContentType {
  id: string;
  title: string;
  content: string;
  order: number;
  level:Level
}
export interface LearningContentProps{
    levelId:string
}

export interface LearningContentData {
  title: string;
  content: string;
  order: number;
}
