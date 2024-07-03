import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'; 
import Search from './Search';

describe('Search Component', () => {
  const mockOnSearch = jest.fn();
  const util = (<Search onSearch={mockOnSearch} />);

  test('calls onSearch prop function when a suggestion is clicked', async () => {
    render(util);
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Search for a movie, tv show, person...');

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        results: [
          { id: 1, title: 'The Matrix' },
          { id: 2, title: 'The Matrix Reloaded' }
        ]
      }
    });

    await user.type(searchInput, 'Matrix');
    await screen.findByText('The Matrix');

    const suggestionItem = screen.getByText('The Matrix');
    await user.click(suggestionItem);

    expect(mockOnSearch).toHaveBeenCalledWith('The Matrix');
  });

  test('does not display suggestions when query is less than 3 characters', async () => {
    render(util);
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Search for a movie, tv show, person...');

    await user.type(searchInput, 'Ma');
    const suggestionsContainer = screen.queryByText('The Matrix');

    expect(suggestionsContainer).toBeNull();
  });

  test('displays error message when search fails', async () => {
    render(util);
    const user = userEvent.setup();
    const searchInput = screen.getByPlaceholderText('Search for a movie, tv show, person...');
    
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch'));

    await user.type(searchInput, 'Matrix');
    const errorMessage = await screen.findByTestId('search-error');

    expect(errorMessage).toBeInTheDocument();
  });

 
});