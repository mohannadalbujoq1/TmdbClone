import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import Movies from './Movies'; 

jest.mock('axios');
const mockSetLoadingProgress = jest.fn();

    const util = (<Movies setIsLoading={() => {}} setLoadingProgress={mockSetLoadingProgress} isSearchVisible={false} isSearchActive={false} />);

const mockApiResponse = {
  data: {
    results: [
      { id: 1, title: 'Movie Title 1', poster_path: '/path1.jpg', overview: 'Overview 1' },
      { id: 2, title: 'Movie Title 2', poster_path: '/path2.jpg', overview: 'Overview 2' }
    ]
  }
};
describe('Movies Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockApiResponse);
  });
  test('renders the search component when isSearchVisible is true', async () => {
    const mockSetLoadingProgress = jest.fn();
  
    render(<Movies setIsLoading={() => {}} setLoadingProgress={mockSetLoadingProgress} isSearchVisible={true} isSearchActive={false} />);
  
    expect(screen.getByPlaceholderText('Search for a movie, tv show, person...')).toBeInTheDocument();
  });
  test('renders movies initially', async () => {
   
    render(util);

    expect(await screen.findByText('Movie Title 1')).toBeInTheDocument();
  });

  test('loads more movies on "Load More" button click', async () => {
   

    render(util);

    axios.get.mockResolvedValueOnce({
      data: {
        results: [
          { id: 3, title: 'Movie Title 3', poster_path: '/path3.jpg', overview: 'Overview 3' }
        ]
      }
    });

    const loadMoreButton = screen.getByText('Load More');
    await userEvent.click(loadMoreButton);

    expect(await screen.findByText('Movie Title 3')).toBeInTheDocument();
  });
  test('does not render the search component when isSearchVisible is false', () => {
  
    render(util);
  
    expect(screen.queryByPlaceholderText('Search for a movie, tv show, person...')).not.toBeInTheDocument();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});