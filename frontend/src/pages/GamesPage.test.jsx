import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GamesPage from './GamesPage';
import { getGames } from '../api/games';

vi.mock('../api/games');

describe('GamesPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a loading state initially', () => {
    getGames.mockReturnValue(new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading games/i)).toBeInTheDocument();
  });

  it('renders a grid of game cards after fetching data', async () => {
    const mockGames = [
      { id: 1, title: 'Game One', developer: 'Dev A' },
      { id: 2, title: 'Game Two', developer: 'Dev B' }
    ];
    getGames.mockResolvedValue(mockGames);

    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Game One')).toBeInTheDocument();
      expect(screen.getByText('Game Two')).toBeInTheDocument();
    });

    expect(getGames).toHaveBeenCalledTimes(1);
    // Initial call should be without a search term
    expect(getGames).toHaveBeenCalledWith('');
  });

  it('filters games when searching', async () => {
    const user = userEvent.setup();
    const initialMockGames = [
      { id: 1, title: 'Elden Ring', developer: 'FromSoftware' },
      { id: 2, title: 'Dark Souls', developer: 'FromSoftware' }
    ];
    
    // First call returns all games
    getGames.mockResolvedValueOnce(initialMockGames);
    
    // Second call simulates backend returning filtered games based on 'Elden'
    const filteredMockGames = [{ id: 1, title: 'Elden Ring', developer: 'FromSoftware' }];
    getGames.mockResolvedValueOnce(filteredMockGames);

    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    );

    // Wait for initial render
    await waitFor(() => {
      expect(screen.getByText('Elden Ring')).toBeInTheDocument();
      expect(screen.getByText('Dark Souls')).toBeInTheDocument();
    });

    // Find search input and type
    const searchInput = screen.getByPlaceholderText(/search games/i);
    await user.type(searchInput, 'Elden{enter}');

    // Wait for filtered render
    await waitFor(() => {
      expect(screen.getByText('Elden Ring')).toBeInTheDocument();
      expect(screen.queryByText('Dark Souls')).not.toBeInTheDocument();
    });
    
    // Verify getGames was called with the search term
    expect(getGames).toHaveBeenCalledTimes(2);
    expect(getGames).toHaveBeenLastCalledWith('Elden');
  });

  it('renders an error message if fetching fails', async () => {
    getGames.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load games/i)).toBeInTheDocument();
    });
  });

  it('renders an empty state if no games are found', async () => {
    getGames.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <GamesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no games found/i)).toBeInTheDocument();
    });
  });
});

