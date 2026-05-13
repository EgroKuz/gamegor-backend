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

export const createGame = async (data) => {
  const response = await api.post('/games/', data);
  return response.data;
};

export const updateGame = async (id, data) => {
  const response = await api.patch(`/games/${id}/`, data);
  return response.data;
};

export const deleteGame = async (id) => {
  const response = await api.delete(`/games/${id}/`);
  return response.data;
};


