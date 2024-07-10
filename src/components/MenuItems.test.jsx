import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MenuItems from "@src/components/MenuItems";

const user = userEvent.setup();

describe("MenuItems component", () => {
  const util = (<MenuItems />);

  const { getByRole,findByText } = screen;

  it("Should render all menu headers and items, when the component is mounted", async () => {
    render(util);
    expect(getByRole("heading", { name: /Movie/i })).toBeInTheDocument();
    expect(getByRole("heading", { name: /TV Shows/i })).toBeInTheDocument();

    const menuItem = await findByText(/Contribution/i);
    expect(menuItem).toBeInTheDocument();
  });

  it("Should allow interaction with a menu item, when user clicks on it", async () => {
    render(util);
    const menuItem = await findByText(/Contribution/i);
    await user.click(menuItem);
  });
});