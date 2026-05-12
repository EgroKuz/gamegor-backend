import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SessionItem from './SessionItem';
import { MemoryRouter } from 'react-router-dom';

describe('SessionItem Component', () => {
  const mockSession = {
    id: 1,
    game: {
      id: 101,
      title: 'Hollow Knight',
      cover_image_url: 'http://example.com/hk.jpg'
    },
    date_played: '2026-05-10T14:00:00Z',
    duration_minutes: 120,
    rating: 9,
    review_text: 'Amazing game!'
  };

  const renderComponent = (session) => {
    return render(
      <MemoryRouter>
        <SessionItem session={session} />
      </MemoryRouter>
    );
  };

  it('renders game title and cover image', () => {
    renderComponent(mockSession);
    expect(screen.getByText('Hollow Knight')).toBeInTheDocument();
    
    const img = screen.getByRole('img', { name: /hollow knight cover/i });
    expect(img).toHaveAttribute('src', 'http://example.com/hk.jpg');
  });

  it('renders session metrics (date, duration, rating)', () => {
    renderComponent(mockSession);
    // Testing specific formatted output
    expect(screen.getByText(/may 10, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/2h 0m/i)).toBeInTheDocument();
    expect(screen.getByText('9/10')).toBeInTheDocument();
  });

  it('renders a fallback if no cover image is provided', () => {
    const noImageSession = { ...mockSession, game: { id: 101, title: 'No Image Game' } };
    renderComponent(noImageSession);
    expect(screen.getByText('🎮')).toBeInTheDocument(); // Fallback icon
  });

  it('handles null session safely', () => {
    const { container } = renderComponent(null);
    expect(container).toBeEmptyDOMElement();
  });
});
