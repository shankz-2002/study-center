export interface LevelProgress {
  score: number;
  percentage: number;
  completedAt: string;
}
export type ContinueLearningTopic = {
  topicId: string;
  topicName: string;
  description: string;
  totalLevels: number;
  completedLevels: number;
  percentage: number;
};
