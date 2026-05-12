import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import { getProfile, updateProfile, changePassword } from '../api/users';
import { AuthContext } from '../context/AuthContext';

vi.mock('../api/users');

describe('ProfilePage Component', () => {
  const mockUser = {
    id: 1,
    username: 'gamer123',
    email: 'gamer@example.com',
    nickname: 'The Legend',
    registration_date: '2026-01-01T10:00:00Z',
  };

  const mockLogout = vi.fn();

  const renderWithAuth = (ui) => {
    return render(
      <AuthContext.Provider value={{ logout: mockLogout }}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    getProfile.mockResolvedValue(mockUser);
  });

  it('renders loading state initially', () => {
    getProfile.mockReturnValue(new Promise(() => {}));
    
    renderWithAuth(<ProfilePage />);

    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
  });

  it('renders user profile information after fetching', async () => {
    renderWithAuth(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'gamer123' })).toBeInTheDocument();
      expect(screen.getByText('gamer@example.com')).toBeInTheDocument();
      expect(screen.getByText('The Legend')).toBeInTheDocument();
      expect(screen.getByText(/member since: jan 1, 2026/i)).toBeInTheDocument();
    });

    expect(getProfile).toHaveBeenCalledTimes(1);
  });

  it('toggles edit mode and successfully updates profile', async () => {
    updateProfile.mockResolvedValue({ ...mockUser, nickname: 'New Legend', email: 'new@example.com' });
    const user = userEvent.setup();

    renderWithAuth(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    const editBtn = screen.getByRole('button', { name: /edit profile/i });
    await user.click(editBtn);

    const nicknameInput = screen.getByLabelText(/nickname/i);
    const emailInput = screen.getByLabelText(/email address/i);
    
    await user.clear(nicknameInput);
    await user.type(nicknameInput, 'New Legend');
    await user.clear(emailInput);
    await user.type(emailInput, 'new@example.com');

    const saveBtn = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveBtn);

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalledWith({ nickname: 'New Legend', email: 'new@example.com' });
      expect(screen.getByText('New Legend')).toBeInTheDocument();
      expect(screen.getByText('new@example.com')).toBeInTheDocument();
    });
  });

  it('toggles change password form and successfully changes password', async () => {
    changePassword.mockResolvedValue({ message: 'Success' });
    const user = userEvent.setup();

    renderWithAuth(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    const changePwdBtn = screen.getByRole('button', { name: /change password/i });
    await user.click(changePwdBtn);

    const oldPwdInput = screen.getByLabelText(/current password/i);
    const newPwdInput = screen.getByLabelText(/^new password$/i);
    const confirmPwdInput = screen.getByLabelText(/confirm new password/i);

    await user.type(oldPwdInput, 'old123');
    await user.type(newPwdInput, 'new123');
    await user.type(confirmPwdInput, 'new123');

    const updatePwdBtn = screen.getByRole('button', { name: /update password/i });
    await user.click(updatePwdBtn);

    await waitFor(() => {
      expect(changePassword).toHaveBeenCalledWith({ old_password: 'old123', new_password: 'new123' });
      expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
    });
  });

  it('shows inline error if new passwords do not match', async () => {
    const user = userEvent.setup();

    renderWithAuth(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /change password/i }));

    await user.type(screen.getByLabelText(/^new password$/i), 'new123');
    await user.type(screen.getByLabelText(/confirm new password/i), 'different');

    await user.click(screen.getByRole('button', { name: /update password/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(changePassword).not.toHaveBeenCalled();
  });

  it('calls logout when the logout button is clicked', async () => {
    const user = userEvent.setup();
    renderWithAuth(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByText('The Legend')).toBeInTheDocument();
    });

    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});



