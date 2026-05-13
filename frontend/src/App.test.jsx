import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { vi, beforeEach } from 'vitest';
import * as userApi from './api/users';

vi.mock('./api/users');

// Mock the complex pages to simplify routing tests
vi.mock('./pages/GamesPage', () => ({
  default: () => <div data-testid="games-page-placeholder">Games Page Placeholder</div>
}));
vi.mock('./pages/GameDetailsPage', () => ({
  default: () => <div data-testid="game-details-page-placeholder">Game Details Page Placeholder</div>
}));
vi.mock('./pages/ProfilePage', () => ({
  default: () => <div data-testid="profile-page-placeholder">Profile Page Placeholder</div>
}));
vi.mock('./pages/GameSessionsPage', () => ({
  default: () => <div data-testid="game-sessions-page-placeholder">Game Sessions Page Placeholder</div>
}));
vi.mock('./pages/RecommendationDetailsPage', () => ({
  default: () => <div data-testid="recommendation-details-page-placeholder">Recommendation Details Page Placeholder</div>
}));
vi.mock('./pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page-placeholder">Not Found Page Placeholder</div>
}));
vi.mock('./pages/VideoContentPage', () => ({
  default: () => <div data-testid="video-content-page-placeholder">Video Content Page Placeholder</div>
}));

describe('App Routing', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders Login page on /login route', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
    });
  });

  it('renders Register page on /register route', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Join the Community' })).toBeInTheDocument();
    });
  });

  it('redirects to login on / route when unauthenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    // Since not authenticated, dashboard should not render, login should
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
    });
  });

  it('renders layout components (banner, contentinfo)', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  it('renders Games page on /games route', async () => {
    render(
      <MemoryRouter initialEntries={['/games']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('games-page-placeholder')).toBeInTheDocument();
    });
  });

  it('renders Game Details page on /games/:id route', async () => {
    render(
      <MemoryRouter initialEntries={['/games/123']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('game-details-page-placeholder')).toBeInTheDocument();
    });
  });

  it('renders Profile page on /profile route', async () => {
    localStorage.setItem('access_token', 'fake_token');
    userApi.getProfile.mockResolvedValue({ id: 1, username: 'test' });
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('profile-page-placeholder')).toBeInTheDocument();
    });
  });

  it('renders Game Sessions page on /profile/sessions route', async () => {
    localStorage.setItem('access_token', 'fake_token');
    userApi.getProfile.mockResolvedValue({ id: 1, username: 'test' });
    render(
      <MemoryRouter initialEntries={['/profile/sessions']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('game-sessions-page-placeholder')).toBeInTheDocument();
    });
  });

  it('renders Video Content page on /videos route', async () => {
    render(
      <MemoryRouter initialEntries={['/videos']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('video-content-page-placeholder')).toBeInTheDocument();
    });
  });

  it('renders Not Found page on unknown route', async () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('not-found-page-placeholder')).toBeInTheDocument();
    });
  });
});

