import api from './client';

export const getVideos = async (search = '') => {
  const url = search ? `/videos/?search=${encodeURIComponent(search)}` : '/videos/';
  const response = await api.get(url);
  return response.data;
};

export const createVideo = async (data) => {
  const response = await api.post('/videos/', data);
  return response.data;
};

export const updateVideo = async (id, data) => {
  const response = await api.patch(`/videos/${id}/`, data);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/videos/${id}/`);
  return response.data;
};

export const getAuthors = async () => {
  const response = await api.get('/authors/');
  return response.data;
};
