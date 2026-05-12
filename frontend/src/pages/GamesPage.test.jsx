import { render, screen, waitFor } from '@testing-library/react';
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
    // Return an unresolved promise to keep it in loading state
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

    // Wait for the loading to finish and data to render
    await waitFor(() => {
      expect(screen.getByText('Game One')).toBeInTheDocument();
      expect(screen.getByText('Game Two')).toBeInTheDocument();
    });

    // Ensure the API was called
    expect(getGames).toHaveBeenCalledTimes(1);
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
