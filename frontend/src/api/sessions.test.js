import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getUserSessions, getSession, createSession, getSessionAdvice } from './sessions';

vi.mock('./client');

describe('Sessions API Services', () => {
  it('getUserSessions fetches sessions for current user', async () => {
    const mockData = [{ id: 1, game: { title: 'Game 1' } }];
    api.get.mockResolvedValue({ data: mockData });

    const sessions = await getUserSessions();
    expect(api.get).toHaveBeenCalledWith('/sessions/');
    expect(sessions).toEqual(mockData);
  });

  it('getSession fetches a specific session by id', async () => {
    const mockData = { id: 1, game: { title: 'Game 1' } };
    api.get.mockResolvedValue({ data: mockData });

    const session = await getSession(1);
    expect(api.get).toHaveBeenCalledWith('/sessions/1/');
    expect(session).toEqual(mockData);
  });

  it('createSession sends a POST request with session data', async () => {
    const sessionData = { game: 1, rating: 8, comment: 'Great game!', duration_minutes: 120 };
    const mockResponse = { id: 2, ...sessionData };
    api.post.mockResolvedValue({ data: mockResponse });

    const result = await createSession(sessionData);
    expect(api.post).toHaveBeenCalledWith('/sessions/', sessionData);
    expect(result).toEqual(mockResponse);
  });

  it('getSessionAdvice fetches advice based on params', async () => {
    const params = { game: 1, tags: 'aim', comment: 'test' };
    const mockResponse = { ai_advice: 'Keep practicing!' };
    api.get.mockResolvedValue({ data: mockResponse });

    const result = await getSessionAdvice(params);
    expect(api.get).toHaveBeenCalledWith('/session-advice/', { params });
    expect(result).toEqual(mockResponse);
  });
});
