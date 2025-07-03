import { create } from "zustand";
import { notifyLevelUp } from "../utils/toastUtils";

// Cargar desde localStorage si existe
const savedState = JSON.parse(localStorage.getItem("rpgState")) || {};
const maxLevel = 1000;

export const useQuestStore = create((set) => ({
  quests: savedState.quests || [],
  xp: savedState.xp || 0,
  level: savedState.level || 1,
  skills: savedState.skills || 0,
  rewards: [
    { id: 1, name: "Pedir delivery", cost: 1 },
    { id: 2, name: "Tarde libre", cost: 2 },
    { id: 3, name: "Comprarse una remera", cost: 3 },
    { id: 4, name: "Salir con amigos", cost: 4 },
    {id: 5, name: "2 horas de Gaming", cost:6},
    {id: 6, name: "Salir de noche", cost:10}
  ],

  addQuest: (title, subtasks) =>
    set((state) => ({
      quests: [
        ...state.quests,
        {
          id: Date.now(),
          title,
          completed: false,
          subtasks: subtasks.map((text, i) => ({
            id: i + 1,
            text,
            done: false,
          })),
        },
      ],
    })),

  toggleSubtask: (questId, subtaskId) =>
    set((state) => {
      const updatedQuests = state.quests.map((q) => {
        if (q.id !== questId) return q;

        const updatedSubtasks = q.subtasks.map((s) =>
          s.id === subtaskId ? { ...s, done: !s.done } : s
        );

        const allDone = updatedSubtasks.every((s) => s.done);
        const newlyCompleted = allDone && !q.completed;

        let addedXp = 0;
        let newXp = state.xp;
        let newLevel = state.level;
        let newSkills = state.skills;

        if (newlyCompleted) {
          const subquestsCompleted = updatedSubtasks.length;
          addedXp = subquestsCompleted * 25;
          newXp += addedXp;

          while (
            newLevel < maxLevel &&
            newXp >= requiredXpForLevel(newLevel + 1)
          ) {
            newXp -= requiredXpForLevel(newLevel + 1);
            newLevel++;
            newSkills++;
            notifyLevelUp(newLevel);
          }
        }

        return {
          ...q,
          subtasks: updatedSubtasks,
          completed: allDone,
        };
      });

      return {
        quests: updatedQuests,
        xp: state.xp + addedXp,
        level: state.level,
        skills: state.skills,
      };
    }),

  spendSkill: (rewardId) =>
    set((state) => {
      const reward = state.rewards.find((r) => r.id === rewardId);
      if (!reward || state.skills < reward.cost) return {};
      return {
        skills: state.skills - reward.cost,
      };
    }),
}));

// XP necesaria para pasar al nivel siguiente
function requiredXpForLevel(level) {
  return level * 100;
}

// Guardar automáticamente en localStorage
useQuestStore.subscribe((state) => {
  const saveState = {
    quests: state.quests,
    xp: state.xp,
    level: state.level,
    skills: state.skills,
  };
  localStorage.setItem("rpgState", JSON.stringify(saveState));
});
