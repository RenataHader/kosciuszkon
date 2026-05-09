import { useNavigate } from "react-router-dom";
import Board from "../components/board/Board";
import { useGame } from "../store/GameContext";

function BoardPage() {
  const navigate = useNavigate();
  const { gameState } = useGame();

  const handleSelectLevel = (levelId: number) => {
    const selectedLevel = gameState.levels.find((level) => level.id === levelId);

    if (!selectedLevel || selectedLevel.status === "locked") {
      return;
    }

    navigate(`/level/${levelId}`);
  };

  return (
    <main className="page">
      <header className="game-header">
        <div>
          <h1>Plansza gry</h1>
          <p>Wybierz dostępny poziom i wykonaj zadanie.</p>
        </div>

        <div className="game-stats" aria-label="Statystyki gry">
          <span>Punkty: {gameState.points}</span>
          <span>Życia: {gameState.lives}</span>
        </div>
      </header>

      <Board levels={gameState.levels} onSelectLevel={handleSelectLevel} />
    </main>
  );
}

export default BoardPage;