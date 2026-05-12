import api from './client';

export const getGames = async (search = '') => {
  const url = search ? `/games/?search=${encodeURIComponent(search)}` : '/games/';
  const response = await api.get(url);
  return response.data;
};

export const getGameDetails = async (id) => {
  const response = await api.get(`/games/${id}/`);
  return response.data;
};
