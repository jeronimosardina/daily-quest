import { useState } from "react";
import { useQuestStore } from "../data/useQuestStore";

const CreateQuest = () => {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([""]);
  const addQuest = useQuestStore((state) => state.addQuest);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && subtasks.filter((s) => s.trim()).length > 0) {
      addQuest(title, subtasks);
      setTitle("");
      setSubtasks([""]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", color: "lime" }}>
      <h2>Crear Quest</h2>
      <input
        type="text"
        placeholder="Título de la quest"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <h3>Subtareas</h3>
      {subtasks.map((sub, i) => (
        <input
          key={i}
          type="text"
          value={sub}
          onChange={(e) => {
            const newSubs = [...subtasks];
            newSubs[i] = e.target.value;
            setSubtasks(newSubs);
          }}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
      ))}
      <button type="button" onClick={() => setSubtasks([...subtasks, ""])}>+ Subtarea</button>
      <br /><br />
      <button type="submit">Crear</button>
    </form>
  );
};

export default CreateQuest;
