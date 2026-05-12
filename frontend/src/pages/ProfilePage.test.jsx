import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { getProfile, updateProfile } from '../api/users';

vi.mock('../api/users');

describe('ProfilePage Component', () => {
  const mockUser = {
    id: 1,
    username: 'gamer123',
    email: 'gamer@example.com',
    nickname: 'The Legend',
    registration_date: '2026-01-01T10:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getProfile.mockResolvedValue(mockUser);
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
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'gamer123' })).toBeInTheDocument();
      // Email is initially read-only text
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

  it('toggles edit mode and successfully updates profile', async () => {
    updateProfile.mockResolvedValue({ ...mockUser, nickname: 'New Legend', email: 'new@example.com' });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    // Wait for load
    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    // Click Edit
    const editBtn = screen.getByRole('button', { name: /edit profile/i });
    await user.click(editBtn);

    // Now inputs should be visible
    const nicknameInput = screen.getByLabelText(/nickname/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    expect(nicknameInput).toHaveValue('The Legend');
    expect(emailInput).toHaveValue('gamer@example.com');

    // Make changes
    await user.clear(nicknameInput);
    await user.type(nicknameInput, 'New Legend');
    await user.clear(emailInput);
    await user.type(emailInput, 'new@example.com');

    // Save changes
    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveBtn);

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith({ nickname: 'New Legend', email: 'new@example.com' });
      // Back to read-only view, showing new data
      expect(screen.getByText('New Legend')).toBeInTheDocument();
      expect(screen.getByText('new@example.com')).toBeInTheDocument();
    });
  });

  it('handles update failure gracefully', async () => {
    updateProfile.mockRejectedValue({ response: { data: { error: 'Email already exists' } } });
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    // Wait for load
    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    // Edit and Submit
    await user.click(screen.getByRole('button', { name: /edit profile/i }));
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
      // Should still be in edit mode
      expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    });
  });
});

