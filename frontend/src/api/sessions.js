import api from './client';

export const getUserSessions = async () => {
  const response = await api.get('/sessions/');
  return response.data;
};
