import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import VideoContentPage from './VideoContentPage';
import { getVideos } from '../api/videos';

vi.mock('../api/videos');

describe('VideoContentPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    getVideos.mockReturnValue(new Promise(() => {})); // Never resolves
    
    render(
      <MemoryRouter>
        <VideoContentPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading videos/i)).toBeInTheDocument();
  });

  it('renders a list of videos after fetching data', async () => {
    const mockVideos = [
      { id: 1, title: 'Video A', youtube_id: '111' },
      { id: 2, title: 'Video B', youtube_id: '222', game: { id: 10, title: 'Game A' } }
    ];
    getVideos.mockResolvedValue(mockVideos);

    render(
      <MemoryRouter>
        <VideoContentPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Video A')).toBeInTheDocument();
      expect(screen.getByText('Video B')).toBeInTheDocument();
      expect(screen.getByText('Game A')).toBeInTheDocument(); // Checks if game assoc is rendered via VideoCard
    });

    expect(getVideos).toHaveBeenCalledTimes(1);
  });

  it('renders an error message if fetching fails', async () => {
    getVideos.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <VideoContentPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load videos/i)).toBeInTheDocument();
    });
  });

  it('renders an empty state if no videos are found', async () => {
    getVideos.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <VideoContentPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no videos available/i)).toBeInTheDocument();
    });
  });
});
