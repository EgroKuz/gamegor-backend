import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RecommendationDetailsPage from './RecommendationDetailsPage';
import { getSession, getSessionAdvice } from '../api/sessions';

vi.mock('../api/sessions');

describe('RecommendationDetailsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui, { route = '/sessions/1/recommendation' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/sessions/:id/recommendation" element={ui} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders a loading state initially', () => {
    getSession.mockReturnValue(new Promise(() => {}));
    renderWithRouter(<RecommendationDetailsPage />);
    expect(screen.getByText(/loading recommendation details/i)).toBeInTheDocument();
  });

  it('fetches and renders session and recommendation details based on URL param', async () => {
    const mockSession = {
      id: 123,
      game: 4,
      game_detail: 'Test Game',
      tags: ['aim', 'mechanics']
    };
    const mockAdvice = {
      ai_advice: 'Practice your aiming skills.'
    };
    getSession.mockResolvedValue(mockSession);
    getSessionAdvice.mockResolvedValue(mockAdvice);

    renderWithRouter(<RecommendationDetailsPage />, { route: '/sessions/123/recommendation' });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Recommendation for Test Game' })).toBeInTheDocument();
      expect(screen.getByText('Practice your aiming skills.')).toBeInTheDocument();
      expect(screen.getByText('aim')).toBeInTheDocument();
      expect(screen.getByText('mechanics')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /watch videos/i })).toBeInTheDocument();
    expect(getSession).toHaveBeenCalledWith('123');
    expect(getSessionAdvice).toHaveBeenCalledWith({ game: 4, tags: 'aim,mechanics', comment: '' });
  });

  it('renders an error message if fetching fails', async () => {
    getSession.mockRejectedValue(new Error('Failed'));
    renderWithRouter(<RecommendationDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load recommendation details/i)).toBeInTheDocument();
    });
  });
});
