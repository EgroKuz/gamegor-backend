import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { vi } from 'vitest';

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
vi.mock('./pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page-placeholder">Not Found Page Placeholder</div>
}));
vi.mock('./pages/VideoContentPage', () => ({
  default: () => <div data-testid="video-content-page-placeholder">Video Content Page Placeholder</div>
}));

describe('App Routing', () => {
  it('renders Login page on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
  });

  it('renders Register page on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Join the Community' })).toBeInTheDocument();
  });

  it('redirects to login on / route when unauthenticated', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    // Since not authenticated, dashboard should not render, login should
    expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
  });

  it('renders layout components (banner, complementary, contentinfo)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  // Mocking auth to simplify protected route testing for Games
  it('renders Games page on /games route', () => {
    // We mock localStorage to simulate an authenticated user
    localStorage.setItem('access_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/games']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('games-page-placeholder')).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });

  it('renders Game Details page on /games/:id route', () => {
    localStorage.setItem('access_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/games/123']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('game-details-page-placeholder')).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });

  it('renders Profile page on /profile route', () => {
    localStorage.setItem('access_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('profile-page-placeholder')).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });

  it('renders Game Sessions page on /profile/sessions route', () => {
    localStorage.setItem('access_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/profile/sessions']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('game-sessions-page-placeholder')).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });

  it('renders Video Content page on /videos route', () => {
    localStorage.setItem('access_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/videos']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('video-content-page-placeholder')).toBeInTheDocument();
    localStorage.removeItem('access_token');
  });

  it('renders Not Found page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found-page-placeholder')).toBeInTheDocument();
  });
});

