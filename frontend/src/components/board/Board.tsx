import type { Level } from "../../types/game";
import BoardTile from "./BoardTile";

type BoardProps = {
  levels: Level[];
  onSelectLevel: (levelId: number) => void;
};

function Board({ levels, onSelectLevel }: BoardProps) {
  return (
    <section className="board" aria-label="Plansza gry">
      {levels.map((level) => (
        <BoardTile key={level.id} level={level} onClick={onSelectLevel} />
      ))}
    </section>
  );
}

export default Board;