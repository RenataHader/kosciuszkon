import type { Level } from "../../types/game";

type BoardTileProps = {
  level: Level;
  onClick: (levelId: number) => void;
};

function BoardTile({ level, onClick }: BoardTileProps) {
  const isLocked = level.status === "locked";
  const isCompleted = level.status === "completed";

  return (
    <button
      className={`board-tile board-tile--${level.status}`}
      onClick={() => onClick(level.id)}
      disabled={isLocked}
      aria-label={`${level.title}, status: ${level.status}`}
    >
      <span className="board-tile__number">{level.id}</span>
      <span className="board-tile__title">{level.title}</span>
      <span className="board-tile__status">
        {isLocked && "Zablokowany"}
        {isCompleted && "Ukończony"}
        {level.status === "unlocked" && "Dostępny"}
      </span>
    </button>
  );
}

export default BoardTile;