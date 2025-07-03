import React, { useState, useEffect } from 'react';
import CreateQuest from './components/CreateQuest';
import QuestLog from './components/QuestLog';
import Rewards from './components/Rewards';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const savedState = JSON.parse(localStorage.getItem('daily-quest-state')) || {};
  const [quests, setQuests] = useState(savedState.quests || []);
  const [xp, setXp] = useState(savedState.xp || 0);
  const [level, setLevel] = useState(savedState.level || 1);
  const [skills, setSkills] = useState(savedState.skills || 0);
  const [activeTab, setActiveTab] = useState('create');
  const [themeColor, setThemeColor] = useState(savedState.themeColor || '#32CD32');

  useEffect(() => {
    localStorage.setItem('daily-quest-state', JSON.stringify({ quests, xp, level, skills, themeColor }));
  }, [quests, xp, level, skills, themeColor]);

  const addQuest = (quest) => {
    setQuests([...quests, quest]);
    toast.success('Quest creada ✨');
  };

  const updateQuestProgress = (questId, subtaskId) => {
    const updatedQuests = quests.map((quest) => {
      if (quest.id === questId) {
        const updatedSubtasks = quest.subtasks.map((subtask) =>
          subtask.id === subtaskId ? { ...subtask, done: !subtask.done } : subtask
        );

        const newlyCompleted = updatedSubtasks.find((subtask, idx) =>
          subtask.id === subtaskId && !quest.subtasks[idx].done
        );

        if (newlyCompleted) {
          const gainedXp = 25;
          let newXp = xp + gainedXp;
          let newLevel = level;
          let newSkills = skills;

          const xpToNextLevel = (lvl) => lvl * 100;

          while (newXp >= xpToNextLevel(newLevel)) {
            newXp -= xpToNextLevel(newLevel);
            newLevel++;
            newSkills++;
            toast(`🔼 Nivel ${newLevel}`, { icon: '🎉' });
          }

          setXp(newXp);
          setLevel(newLevel);
          setSkills(newSkills);
        }

        const questCompleted = updatedSubtasks.every((sub) => sub.done);
        return { ...quest, subtasks: updatedSubtasks, completed: questCompleted };
      }
      return quest;
    });

    setQuests(updatedQuests);
  };

  return (
    <div className="App" style={{ '--theme-color': themeColor }}>
      <Toaster />
      <h1>Daily Quest</h1>
      <nav>
        <button onClick={() => setActiveTab('create')}>Crear</button>
        <button onClick={() => setActiveTab('log')}>Log</button>
        <button onClick={() => setActiveTab('rewards')}>Recompensas</button>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          title="Elegir color UI"
        />
      </nav>

      {activeTab === 'create' && <CreateQuest addQuest={addQuest} />}
      {activeTab === 'log' && (
        <QuestLog quests={quests} updateQuestProgress={updateQuestProgress} xp={xp} level={level} />
      )}
      {activeTab === 'rewards' && <Rewards skills={skills} setSkills={setSkills} showToast={toast} />}
    </div>
  );
}

export default App;
