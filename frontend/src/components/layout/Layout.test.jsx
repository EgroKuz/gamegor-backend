import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import MainLayout from './MainLayout';
import { BrowserRouter } from 'react-router-dom';

describe('Layout Components', () => {
  it('renders Header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders Sidebar component', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
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
