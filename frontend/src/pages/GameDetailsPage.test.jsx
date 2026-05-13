import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import GameDetailsPage from './GameDetailsPage';
import { getGameDetails, deleteGame } from '../api/games';
import { createSession } from '../api/sessions';
import { AuthContext } from '../context/AuthContext';

vi.mock('../api/games');
vi.mock('../api/sessions');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('GameDetailsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/games/1', user = null } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login: vi.fn(), logout: vi.fn(), loading: false }}>
          <Routes>
            <Route path="/games/:id" element={ui} />
          </Routes>
        </AuthContext.Provider>
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
      cover_image: 'http://example.com/ds3.jpg'
    };
    getGameDetails.mockResolvedValue(mockGame);

    renderWithRouter(<GameDetailsPage />, { route: '/games/123' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Dark Souls III' })).toBeInTheDocument();
      expect(screen.getByText('A challenging action RPG.')).toBeInTheDocument();
      expect(screen.getByText('FromSoftware')).toBeInTheDocument();
      expect(screen.getByText(/2016/)).toBeInTheDocument(); 
    });

    const img = screen.getByRole('img', { name: /dark souls iii cover/i });
    expect(img).toHaveAttribute('src', 'http://example.com/ds3.jpg');

    expect(getGameDetails).toHaveBeenCalledWith('123');
  });

  it('contains links back to the games catalog', async () => {
    const mockGame = { id: 123, title: 'Test Game' };
    getGameDetails.mockResolvedValue(mockGame);

    renderWithRouter(<GameDetailsPage />, { route: '/games/123' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    const backLinks = screen.getAllByRole('link', { name: /back to games/i });
    expect(backLinks.length).toBeGreaterThan(0);
    expect(backLinks[0]).toHaveAttribute('href', '/games');
  });

  it('renders an error message if fetching fails', async () => {
    getGameDetails.mockRejectedValue(new Error('Failed'));
    renderWithRouter(<GameDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load game details/i)).toBeInTheDocument();
    });
  });

  it('opens Add Session modal when button is clicked', async () => {
    getGameDetails.mockResolvedValue({ id: 123, title: 'Test Game' });
    renderWithRouter(<GameDetailsPage />, { route: '/games/123' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /add session/i }));
    
    // Expect the form elements to be visible
    expect(screen.getByRole('heading', { name: /add session for test game/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
  });

  it('submits review and redirects to dashboard', async () => {
    getGameDetails.mockResolvedValue({ id: 123, title: 'Test Game' });
    createSession.mockResolvedValue({ id: 1, rating: 8 });

    renderWithRouter(<GameDetailsPage />, { route: '/games/123' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /add session/i }));
    
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'Good game' } });
    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    await waitFor(() => {
      expect(createSession).toHaveBeenCalledWith({
        game: 123,
        rating: 8,
        comment: 'Good game',
        tags: []
      });
      expect(mockNavigate).toHaveBeenCalledWith('/sessions/1/recommendation');
    });
  });

  it('does not render Edit or Delete Game button for non-staff users', async () => {
    getGameDetails.mockResolvedValue({ id: 123, title: 'Test Game' });
    renderWithRouter(<GameDetailsPage />, { route: '/games/123', user: { is_staff: false } });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /edit game/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete game/i })).not.toBeInTheDocument();
  });

  it('renders Edit and Delete Game button for staff users', async () => {
    getGameDetails.mockResolvedValue({ id: 123, title: 'Test Game' });
    renderWithRouter(<GameDetailsPage />, { route: '/games/123', user: { is_staff: true } });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /edit game/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete game/i })).toBeInTheDocument();
  });

  it('deletes game and redirects to games catalog when delete is confirmed', async () => {
    // Mock window.confirm to always return true
    const originalConfirm = window.confirm;
    window.confirm = vi.fn(() => true);

    getGameDetails.mockResolvedValue({ id: 123, title: 'Test Game' });
    deleteGame.mockResolvedValue({}); // Simulate successful deletion

    renderWithRouter(<GameDetailsPage />, { route: '/games/123', user: { is_staff: true } });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Game' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /delete game/i }));

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Test Game'));
      expect(deleteGame).toHaveBeenCalledWith(123);
      expect(mockNavigate).toHaveBeenCalledWith('/games');
    });

    // Restore original confirm
    window.confirm = originalConfirm;
  });
});
