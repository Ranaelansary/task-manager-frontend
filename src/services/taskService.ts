import api from './api';

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data.data;
};

export const createTask = async (title: string, description: string) => {
  const response = await api.post('/tasks', { title, description });
  return response.data.data;
};

export const updateTask = async (id: string, data: any) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data.data;
};
