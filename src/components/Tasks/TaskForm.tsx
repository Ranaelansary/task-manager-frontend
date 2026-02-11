import React, { useState } from 'react';

interface Props {
  addTask: (title: string, description: string) => void;
}

const TaskForm = ({ addTask }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
