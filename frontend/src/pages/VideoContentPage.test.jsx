import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import VideoContentPage from './VideoContentPage';
import { getVideos } from '../api/videos';
import { AuthContext } from '../context/AuthContext';

vi.mock('../api/videos');

describe('VideoContentPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithContext = (ui, { user = null } = {}) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
          {ui}
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('renders loading state initially', () => {
    getVideos.mockReturnValue(new Promise(() => {})); // Never resolves
    
    renderWithContext(<VideoContentPage />);

    expect(screen.getByText(/loading videos/i)).toBeInTheDocument();
  });

  it('renders a list of videos and a search input after fetching data', async () => {
    const mockVideos = [
      { id: 1, title: 'Video A', youtube_id: '111' },
      { id: 2, title: 'Video B', youtube_id: '222', game: 10, game_title: 'Game A' }
    ];
    getVideos.mockResolvedValue(mockVideos);

    renderWithContext(<VideoContentPage />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search videos/i)).toBeInTheDocument();
      expect(screen.getByText('Video A')).toBeInTheDocument();
      expect(screen.getByText('Video B')).toBeInTheDocument();
      expect(screen.getByText('Game A')).toBeInTheDocument(); // Checks if game assoc is rendered via VideoCard
    });

    expect(getVideos).toHaveBeenCalledTimes(1);
  });

  it('filters videos based on search query', async () => {
    const user = userEvent.setup();
    const mockVideos = [
      { id: 1, title: 'Dark Souls Guide', description: 'Hard boss', author_name: 'GamerX', youtube_id: '111' },
      { id: 2, title: 'Mario Speedrun', description: 'Fast', author_name: 'Speedy', youtube_id: '222' }
    ];
    getVideos.mockResolvedValue(mockVideos);

    renderWithContext(<VideoContentPage />);

    await waitFor(() => {
      expect(screen.getByText('Dark Souls Guide')).toBeInTheDocument();
      expect(screen.getByText('Mario Speedrun')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search videos/i);

    // Search by title
    await user.type(searchInput, 'mario');
    expect(screen.queryByText('Dark Souls Guide')).not.toBeInTheDocument();
    expect(screen.getByText('Mario Speedrun')).toBeInTheDocument();

    await user.clear(searchInput);

    // Search by description
    await user.type(searchInput, 'boss');
    expect(screen.getByText('Dark Souls Guide')).toBeInTheDocument();
    expect(screen.queryByText('Mario Speedrun')).not.toBeInTheDocument();

    await user.clear(searchInput);

    // Search by author
    await user.type(searchInput, 'speedy');
    expect(screen.queryByText('Dark Souls Guide')).not.toBeInTheDocument();
    expect(screen.getByText('Mario Speedrun')).toBeInTheDocument();
  });

  it('displays empty state when search yields no results', async () => {
    const user = userEvent.setup();
    getVideos.mockResolvedValue([{ id: 1, title: 'Video A', youtube_id: '111' }]);

    renderWithContext(<VideoContentPage />);

    await waitFor(() => {
      expect(screen.getByText('Video A')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search videos/i);
    await user.type(searchInput, 'xyz123');

    expect(screen.queryByText('Video A')).not.toBeInTheDocument();
    expect(screen.getByText(/no matching videos found/i)).toBeInTheDocument();
  });

  it('renders an error message if fetching fails', async () => {
    getVideos.mockRejectedValue(new Error('Network Error'));

    renderWithContext(<VideoContentPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load videos/i)).toBeInTheDocument();
    });
  });

  it('renders a global empty state if no videos are found at all', async () => {
    getVideos.mockResolvedValue([]);

    renderWithContext(<VideoContentPage />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search videos/i)).toBeInTheDocument();
      expect(screen.getByText(/no videos available/i)).toBeInTheDocument();
    });
  });

  it('does not render Add New Video button for regular users', async () => {
    getVideos.mockResolvedValue([]);
    renderWithContext(<VideoContentPage />, { user: { is_staff: false } });

    await waitFor(() => {
      expect(screen.getByText(/no videos available/i)).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /\+ add new video/i })).not.toBeInTheDocument();
  });

  it('renders Add New Video button for staff users and opens modal', async () => {
    getVideos.mockResolvedValue([]);
    renderWithContext(<VideoContentPage />, { user: { is_staff: true } });

    await waitFor(() => {
      expect(screen.getByText(/no videos available/i)).toBeInTheDocument();
    });

    const addBtn = screen.getByRole('button', { name: /\+ add new video/i });
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);

    // Modal should be open, showing 'Add New Video' title
    expect(screen.getByRole('heading', { name: 'Add New Video' })).toBeInTheDocument();
  });
});

