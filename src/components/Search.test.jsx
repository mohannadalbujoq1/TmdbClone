import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Search from "@src/components/Search";

let mockOnSearch = jest.fn();
let util = <Search onSearch={mockOnSearch} />;
let user = userEvent.setup();

jest.mock("axios");

let axiosGetMockResolvedValue;
let searchInputPlaceholder;
let suggestionItemText;
let queryTextForSuggestions;
let suggestionsContainerText;
let errorMessageRole;
let queryTextForError;

const { getByPlaceholderText, findByText, queryByText, findByRole } = screen; 

describe("Search Component", () => {
  it("Should call onSearch prop function, when a suggestion is clicked, because it allows users to select search suggestions", async () => {
    axiosGetMockResolvedValue = {
      data: {
        results: [
          { id: 1, title: "The Matrix" },
          { id: 2, title: "The Matrix Reloaded" },
        ],
      },
    };
    axios.get.mockResolvedValue(axiosGetMockResolvedValue);

    render(util);
    searchInputPlaceholder = "Search for a movie, tv show, person...";
    suggestionItemText = "The Matrix";
    queryTextForSuggestions = "Matrix";

    const searchInput = getByPlaceholderText(searchInputPlaceholder);

    await user.type(searchInput, queryTextForSuggestions);
    const suggestionItem = await findByText(suggestionItemText);
    await user.click(suggestionItem);

    expect(mockOnSearch).toHaveBeenCalledWith(suggestionItemText);
  });

  it("Should not display suggestions, when query is less than 3 characters, because it minimizes unnecessary API calls and UI clutter", async () => {
    render(util);
    searchInputPlaceholder = "Search for a movie, tv show, person...";
    queryTextForSuggestions = "Ma";
    suggestionsContainerText = "The Matrix";

    const searchInput = getByPlaceholderText(searchInputPlaceholder);

    await user.type(searchInput, queryTextForSuggestions);
    const suggestionsContainer = queryByText(suggestionsContainerText);

    expect(suggestionsContainer).toBeNull();
  });

  it("Should display an error message, when search fails, to inform the user of the issue", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch"));

    render(util);
    searchInputPlaceholder = "Search for a movie, tv show, person...";
    queryTextForError = "Matrix";
    errorMessageRole = "alert";

    const searchInput = getByPlaceholderText(searchInputPlaceholder);

    await user.type(searchInput, queryTextForError);
    const errorMessage = await findByRole(errorMessageRole);

    expect(errorMessage).toBeInTheDocument();
  });
});