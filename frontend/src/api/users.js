import api from './client';

export const getProfile = async () => {
  const response = await api.get('/users/me/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.patch('/users/me/', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post('/users/change-password/', data);
  return response.data;
};
