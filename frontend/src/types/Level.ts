export interface Level {
  id: string;
  levelName: string;
  description: string;
  order: number;
}

export interface LevelSideBarProps{
    levels:Level[];
    selectedLevel:Level |null;
    onSelectLevel:(level:Level)=>void
}