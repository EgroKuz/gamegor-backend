import api from './client';

export const getUserSessions = async () => {
  const response = await api.get('/sessions/');
  return response.data;
};

export const getSession = async (id) => {
  const response = await api.get(`/sessions/${id}/`);
  return response.data;
};

export const createSession = async (sessionData) => {
  const response = await api.post('/sessions/', sessionData);
  return response.data;
};
