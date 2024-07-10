import React from "react";

import { render, screen } from "@testing-library/react";

import NavBar from "@src/components/NavBar";

const util = <NavBar toggleSearchVisibility={() => {}} />;
const { getByRole } = screen;

describe("NavBar Component", () => {
  it("Should render the NavBar component, because it's the main navigation tool", () => {
    render(util);
    const logoImage = getByRole("img", { name: /The Movie Database \(TMDB\)/i });
    expect(logoImage).toBeInTheDocument();
  });


 
});