import { useQuestStore } from "../data/useQuestStore";

const Rewards = () => {
  const rewards = useQuestStore((state) => state.rewards);
  const skills = useQuestStore((state) => state.skills);
  const spendSkill = useQuestStore((state) => state.spendSkill);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Recompensas</h2>
      <ul>
        {rewards.map((r) => (
          <li key={r.id} style={{ marginBottom: "1rem" }}>
            <strong>{r.name}</strong> — Costo: {r.cost} skill{r.cost > 1 ? "s" : ""}
            <br />
            <button
              disabled={skills < r.cost}
              onClick={() => spendSkill(r.id)}
            >
              Canjear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
