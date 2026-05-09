import { createContext, useContext, useState, type ReactNode } from "react";
import type { GameState, Level } from "../types/game";

type GameContextType = {
  gameState: GameState;
  startGame: () => void;
  completeLevel: (levelId: number, pointsToAdd?: number) => void;
  loseLife: () => void;
  resetGame: () => void;
};

const initialLevels: Level[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Poziom ${index + 1}`,
  status: index === 0 ? "unlocked" : "locked",
}));

const initialGameState: GameState = {
  currentLevel: 1,
  points: 0,
  lives: 3,
  levels: initialLevels,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = () => {
    setGameState(initialGameState);
  };

  const completeLevel = (levelId: number, pointsToAdd = 10) => {
    setGameState((previousState) => {
      const updatedLevels = previousState.levels.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            status: "completed" as const,
          };
        }

        if (level.id === levelId + 1 && level.status === "locked") {
          return {
            ...level,
            status: "unlocked" as const,
          };
        }

        return level;
      });

      return {
        ...previousState,
        currentLevel: Math.min(levelId + 1, 10),
        points: previousState.points + pointsToAdd,
        levels: updatedLevels,
      };
    });
  };

  const loseLife = () => {
    setGameState((previousState) => ({
      ...previousState,
      lives: Math.max(previousState.lives - 1, 0),
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        startGame,
        completeLevel,
        loseLife,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }

  return context;
}