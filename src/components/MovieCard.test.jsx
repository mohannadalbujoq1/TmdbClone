import React from "react";

import { render, screen } from "@testing-library/react";

import MovieCard from "@src/components/MovieCard";

const util = (props) => render(<MovieCard {...props} />);
const mockMovie = {
  vote_average: 8.5,
  title: "Another Movie Title",
  release_date: "2020-01-01",
};
const mockWindowWidth = 800;
const expectedRatingPercent = `${Math.round(mockMovie.vote_average * 10)}`;
const {getByText}=screen;

describe("MovieCard additional tests", () => {
  it("Should display the correct movie rating, when given movie props, because it calculates the rating percentage", () => {
  
    util({ movie: mockMovie, windowWidth: mockWindowWidth });
  
    expect(getByText(expectedRatingPercent)).toBeInTheDocument();
  });

 
});