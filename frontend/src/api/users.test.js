import { describe, it, expect, vi } from 'vitest';
import api from './client';
import { getProfile, updateProfile, changePassword } from './users';

vi.mock('./client');

describe('Users API Services', () => {
  it('getProfile fetches user profile', async () => {
    const mockData = { id: 1, username: 'testuser', email: 'test@example.com' };
    api.get.mockResolvedValue({ data: mockData });

    const profile = await getProfile();
    expect(api.get).toHaveBeenCalledWith('/users/me/');
    expect(profile).toEqual(mockData);
  });

  it('updateProfile sends patch request with new data', async () => {
    const mockData = { nickname: 'NewNick' };
    const mockResponse = { id: 1, nickname: 'NewNick' };
    api.patch.mockResolvedValue({ data: mockResponse });

    const updated = await updateProfile(mockData);
    expect(api.patch).toHaveBeenCalledWith('/users/me/', mockData);
    expect(updated).toEqual(mockResponse);
  });

  it('changePassword sends post request with password data', async () => {
    const mockData = { old_password: 'old', new_password: 'new' };
    api.post.mockResolvedValue({ data: { message: 'Password changed successfully' } });

    await changePassword(mockData);
    expect(api.post).toHaveBeenCalledWith('/users/change-password/', mockData);
  });
});
