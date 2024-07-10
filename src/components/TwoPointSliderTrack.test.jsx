import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TwoPointSliderTrack from "@src/components/TwoPointSliderTrack";

const util = <TwoPointSliderTrack min={0} max={100} step={10} />;

const { getByRole } = screen;

const user = userEvent.setup();

describe("TwoPointSliderTrack Component", () => {

  it("Should move the start handle on drag", async () => {
    render(util);

    const startHandle = getByRole("slider", { name: "Start Handle" });
  
    await user.pointer([
      { keys: "[MouseLeft>]", target: startHandle },
      { coords: { x: 100 }, target: startHandle },
      "[/MouseLeft]",
    ]);
  
    expect(startHandle).toHaveAttribute("aria-valuenow", expect.any(String));
  });
  
  it("Should move the end handle on drag", async () => {
    render(util);
    const endHandle = getByRole("slider", { name: "End Handle" });
  
    await user.pointer([
      { keys: "[MouseLeft>]", target: endHandle },
      { coords: { x: -100 }, target: endHandle },
      "[/MouseLeft]",
    ]);
  
    expect(endHandle).toHaveAttribute("aria-valuenow", expect.any(String));
  });
});