import api from "./client";

export const getStats = async () => {
  const response = await api.get("/stats/");
  return response.data;
};

export const getAchievements = async () => {
  const response = await api.get("/users/me/achievements/");
  return response.data;
};

export const getRecommendations = async () => {
  const response = await api.get("/recommendations/personalized/");
  return response.data;
};
