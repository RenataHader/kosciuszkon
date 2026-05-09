import { useNavigate } from "react-router-dom";
import { useGame } from "../store/GameContext";

function SummaryPage() {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGame();

  const completedLevels = gameState.levels.filter(
    (level) => level.status === "completed"
  ).length;

  const handleRestart = () => {
    resetGame();
    navigate("/");
  };

  return (
    <main className="page">
      <section className="summary-card">
        <h1>Podsumowanie gry</h1>

        <p>Ukończone poziomy: {completedLevels}/10</p>
        <p>Zdobyte punkty: {gameState.points}</p>
        <p>Pozostałe życia: {gameState.lives}</p>

        <button className="primary-button" onClick={handleRestart}>
          Zagraj ponownie
        </button>
      </section>
    </main>
  );
}

export default SummaryPage;