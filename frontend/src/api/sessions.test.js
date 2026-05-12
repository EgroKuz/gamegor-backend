import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getUserSessions } from './sessions';

vi.mock('./client');

describe('Sessions API Services', () => {
  it('getUserSessions fetches sessions for current user', async () => {
    const mockData = [{ id: 1, game: { title: 'Game 1' } }];
    api.get.mockResolvedValue({ data: mockData });

    const sessions = await getUserSessions();
    expect(api.get).toHaveBeenCalledWith('/gamesessions/user_sessions/');
    expect(sessions).toEqual(mockData);
  });
});
