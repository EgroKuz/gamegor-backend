import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getStats, getAchievements, getRecommendations } from './dashboard';

vi.mock('./client');

describe('Dashboard API Services', () => {
  it('getStats fetches user statistics', async () => {
    const mockData = { games_played: 5, videos_watched: 10 };
    api.get.mockResolvedValue({ data: mockData });

    const stats = await getStats();
    expect(api.get).toHaveBeenCalledWith('/stats/');
    expect(stats).toEqual(mockData);
  });

  it('getAchievements fetches earned achievements', async () => {
    const mockData = [{ title: 'First Game' }];
    api.get.mockResolvedValue({ data: mockData });

    const achievements = await getAchievements();
    expect(api.get).toHaveBeenCalledWith('/users/me/achievements/');
    expect(achievements).toEqual(mockData);
  });

  it('getRecommendations fetches personalized recommendations', async () => {
    const mockData = [{ title: 'Cool Video' }];
    api.get.mockResolvedValue({ data: mockData });

    const recommendations = await getRecommendations();
    expect(api.get).toHaveBeenCalledWith('/recommendations/personalized/');
    expect(recommendations).toEqual(mockData);
  });
});
