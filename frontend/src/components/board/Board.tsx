import type { Level } from "../../types/game";
import BoardTile from "./BoardTile";

type BoardProps = {
  levels: Level[];
  currentLevel: number;
  onSelectLevel: (levelId: number) => void;
};

function Board({ levels, currentLevel, onSelectLevel }: BoardProps) {
  return (
    <section className="board-path" aria-label="Plansza gry">
      <div key={currentLevel} className="board-camera">
        <svg
          className="board-road"
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M500 850
               C 360 780, 260 720, 360 650
               C 480 570, 700 590, 660 490
               C 620 400, 360 430, 390 320
               C 420 220, 610 230, 540 120"
          />
        </svg>

        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`board-path__position board-path__position--${
              index + 1
            }`}
          >
            {level.id === currentLevel && (
              <div className="player-pawn" aria-label="Aktualna pozycja gracza">
                🛡️
              </div>
            )}

            <BoardTile level={level} onClick={onSelectLevel} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Board;