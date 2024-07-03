import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSection from './FilterSection';

describe('FilterSection Component', () => {
  const util = (<FilterSection onSortChange={() => {}} />);

  test('renders FilterSection with dropdowns, inputs, and buttons', async () => {
    render(util);

    expect(screen.getByText('Popular Movies')).toBeInTheDocument();

    const sortDropdown = screen.getByText('Sort');
    await userEvent.click(sortDropdown);
    expect(screen.getByText('Sort Result By')).toBeInTheDocument();

    expect(screen.getByText('Where To Watch')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();

    const firstGenre = screen.getByText('Action');
    expect(firstGenre).toBeInTheDocument();

 

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(searchButton);
  });
});