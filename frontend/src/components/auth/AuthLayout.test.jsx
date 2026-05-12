import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AuthLayout from './AuthLayout';

describe('AuthLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <MemoryRouter>
        <AuthLayout title="Test Auth Title">
          <div data-testid="auth-child">Child Content</div>
        </AuthLayout>
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders the title prop', () => {
    render(
      <MemoryRouter>
        <AuthLayout title="Sign In" />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders the decorative graphic section', () => {
    render(
      <MemoryRouter>
        <AuthLayout title="Sign In" />
      </MemoryRouter>
    );
    // We expect some visual element representing the graphic half of the split screen
    const graphicContainer = screen.getByTestId('auth-graphic');
    expect(graphicContainer).toBeInTheDocument();
  });
});

