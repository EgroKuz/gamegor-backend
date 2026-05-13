import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditGameModal from './EditGameModal';

describe('EditGameModal Component', () => {
  const mockGame = {
    title: 'Test Game',
    genre: 'Action',
    developer: 'Test Dev',
    release_date: '2023-01-01',
    cover_image: 'http://test.com/img.jpg',
    description: 'Test description',
    total_achievements: 10
  };

  it('renders nothing if isOpen is false', () => {
    const { container } = render(<EditGameModal isOpen={false} game={mockGame} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal with form fields populated when isOpen is true', () => {
    render(<EditGameModal isOpen={true} game={mockGame} />);
    expect(screen.getByRole('heading', { name: /edit game/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Game');
    expect(screen.getByLabelText(/genre/i)).toHaveValue('Action');
    expect(screen.getByLabelText(/developer/i)).toHaveValue('Test Dev');
    expect(screen.getByLabelText(/release date/i)).toHaveValue('2023-01-01');
    expect(screen.getByLabelText(/cover image url/i)).toHaveValue('http://test.com/img.jpg');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Test description');
    // Using getAllByRole because it might match multiple things if not careful, but label association is safer.
    expect(screen.getByLabelText(/total achievements/i)).toHaveValue(10);
  });

  it('calls onSubmit with form data', () => {
    const handleSubmit = vi.fn();
    render(<EditGameModal isOpen={true} game={mockGame} onSubmit={handleSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    
    // We must submit the form itself or fire click on the submit button. fireEvent.submit works on the form node.
    fireEvent.submit(screen.getByTestId('edit-game-form-test'));
    
    expect(handleSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Updated Title',
      genre: 'Action'
    }));
  });

  it('calls onClose when close button or cancel is clicked', () => {
    const handleClose = vi.fn();
    render(<EditGameModal isOpen={true} game={mockGame} onClose={handleClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
