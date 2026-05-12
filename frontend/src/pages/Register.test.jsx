import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Register from './Register';
import api from '../api/client';

// Mock the API client
vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('Register Component', () => {
  it('renders registration form', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('submits the form with user input and shows success', async () => {
    api.post.mockResolvedValueOnce({ data: { message: 'Success' } });
    
    render(<MemoryRouter><Register /></MemoryRouter>);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/register/', {
        username: 'testuser',
        nickname: '',
        email: 'test@example.com',
        password: 'password123',
        password2: 'password123'
      });
    });
  });

  it('displays error message on submission failure', async () => {
    api.post.mockRejectedValueOnce({
      response: { data: { error: 'Registration failed' } },
    });
    
    render(<MemoryRouter><Register /></MemoryRouter>);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
    });
  });
});
