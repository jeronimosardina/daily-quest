// QuestLog.jsx
import React from 'react';
import '../App.css';

function QuestLog({ quests, setQuests, addXP }) {
  const handleToggleSubtask = (questIndex, subIndex) => {
    setQuests((prevQuests) => {
      const newQuests = [...prevQuests];
      const quest = newQuests[questIndex];
      const subtask = quest.subtasks[subIndex];

      if (!subtask.completed) {
        subtask.completed = true;
        quest.completedSubtasks = (quest.completedSubtasks || 0) + 1;
        addXP(25);
      } else {
        subtask.completed = false;
        quest.completedSubtasks = (quest.completedSubtasks || 1) - 1;
      }

      const allCompleted = quest.subtasks.every((st) => st.completed);
      quest.completed = allCompleted;

      return newQuests;
    });
  };

  return (
    <div className="tab-content">
      <h2>Quest Log</h2>
      {quests.length === 0 ? (
        <p>No hay quests creadas.</p>
      ) : (
        <ul>
          {quests.map((quest, questIndex) => (
            <li key={questIndex}>
              <h3 style={{ textDecoration: quest.completed ? 'line-through' : 'none' }}>
                {quest.title}
              </h3>
              <ul>
                {quest.subtasks.map((subtask, subIndex) => (
                  <li key={subIndex}>
                    <label>
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(questIndex, subIndex)}
                      />
                      <span style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>
                        {subtask.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestLog;
