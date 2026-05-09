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

      <span className="board-tile__icon" aria-hidden="true">
        {isLocked && "🔒"}
        {isCompleted && "✅"}
        {level.status === "unlocked" && "⭐"}
      </span>

      <span className="board-tile__title">{level.title}</span>
    </button>
  );
}

export default BoardTile;