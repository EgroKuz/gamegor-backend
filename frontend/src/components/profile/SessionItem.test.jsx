import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SessionItem from './SessionItem';
import { MemoryRouter } from 'react-router-dom';

describe('SessionItem Component', () => {
  const mockSession = {
    id: 99,
    game: 101,
    game_detail: 'Hollow Knight',
    created_at: '2026-05-10T14:00:00Z',
    updated_at: '2026-05-11T10:00:00Z',
    rating: 9,
    comment: 'Amazing game!',
    tags: ['metroidvania', 'hard']
  };

  const renderComponent = (session) => {
    return render(
      <MemoryRouter>
        <SessionItem session={session} />
      </MemoryRouter>
    );
  };

  it('renders game title from game_detail', () => {
    renderComponent(mockSession);
    expect(screen.getByText('Hollow Knight')).toBeInTheDocument();
  });

  it('renders session metrics (date, rating) but NOT duration or ID', () => {
    renderComponent(mockSession);
    expect(screen.getByText(/may 10, 2026/i)).toBeInTheDocument(); // created_at
    expect(screen.getByText('9 / 10')).toBeInTheDocument();
    
    // Ensure duration and ID are NOT rendered
    expect(screen.queryByText(/2h 0m/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ID: 99/i)).not.toBeInTheDocument();
  });

  it('renders tags if available', () => {
    renderComponent(mockSession);
    expect(screen.getByText('metroidvania')).toBeInTheDocument();
    expect(screen.getByText('hard')).toBeInTheDocument();
  });

  it('renders a fallback icon since cover images are no longer provided by list API', () => {
    renderComponent(mockSession);
    expect(screen.getByText('🎮')).toBeInTheDocument(); // Fallback icon
  });

  it('handles null session safely', () => {
    const { container } = renderComponent(null);
    expect(container).toBeEmptyDOMElement();
  });
});

