import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GameSessionsPage from './GameSessionsPage';
import { getUserSessions } from '../api/sessions';

vi.mock('../api/sessions');

describe('GameSessionsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    getUserSessions.mockReturnValue(new Promise(() => {}));
    
    render(
      <MemoryRouter>
        <GameSessionsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading game sessions/i)).toBeInTheDocument();
  });

  it('renders a list of sessions after fetching data', async () => {
    const mockSessions = [
      { id: 1, game: { id: 101, title: 'Game A' }, date_played: '2026-05-10T14:00:00Z', duration_minutes: 60 },
      { id: 2, game: { id: 102, title: 'Game B' }, date_played: '2026-05-11T14:00:00Z', duration_minutes: 120 }
    ];
    getUserSessions.mockResolvedValue(mockSessions);

    render(
      <MemoryRouter>
        <GameSessionsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Game A')).toBeInTheDocument();
      expect(screen.getByText('Game B')).toBeInTheDocument();
    });

    expect(getUserSessions).toHaveBeenCalledTimes(1);
  });

  it('renders an error message if fetching fails', async () => {
    getUserSessions.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <GameSessionsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load sessions/i)).toBeInTheDocument();
    });
  });

  it('renders an empty state if no sessions are found', async () => {
    getUserSessions.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <GameSessionsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/no game sessions logged yet/i)).toBeInTheDocument();
    });
  });
});
