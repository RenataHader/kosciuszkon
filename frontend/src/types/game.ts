export type LevelStatus = "locked" | "unlocked" | "completed";

export type Level = {
  id: number;
  title: string;
  status: LevelStatus;
};

export type GameState = {
  currentLevel: number;
  points: number;
  lives: number;
  levels: Level[];
};