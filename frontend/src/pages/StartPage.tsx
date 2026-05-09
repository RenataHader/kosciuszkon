import { useNavigate } from "react-router-dom";
import { useGame } from "../store/GameContext";

function StartPage() {
  const navigate = useNavigate();
  const { startGame } = useGame();

  const handleStartGame = () => {
    startGame();
    navigate("/board");
  };

  return (
    <main className="page">
      <section className="hero">
        <h1>Cyber Awareness Game</h1>
        <p>
          Edukacyjna gra planszowa, która uczy rozpoznawania podstawowych
          cyberzagrożeń.
        </p>

        <button className="primary-button" onClick={handleStartGame}>
          Rozpocznij grę
        </button>
      </section>
    </main>
  );
}

export default StartPage;