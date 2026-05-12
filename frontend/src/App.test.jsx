import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

describe('App Routing', () => {
  it('renders Login page on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders Register page on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
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
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
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
});

