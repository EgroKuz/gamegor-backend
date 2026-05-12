import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { getProfile } from '../api/users';

vi.mock('../api/users');

describe('ProfilePage Component - Read Only UI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    getProfile.mockReturnValue(new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
  });

  it('renders user profile information after fetching', async () => {
    const mockUser = {
      id: 1,
      username: 'gamer123',
      email: 'gamer@example.com',
      nickname: 'The Legend',
      registration_date: '2026-01-01T10:00:00Z',
    };
    getProfile.mockResolvedValue(mockUser);

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'gamer123' })).toBeInTheDocument();
      expect(screen.getByText('gamer@example.com')).toBeInTheDocument();
      expect(screen.getByText('The Legend')).toBeInTheDocument();
      expect(screen.getByText(/member since: jan 1, 2026/i)).toBeInTheDocument();
    });

    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('renders an error message if fetching fails', async () => {
    getProfile.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load profile/i)).toBeInTheDocument();
    });
  });
});
