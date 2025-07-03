import { useState } from "react";
import { useQuestStore } from "../data/useQuestStore";

const QuestLog = () => {
  const quests = useQuestStore((state) => state.quests);
  const toggleSubtask = useQuestStore((state) => state.toggleSubtask);
  const [selectedQuest, setSelectedQuest] = useState(null);

  return (
    <div style={{ display: "flex", height: "80vh", padding: "1rem", color: "lime" }}>
      <div style={{ width: "30%", borderRight: "1px solid #0f0" }}>
        <h2>Quest Log</h2>
        {quests.map((q) => (
          <div
            key={q.id}
            onClick={() => setSelectedQuest(q)}
            style={{
              cursor: "pointer",
              padding: "0.5rem",
              backgroundColor: selectedQuest?.id === q.id ? "#030" : "transparent",
              textDecoration: q.completed ? "line-through" : "none",
            }}
          >
            {q.title}
          </div>
        ))}
      </div>
      <div style={{ width: "70%", padding: "1rem" }}>
        {selectedQuest ? (
          <>
            <h2>{selectedQuest.title}</h2>
            <ul>
              {selectedQuest.subtasks.map((st) => (
                <li key={st.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={st.done}
                      onChange={() => toggleSubtask(selectedQuest.id, st.id)}
                    />
                    {" "}{st.text}
                  </label>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Seleccioná una quest para ver los detalles</p>
        )}
      </div>
    </div>
  );
};

export default QuestLog;
