import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Register from './Register';
import api from '../api/client';

// Mock the API client
vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders registration form with new aesthetic', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    // AuthLayout title
    expect(screen.getByRole('heading', { name: 'Join the Community' })).toBeInTheDocument();

    // Explicit inputs
    expect(screen.getByLabelText(/^username$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email address$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();

    // AuthLayout graphic check
    expect(screen.getByTestId('auth-graphic')).toBeInTheDocument();

    // Link back to login
    const loginLink = screen.getByRole('link', { name: /sign in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('displays inline error if passwords do not match', async () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/^password$/i), 'pass123');
    await user.type(screen.getByLabelText(/^confirm password$/i), 'different');

    // Click away to trigger validation (if onBlur) or try to submit
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('submits the form and redirects on success', async () => {
    api.post.mockResolvedValueOnce({ data: { message: 'Success' } });

    render(<MemoryRouter><Register /></MemoryRouter>);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/^username$/i), 'testuser');
    await user.type(screen.getByLabelText(/^email address$/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/^confirm password$/i), 'password123');

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/register/', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
      // A success message or redirect should happen. We can check for a success alert or mock navigation
    });
  });

  it('displays API error message on submission failure', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { error: 'Username already exists' } },
    });

    render(<MemoryRouter><Register /></MemoryRouter>);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/^username$/i), 'testuser');
    await user.type(screen.getByLabelText(/^email address$/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/^confirm password$/i), 'password123');

    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
    });
  });
});
