import { useState } from 'react';

function CreateQuest({ addQuest }) {
  const [title, setTitle] = useState('');
  const [subtasks, setSubtasks] = useState(['']);

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    const filteredSubtasks = subtasks.map(t => t.trim()).filter(t => t);
    if (filteredSubtasks.length === 0) return;

    const quest = {
      id: Date.now(),
      title,
      subtasks: filteredSubtasks.map((t, idx) => ({ id: `${Date.now()}-${idx}`, text: t, done: false })),
      completed: false,
    };

    addQuest(quest);
    setTitle('');
    setSubtasks(['']);
  };

  return (
    <div>
      <h2>Crear Quest</h2>
      <input
        type="text"
        placeholder="Título de la quest"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3>Subtareas</h3>
      {subtasks.map((sub, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Subtarea ${index + 1}`}
          value={sub}
          onChange={(e) => handleSubtaskChange(index, e.target.value)}
        />
      ))}
      <button onClick={handleAddSubtask}>+ Subtarea</button>
      <button onClick={handleCreate}>Crear</button>
    </div>
  );
}

export default CreateQuest;
