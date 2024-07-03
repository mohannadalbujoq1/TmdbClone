import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomSelect from './Select';

describe('CustomSelect Component', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ];
  const util = (<CustomSelect options={options} onChange={() => {}} />);

  test('renders CustomSelect and selects an option', async () => {
    render(util);
    const user = userEvent.setup();
   
    await user.click(screen.getByText('Select an option'));


    await user.click(screen.getByText('Option 2'));

    
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});