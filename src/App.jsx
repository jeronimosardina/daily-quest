// App.jsx
import { useState, useEffect } from "react";
import CreateQuest from "./components/CreateQuest";
import QuestLog from "./components/QuestLog";
import Rewards from "./components/Rewards";
import Footer from "./components/Footer";
import { useQuestStore } from "./data/useQuestStore";
import "./App.css";

function App() {
  const { quests, addQuest, completeSubquest, xp, level, skills, claimReward } = useQuestStore();
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "#00ff91";
  });

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
  }, [themeColor]);

  return (
    <div className="App">
      <h1>Daily Quest</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Color del progreso: </label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>

      <CreateQuest onAdd={addQuest} />
      <QuestLog quests={quests} onToggle={completeSubquest} themeColor={themeColor} />
      <Rewards level={level} skills={skills} onClaim={claimReward} />

      <div className="stats">
        <p>XP: {xp}</p>
        <p>Nivel: {level}</p>
        <p>Skills: {skills}</p>
      </div>

      <Footer />
    </div>
  );
}

export default App;
