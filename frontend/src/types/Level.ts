import type { Topic } from "./Topic";

export interface Level {
  id: string;
  levelName: string;
  description: string;
  order: number;
  topic?: Topic;
  isCompleted: boolean;
  isUnlocked: boolean;
}
export interface LevelSideBarProps {
  levels: Level[];
  selectedLevel: Level | null;
  onSelectLevel: (level: Level) => void;
}

export interface LevelData {
  levelName: string;
  description: string;
  order: number;
}
