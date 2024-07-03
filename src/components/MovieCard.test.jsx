import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from './MovieCard';
describe('MovieCard additional tests', () => {
  test('displays the correct movie rating', () => {
    const mockMovie = {
      vote_average: 8.5,
      title: "Another Movie Title",
      release_date: "2020-01-01",
    };
    const mockWindowWidth = 800;
    render(<MovieCard movie={mockMovie} windowWidth={mockWindowWidth} />);
    const expectedRatingPercent = Math.round(mockMovie.vote_average * 10);
    expect(screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === `${expectedRatingPercent}%`;
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child));
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });
  test('responds to user interaction - simulate click', async () => {
    const mockMovie = {
      vote_average: 8.5,
      title: "Interactive Movie Title",
      release_date: "2020-01-01",
    };
    const mockWindowWidth = 800;
    render(<MovieCard movie={mockMovie} windowWidth={mockWindowWidth} />);
    await userEvent.click(screen.getByText(/Interactive Movie Title/i));
  });
});