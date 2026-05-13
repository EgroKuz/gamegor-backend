import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';
import Header from './Header';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';

describe('Layout Aesthetic', () => {
  it('MainLayout should have a dark background and white text', () => {
    const { container } = render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <BrowserRouter>
          <MainLayout>
            <div>Content</div>
          </MainLayout>
        </BrowserRouter>
      </AuthContext.Provider>
    );
    // Use firstChild to check the root div of MainLayout
    expect(container.firstChild).toHaveClass('bg-gray-950');
    expect(container.firstChild).toHaveClass('text-white');
  });

  it('Header should use custom neon teal for the logo text', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const logoText = screen.getByText('GameGor');
    expect(logoText).toHaveClass('text-neon-teal'); // Expecting custom color from config
  });

  it('Sidebar should use custom neon violet for section titles', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const filterTitle = screen.getByText('Filters');
    expect(filterTitle).toHaveClass('text-neon-violet'); // Expecting custom color from config
  });
});
