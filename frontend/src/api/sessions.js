import api from './client';

export const getUserSessions = async () => {
  const response = await api.get('/gamesessions/user_sessions/');
  return response.data;
};
