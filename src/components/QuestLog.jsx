import React from "react";

export default function QuestLog({ quests, onToggle, themeColor }) {
  return (
    <div>
      <h2>Quest Log</h2>
      {quests.map((quest, questIndex) => (
        <div key={questIndex} style={{ marginBottom: "1rem" }}>
          <strong>{quest.title}</strong>
          {quest.subquests.map((sub, subIndex) => (
            <div key={subIndex}>
              <input
                type="checkbox"
                checked={sub.completed}
                onChange={() => onToggle(questIndex, subIndex)}
              />
              <span
                style={{
                  textDecoration: sub.completed ? "line-through" : "none",
                  opacity: sub.completed ? 0.6 : 1,
                  color: sub.completed ? themeColor : "#fff",
                  fontFamily: "monospace"
                }}
              >
                {sub.text}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
