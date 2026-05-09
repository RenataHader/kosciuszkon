import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "../store/GameContext";

function LevelPage() {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const { gameState, completeLevel, loseLife } = useGame();
  const [showHackedMessage, setShowHackedMessage] = useState(false);

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

    if (gameState.lives - 1 === 0) {
      setShowHackedMessage(true);
    }
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

          <button
            className="secondary-button"
            onClick={handleWrongAnswer}
            disabled={gameState.lives === 0}
          >
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

      {showHackedMessage && (
        <div className="hacked-overlay" role="alertdialog" aria-modal="true">
          <div className="hacked-modal">
            <div className="hacked-icon" aria-hidden="true">
              💀
            </div>

            <h2>Zostałeś zhakowany haha</h2>

            <p>
              Straciłeś wszystkie życia. Cyberprzestępcy wykorzystali Twoje
              błędne decyzje.
            </p>

            <button
              className="primary-button"
              onClick={() => {
                setShowHackedMessage(false);
                navigate("/board");
              }}
            >
              Wróć do planszy
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default LevelPage;