import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  updateTask: (id: string, updatedFields: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskList = ({ tasks, updateTask, deleteTask }: Props) => {
  return (
    <div className="tasks-container">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
