import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Login from './Login';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';

vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Login Component', () => {
  const mockLogin = vi.fn();

  const renderWithAuth = (ui) => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders login form with new aesthetic', () => {
    renderWithAuth(<Login />);
    // AuthLayout title
    expect(screen.getByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    // Verify the AuthLayout graphic section is rendered
    expect(screen.getByTestId('auth-graphic')).toBeInTheDocument();

    // Check for the link to registration
    const registerLink = screen.getByRole('link', { name: /create an account/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('submits form, saves token, and redirects', async () => {
    api.post.mockResolvedValueOnce({ data: { access: 'fake-access-token', refresh: 'fake-refresh' } });

    renderWithAuth(<Login />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/^username$/i), 'testuser');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/token/', {
        username: 'testuser',
        password: 'password123',
      });
      expect(mockLogin).toHaveBeenCalledWith('fake-access-token', 'fake-refresh');
    });
  });

  it('displays error on invalid credentials', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { detail: 'No active account found with the given credentials' }, status: 401 },
    });

    renderWithAuth(<Login />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/^username$/i), 'wronguser');
    await user.type(screen.getByLabelText(/^password$/i), 'wrongpass');

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/no active account found/i)).toBeInTheDocument();
    });
  });
});

