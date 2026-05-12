import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MainLayout from './MainLayout';
import { BrowserRouter } from 'react-router-dom';

describe('Layout Components', () => {
  it('renders Header component with navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /games/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /videos/i })).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument(); // Expecting updated placeholder
  });

  it('renders Sidebar component with genre filters', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /filters/i })).toBeInTheDocument();
    // Assuming we refine UI to show specific genres instead of "Genre 1"
    expect(screen.getByRole('link', { name: /action/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /rpg/i })).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders MainLayout with children', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div data-testid="child-content">Child Content</div>
        </MainLayout>
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
