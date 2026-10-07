import type { Topic } from "./Topic";

export interface Level {
  id: string;
  levelName: string;
  description: string;
  order: number;
  topic?: Topic;
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
