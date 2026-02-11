import React, { useEffect, useState, useContext } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { AuthContext } from '../context/AuthContext';
import TaskList from '../components/Tasks/TaskList';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskDashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch tasks';
      setError(errorMsg);
      console.error('Fetch tasks error:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    try {
      const newTask = await createTask(title, description);
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add task');
    }
  };

  const handleUpdateTask = async (id: string, updatedFields: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(id, updatedFields);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="task-card">
        <h2>Welcome, {user}</h2>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <TaskList
        tasks={tasks}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskDashboardPage;

