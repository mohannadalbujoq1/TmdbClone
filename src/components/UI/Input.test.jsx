import React from 'react';

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const util = (() => {
  function Input({ isFocused, ...props }) {
    return <input {...props} autoFocus={isFocused} />;
  }
  return <Input type="text" placeholder="Enter text" isFocused />;
})();


describe("Input Component Tests", () => {
  it("Should render with a text type and a placeholder, verifying its presence", () => {
    render(util);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("Should focus on the input when clicked and lose focus when tabbed out", async () => {
    render(util);
  const input = screen.getByPlaceholderText("Enter text");

    await userEvent.click(input);
    expect(input).toHaveFocus();

    await userEvent.tab();
    expect(input).not.toHaveFocus();
  });
});