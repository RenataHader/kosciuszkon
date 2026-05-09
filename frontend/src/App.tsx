import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import BoardPage from "./pages/BoardPage";
import LevelPage from "./pages/LevelPage";
import SummaryPage from "./pages/SummaryPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/level/:levelId" element={<LevelPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;