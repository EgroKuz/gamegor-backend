import api from './client';

export const getProfile = async () => {
  const response = await api.get('/users/profile/');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put('/users/profile/', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.post('/users/change_password/', data);
  return response.data;
};
