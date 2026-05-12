import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Login from './Login';
import api from '../api/client';

vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form, saves token, and redirects', async () => {
    api.post.mockResolvedValueOnce({ data: { access: 'fake-access-token', refresh: 'fake-refresh' } });
    
    render(<MemoryRouter><Login /></MemoryRouter>);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/token/', {
        username: 'testuser',
        password: 'password123',
      });
      expect(localStorage.getItem('access_token')).toBe('fake-access-token');
      expect(localStorage.getItem('refresh_token')).toBe('fake-refresh');
    });
  });

  it('displays error on invalid credentials', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { detail: 'No active account found with the given credentials' }, status: 401 },
    });
    
    render(<MemoryRouter><Login /></MemoryRouter>);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username/i), 'wronguser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    
    await user.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/no active account found/i)).toBeInTheDocument();
    });
  });
});
