import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getVideos } from './videos';

vi.mock('./client');

describe('Videos API Services', () => {
  it('getVideos fetches a list of videos', async () => {
    const mockData = [
      { id: 1, title: 'Epic Gameplay', youtube_id: 'abc123xyz', game: { title: 'Game A' } },
      { id: 2, title: 'Review', youtube_id: 'def456uvw', game: { title: 'Game B' } }
    ];
    api.get.mockResolvedValue({ data: mockData });

    const videos = await getVideos();
    expect(api.get).toHaveBeenCalledWith('/videos/');
    expect(videos).toEqual(mockData);
  });
});
