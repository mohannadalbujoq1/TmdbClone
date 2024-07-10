import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSection from "@src/components/FilterSection";

describe("FilterSection Component", () => {
  beforeEach(() => {
    render(<FilterSection onSortChange={() => {}} />);
  });
const { getByText, getByRole } = screen;

  it("Should display the FilterSection with all interactive elements, when rendered", async () => {
    expect(getByText("Popular Movies")).toBeInTheDocument();
    expect(getByText("Where To Watch")).toBeInTheDocument();
    expect(getByText("Filters")).toBeInTheDocument();

    await userEvent.click(getByText("Sort"));
    expect(getByText("Sort Result By")).toBeInTheDocument();

    expect(getByText("Action")).toBeInTheDocument();
    expect(getByRole("button", { name: "Search" })).toBeInTheDocument();

    await userEvent.click(getByRole("button", { name: "Search" }));
  });
});