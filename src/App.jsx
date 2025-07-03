import { useState } from "react";
import CreateQuest from "./components/CreateQuest";
import QuestLog from "./components/QuestLog";
import Rewards from "./components/Rewards";
import { useQuestStore } from "./data/useQuestStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tab, setTab] = useState("log");
  const { xp, level, skills } = useQuestStore();

  return (
    <div style={{
      backgroundColor: "#000",
      color: "lime",
      minHeight: "100vh",
      fontFamily: "monospace",
    }}>
      <nav style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "1px solid lime",
      }}>
        <button onClick={() => setTab("log")}>📜 Quest Log</button>
        <button onClick={() => setTab("create")}>📝 Crear Quest</button>
        <button onClick={() => setTab("rewards")}>🎁 Recompensas</button>
      </nav>

      <div style={{
        padding: "1rem",
        borderBottom: "1px solid lime",
        backgroundColor: "#020",
      }}>
        <p>🔰 Level: {level} | ⚔️ XP: {xp} | 🧠 Skills: {skills}</p>
      </div>

      <main>
        {tab === "log" && <QuestLog />}
        {tab === "create" && <CreateQuest />}
        {tab === "rewards" && <Rewards />}
      </main>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
