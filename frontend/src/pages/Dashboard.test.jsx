import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';
import useDashboardData from '../hooks/useDashboardData';

vi.mock('../hooks/useDashboardData');

describe('Dashboard Page', () => {
  it('renders loading state initially', () => {
    useDashboardData.mockReturnValue({
      loading: true,
      error: null,
      stats: null,
      achievements: [],
      recommendations: [],
    });

    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state if data fetching fails', () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: 'Failed to load dashboard data',
      stats: null,
      achievements: [],
      recommendations: [],
    });

    render(<Dashboard />);
    expect(screen.getByText('Failed to load dashboard data')).toBeInTheDocument();
  });

  it('renders dashboard components with data', () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: null,
      stats: { games_played: 10, videos_watched: 20 },
      achievements: [{ id: 1, achievement: { title: 'Master' }, earned_at: '2026-05-12T10:00:00Z' }],
      recommendations: [{ id: 1, title: 'Cool Video' }],
    });

    render(<Dashboard />);
    
    // Check for title
    expect(screen.getByRole('heading', { name: 'Your Dashboard' })).toBeInTheDocument();

    // Check for stats
    expect(screen.getByText('Games Played')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check for achievements
    expect(screen.getByText('Recent Achievements')).toBeInTheDocument();
    expect(screen.getByText('Master')).toBeInTheDocument();

    // Check for recommendations
    expect(screen.getByText('Recommended for You')).toBeInTheDocument();
    expect(screen.getByText('Cool Video')).toBeInTheDocument();
  });
});
