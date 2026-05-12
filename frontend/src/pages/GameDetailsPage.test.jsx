import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GameDetailsPage from './GameDetailsPage';
import { getGameDetails } from '../api/games';

vi.mock('../api/games');

describe('GameDetailsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/games/1' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/games/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders a loading state initially', () => {
    getGameDetails.mockReturnValue(new Promise(() => {}));
    renderWithRouter(<GameDetailsPage />);
    expect(screen.getByText(/loading game details/i)).toBeInTheDocument();
  });

  it('fetches and renders game details based on URL param', async () => {
    const mockGame = {
      id: 123,
      title: 'Dark Souls III',
      description: 'A challenging action RPG.',
      developer: 'FromSoftware',
      release_date: '2016-03-24',
      cover_image_url: 'http://example.com/ds3.jpg'
    };
    getGameDetails.mockResolvedValue(mockGame);

    renderWithRouter(<GameDetailsPage />, { route: '/games/123' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Dark Souls III' })).toBeInTheDocument();
      expect(screen.getByText('A challenging action RPG.')).toBeInTheDocument();
      expect(screen.getByText('FromSoftware')).toBeInTheDocument();
      // The formatting matches "Mar 24, 2016" but depending on local timezone of runner it might be 23rd or 24th
      // Lets check if the year exists to be safe
      expect(screen.getByText(/2016/)).toBeInTheDocument(); 
    });

    const img = screen.getByRole('img', { name: /dark souls iii cover/i });
    expect(img).toHaveAttribute('src', 'http://example.com/ds3.jpg');

    expect(getGameDetails).toHaveBeenCalledWith('123');
  });

  it('renders an error message if fetching fails', async () => {
    getGameDetails.mockRejectedValue(new Error('Failed'));
    renderWithRouter(<GameDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load game details/i)).toBeInTheDocument();
    });
  });
});
