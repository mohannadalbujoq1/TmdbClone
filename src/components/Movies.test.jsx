import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";

import Movies from "@src/components/Movies";

jest.mock("axios");

const responses = {
  initial: {
    data: {
      results: [
        { id: 1, title: "Movie Title 1", poster_path: "/path1.jpg", overview: "Overview 1" },
        { id: 2, title: "Movie Title 2", poster_path: "/path2.jpg", overview: "Overview 2" },
      ],
    },
  },
  loadMore: {
    data: {
      results: [{ id: 3, title: "Movie Title 3", poster_path: "/path3.jpg", overview: "Overview 3" }],
    },
  },
};

function setup(isSearchVisible = false) {
  axios.get.mockResolvedValue(responses.initial);
  return render(
    <Movies
      setIsLoading={() => {}}
      setLoadingProgress={jest.fn()}
      isSearchVisible={isSearchVisible}
      isSearchActive={false}
    />
  );
}
const { findByText, findByRole, findByPlaceholderText } = screen;

describe("Movies Component", () => {
  it("Should display the search component, when isSearchVisible is true, because user needs to search", async () => {
    setup(true);
    const searchInput = await findByPlaceholderText("Search for a movie, tv show, person...");
    expect(searchInput).toBeInTheDocument();
  });

  it("Should show initial movies on component mount, because users expect to see some content", async () => {
    setup();
    const movieTitle = await findByText("Movie Title 1");
    expect(movieTitle).toBeInTheDocument();
  });

  it("Should load more movies when 'Load More' button is clicked, because users want to see more content", async () => {
    setup();
    axios.get.mockResolvedValueOnce(responses.loadMore);
    const loadMoreButton = await findByRole("button", { name: "Load More" });
    await userEvent.click(loadMoreButton);
    const newMovieTitle = await findByText("Movie Title 3");
    expect(newMovieTitle).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});