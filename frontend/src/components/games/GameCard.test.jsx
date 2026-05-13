import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import GameCard from './GameCard';
import { AuthContext } from '../../context/AuthContext';

describe('GameCard Component', () => {
  const mockGame = {
    id: 1,
    title: 'Elden Ring',
    cover_image: 'http://example.com/eldenring.jpg',
    developer: 'FromSoftware'
  };

  const renderWithContext = (ui, { user = null } = {}) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
          {ui}
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('renders game title and developer', () => {
    renderWithContext(<GameCard game={mockGame} />);

    expect(screen.getByText('Elden Ring')).toBeInTheDocument();
    expect(screen.getByText('FromSoftware')).toBeInTheDocument();
  });

  it('renders cover image with correct src and alt attributes', () => {
    renderWithContext(<GameCard game={mockGame} />);

    const img = screen.getByRole('img', { name: /elden ring cover/i });
    expect(img).toHaveAttribute('src', 'http://example.com/eldenring.jpg');
  });

  it('contains a link to the game details page', () => {
    renderWithContext(<GameCard game={mockGame} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/games/1');
  });

  it('renders a placeholder if no cover image is provided', () => {
    const gameWithoutImage = { ...mockGame, cover_image: null };
    renderWithContext(<GameCard game={gameWithoutImage} />);

    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('does not show edit or delete button for regular users', () => {
    renderWithContext(<GameCard game={mockGame} />, { user: { is_staff: false } });
    expect(screen.queryByTitle('Edit Game')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Delete Game')).not.toBeInTheDocument();
  });

  it('shows edit and delete button for staff users', () => {
    renderWithContext(<GameCard game={mockGame} />, { user: { is_staff: true } });
    expect(screen.getByTitle('Edit Game')).toBeInTheDocument();
    expect(screen.getByTitle('Delete Game')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    renderWithContext(<GameCard game={mockGame} onEdit={mockOnEdit} />, { user: { is_staff: true } });
    
    const editBtn = screen.getByTitle('Edit Game');
    fireEvent.click(editBtn);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockGame);
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    renderWithContext(<GameCard game={mockGame} onDelete={mockOnDelete} />, { user: { is_staff: true } });
    
    const deleteBtn = screen.getByTitle('Delete Game');
    fireEvent.click(deleteBtn);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockGame);
  });
});
