import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input'; // Adjust the import path as necessary

describe('Input Component Tests', () => {
  test('renders Input component with type text', () => {
    const util = (<Input type="text" placeholder="Enter text" />);
    render(util);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });
  
  test('renders Input component with type date and no placeholder', () => {
    const util = (<Input type="date" />);
    render(util);
    const input = screen.getByTestId('custom-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', '');
  });

  test('focus and blur events on Input component', async () => {
    const util = (<Input type="text" placeholder="Focus test" />);
    render(util);
    const input = screen.getByPlaceholderText('Focus test');
    await userEvent.click(input);
    expect(input).toHaveFocus();
    await userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});