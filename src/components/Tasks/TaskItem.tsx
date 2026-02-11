import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  task: Task;
  updateTask: (id: string, updatedFields: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskItem = ({ task, updateTask, deleteTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleEdit = () => {
    if (editTitle.trim()) {
      updateTask(task.id, { title: editTitle, description: editDescription });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            style={{ width: '100%', marginBottom: '5px', padding: '5px' }}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description"
            style={{ width: '100%', marginBottom: '5px', padding: '5px', minHeight: '60px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleEdit} style={{ marginRight: '5px', padding: '5px 10px' }}>
              Save
            </button>
            <button onClick={handleCancel} style={{ padding: '5px 10px' }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none', margin: '0 0 5px 0' }}>
            {task.title}
          </h4>
          <p style={{ color: '#666', margin: '0 0 10px 0' }}>{task.description}</p>
          <div>
            <button
              onClick={() => updateTask(task.id, { completed: !task.completed })}
              style={{ marginRight: '5px', padding: '5px 10px' }}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              style={{ marginRight: '5px', padding: '5px 10px' }}
            >
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ padding: '5px 10px' }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
