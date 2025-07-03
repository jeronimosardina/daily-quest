import React from 'react';

function QuestLog({ quests, updateQuestProgress, xp, level }) {
  const handleSubtaskToggle = (questId, subtaskId) => {
    updateQuestProgress(questId, subtaskId);
  };

  return (
    <div>
      <h2>Quest Log</h2>
      <p>Nivel: {level} | XP: {xp}</p>
      {quests.map((quest) => (
        <div key={quest.id} style={{ marginBottom: '20px' }}>
          <h3>{quest.title}</h3>
          <ul>
            {quest.subtasks.map((subtask) => (
              <li key={subtask.id}>
                <label style={{ textDecoration: subtask.done ? 'line-through' : 'none' }}>
                  <input
                    type="checkbox"
                    checked={subtask.done}
                    onChange={() => handleSubtaskToggle(quest.id, subtask.id)}
                  />
                  {subtask.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuestLog;
