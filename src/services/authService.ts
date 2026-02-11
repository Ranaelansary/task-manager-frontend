import api from './api';

export const signup = async (fullName: string, email: string, password: string) => {
  const response = await api.post('/auth/signup', { fullName, email, password });
  return response.data.data; // { id, email, fullName, token }
};

export const signin = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data.data; // { id, email, fullName, token }
};
