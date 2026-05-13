import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GamesPage from './GamesPage';
import { getGames } from '../api/games';
import { AuthContext } from '../context/AuthContext';

vi.mock('../api/games');

describe('GamesPage Component', () => {
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

  it('renders a loading state initially', () => {
    getGames.mockReturnValue(new Promise(() => {}));
    
    renderWithContext(<GamesPage />);

    expect(screen.getByText(/loading games/i)).toBeInTheDocument();
  });

  it('renders a grid of game cards with cover images or fallbacks after fetching data', async () => {
    const mockGames = [
      { id: 1, title: 'Game One', developer: 'Dev A', cover_image: 'http://example.com/game1.jpg' },
      { id: 2, title: 'Game Two', developer: 'Dev B' } // No image
    ];
    getGames.mockResolvedValue(mockGames);

    renderWithContext(<GamesPage />);

    await waitFor(() => {
      expect(screen.getByText('Game One')).toBeInTheDocument();
      expect(screen.getByText('Game Two')).toBeInTheDocument();
    });
    
    // Check image for Game One
    const img1 = screen.getByRole('img', { name: /game one cover/i });
    expect(img1).toHaveAttribute('src', 'http://example.com/game1.jpg');

    // Check fallback for Game Two
    const fallbackText = screen.getByText('No Image');
    expect(fallbackText).toBeInTheDocument();

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

    renderWithContext(<GamesPage />);

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

    renderWithContext(<GamesPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load games/i)).toBeInTheDocument();
    });
  });

  it('renders an empty state if no games are found', async () => {
    getGames.mockResolvedValue([]);

    renderWithContext(<GamesPage />);

    await waitFor(() => {
      expect(screen.getByText(/no games found/i)).toBeInTheDocument();
    });
  });

  it('does not render Add New Game button for regular users', async () => {
    getGames.mockResolvedValue([]);
    renderWithContext(<GamesPage />, { user: { is_staff: false } });

    await waitFor(() => {
      expect(screen.getByText(/no games found/i)).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /\+ add new game/i })).not.toBeInTheDocument();
  });

  it('renders Add New Game button for staff users and opens modal', async () => {
    getGames.mockResolvedValue([]);
    renderWithContext(<GamesPage />, { user: { is_staff: true } });

    await waitFor(() => {
      expect(screen.getByText(/no games found/i)).toBeInTheDocument();
    });

    const addBtn = screen.getByRole('button', { name: /\+ add new game/i });
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);

    // Modal should be open, showing 'Add New Game' title
    expect(screen.getByRole('heading', { name: 'Add New Game' })).toBeInTheDocument();
  });
});

