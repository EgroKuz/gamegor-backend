import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders the Game Aggregator heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Game Aggregator/i);
    expect(headingElement).toBeInTheDocument();
  });
});
