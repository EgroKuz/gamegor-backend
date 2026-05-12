import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GameCard from './GameCard';

describe('GameCard Component', () => {
  const mockGame = {
    id: 1,
    title: 'Elden Ring',
    cover_image_url: 'http://example.com/eldenring.jpg',
    developer: 'FromSoftware'
  };

  it('renders game title and developer', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByText('Elden Ring')).toBeInTheDocument();
    expect(screen.getByText('FromSoftware')).toBeInTheDocument();
  });

  it('renders cover image with correct src and alt attributes', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img', { name: /elden ring cover/i });
    expect(img).toHaveAttribute('src', 'http://example.com/eldenring.jpg');
  });

  it('contains a link to the game details page', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/games/1');
  });

  it('renders a placeholder if no cover image is provided', () => {
    const gameWithoutImage = { ...mockGame, cover_image_url: null };
    render(
      <MemoryRouter>
        <GameCard game={gameWithoutImage} />
      </MemoryRouter>
    );

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });
});
