import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SinglePointSliderTrack from "@src/components/SinglePointSliderTrack";

const util = <SinglePointSliderTrack min={0} max={500} step={100} />;
const { getByRole } = screen;
const user = userEvent.setup();

describe("SinglePointSliderTrack Component", () => {
  it("Should move the slider handle when the user drags it, demonstrating a change in selected value", async () => {
    render(util);

    
    const sliderHandle = getByRole("slider");

    expect(sliderHandle).toBeInTheDocument();

    await user.pointer([
      { keys: "[MouseLeft>]", target: sliderHandle },
      { coords: { x: 100 }, target: sliderHandle },
      "[/MouseLeft]",
    ]);

    expect(sliderHandle).not.toHaveStyle(`left: 0%`);
  });
});