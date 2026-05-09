import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../store/GameContext";

function LevelPage() {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { gameState, completeLevel, loseLife } = useGame();

  const numericLevelId = Number(levelId);

  const level = gameState.levels.find((item) => item.id === numericLevelId);

  if (!level) {
    return (
      <main className="page">
        <h1>Nie znaleziono poziomu</h1>
        <button className="primary-button" onClick={() => navigate("/board")}>
          Wróć do planszy
        </button>
      </main>
    );
  }

  if (level.status === "locked") {
    return (
      <main className="page">
        <h1>Ten poziom jest zablokowany</h1>
        <button className="primary-button" onClick={() => navigate("/board")}>
          Wróć do planszy
        </button>
      </main>
    );
  }

  const handleCorrectAnswer = () => {
    completeLevel(numericLevelId);

    if (numericLevelId === 10) {
      navigate("/summary");
      return;
    }

    navigate("/board");
  };

  const handleWrongAnswer = () => {
    loseLife();
  };

  return (
    <main className="page">
      <section className="level-card">
        <p className="level-label">Poziom {numericLevelId}</p>
        <h1>{level.title}</h1>

        <p>
          To jest tymczasowy ekran poziomu. Później będzie tutaj właściwe
          zadanie cyberbezpieczeństwa.
        </p>

        <div className="level-actions">
          <button className="primary-button" onClick={handleCorrectAnswer}>
            Symuluj poprawną odpowiedź
          </button>

          <button className="secondary-button" onClick={handleWrongAnswer}>
            Symuluj błędną odpowiedź
          </button>

          <button className="secondary-button" onClick={() => navigate("/board")}>
            Wróć do planszy
          </button>
        </div>

        <p className="small-text">
          Punkty: {gameState.points} | Życia: {gameState.lives}
        </p>
      </section>
    </main>
  );
}

export default LevelPage;