import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomSelect from "@src/components/Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];
const util = <CustomSelect options={options} onChange={() => {}} />;
const user = userEvent.setup();
const {findByRole,findByText } = screen;

describe("CustomSelect Component", () => {
  it("Should display the selected option, when an option is clicked, because it allows users to make a selection", async () => {
    render(util);

    const selectButton = await findByRole('button', { name: /select an option/i });
    await user.click(selectButton);

    const option2 = await findByText("Option 2");
    await user.click(option2);

    expect(await findByText("Option 2")).toBeInTheDocument();
  });

});