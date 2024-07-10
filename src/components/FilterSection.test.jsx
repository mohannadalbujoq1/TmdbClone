import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterSection from "@src/components/FilterSection";

const util = (<FilterSection />);
const user = userEvent.setup();
const { getByRole,getByText } = screen;

describe("FilterSection Component", () => {
  it("Should display the FilterSection with all interactive elements, when rendered", async () => {
    render(util);
  

    expect(getByText("Popular Movies")).toBeInTheDocument();
    expect(getByText("Where To Watch")).toBeInTheDocument();
    expect(getByText("Filters")).toBeInTheDocument();

    await user.click(screen.getByText("Sort"));
    expect(getByText("Sort Result By")).toBeInTheDocument();

    expect(getByText("Action")).toBeInTheDocument();
    expect(getByRole("button", { name: "Search" })).toBeInTheDocument();

    await user.click(getByRole("button", { name: "Search" }));
  });
});