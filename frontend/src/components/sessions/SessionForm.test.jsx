import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SessionForm from './SessionForm';

describe('SessionForm Component', () => {
  it('renders the form with rating, comment, and tags fields', () => {
    render(<SessionForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit review/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', () => {
    const mockSubmit = vi.fn();
    render(<SessionForm onSubmit={mockSubmit} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'Great game!' } });
    fireEvent.change(screen.getByLabelText(/tags/i), { target: { value: 'Hard Boss, Good Story' } });

    fireEvent.click(screen.getByRole('button', { name: /submit review/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      rating: '8',
      comment: 'Great game!',
      tags: ['Hard Boss', 'Good Story']
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    const mockCancel = vi.fn();
    render(<SessionForm onSubmit={vi.fn()} onCancel={mockCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockCancel).toHaveBeenCalled();
  });
});
