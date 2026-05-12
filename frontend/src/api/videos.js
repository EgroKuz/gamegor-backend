import api from './client';

export const getVideos = async () => {
  const response = await api.get('/videos/');
  return response.data;
};
