import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';

describe('FormInput Component', () => {
  it('renders correctly with label', () => {
    render(<FormInput id="email" label="Email Address" type="email" />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('displays error message when provided', () => {
    render(<FormInput id="username" label="Username" error="Username is required" />);
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<FormInput id="test" label="Test" onChange={handleChange} />);
    
    await user.type(screen.getByRole('textbox'), 'a');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('PasswordInput Component', () => {
  it('renders with correct default attributes', () => {
    render(<PasswordInput id="pwd" label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility when button is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput id="pwd" label="Password" />);
    
    const input = screen.getByLabelText('Password');
    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    
    expect(input).toHaveAttribute('type', 'password');
    
    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleBtn).toHaveAccessibleName(/hide password/i);
    
    await user.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleBtn).toHaveAccessibleName(/show password/i);
  });
});
