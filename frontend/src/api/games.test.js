import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getGames, getGameDetails, updateGame } from './games';

vi.mock('./client');

describe('Games API Services', () => {
  it('getGames fetches the list of games', async () => {
    const mockData = [{ id: 1, title: 'Test Game 1' }, { id: 2, title: 'Test Game 2' }];
    api.get.mockResolvedValue({ data: mockData });

    const games = await getGames();
    expect(api.get).toHaveBeenCalledWith('/games/');
    expect(games).toEqual(mockData);
  });

  it('getGames passes search query if provided', async () => {
    const mockData = [{ id: 1, title: 'Elden Ring' }];
    api.get.mockResolvedValue({ data: mockData });

    const games = await getGames('Elden Ring');
    expect(api.get).toHaveBeenCalledWith('/games/?search=Elden%20Ring');
    expect(games).toEqual(mockData);
  });

  it('getGameDetails fetches details for a specific game', async () => {
    const mockData = { id: 1, title: 'Test Game 1', description: 'A great game' };
    api.get.mockResolvedValue({ data: mockData });

    const gameDetails = await getGameDetails(1);
    expect(api.get).toHaveBeenCalledWith('/games/1/');
    expect(gameDetails).toEqual(mockData);
  });

  it('updateGame sends a PATCH request to update game details', async () => {
    const mockData = { id: 1, title: 'Updated Title' };
    api.patch.mockResolvedValue({ data: mockData });

    const result = await updateGame(1, { title: 'Updated Title' });
    expect(api.patch).toHaveBeenCalledWith('/games/1/', { title: 'Updated Title' });
    expect(result).toEqual(mockData);
  });
});
