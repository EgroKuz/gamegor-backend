import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Sidebar from './Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Layout Responsiveness', () => {
  it('Sidebar should be hidden on small screens using desktop-first max-md:hidden', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const sidebar = screen.getByRole('complementary');
    // It should have max-md:hidden instead of hidden md:block
    expect(sidebar).toHaveClass('max-md:hidden');
    expect(sidebar).not.toHaveClass('hidden md:block');
  });
});
