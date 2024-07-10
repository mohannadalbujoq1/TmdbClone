import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "@src/components/Footer";

const util = (<Footer />);
const user = userEvent.setup();

const { getByText,findByText } = screen;
describe("Footer component", () => {
  it("Should display all sections within the Footer, when the Footer is rendered", () => {
    render(util);
    expect(getByText("The Basics")).toBeInTheDocument();
    expect(getByText("Get Involved")).toBeInTheDocument();
  });

  it("Should allow clicking on footer links, when user interacts with them", async () => {
    render(util);
    const aboutLink = await findByText("About TMDB");
    await user.click(aboutLink);
  });
});