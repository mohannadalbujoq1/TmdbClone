import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

import RadioButtonGroup from "@src/components/RadioButtonGroup";

const util = <RadioButtonGroup />;
const user = userEvent.setup();
const { getByLabelText } = screen;

describe("RadioButtonGroup Component", () => {
  it("Should select the 'Everything' radio button, when clicked, because it allows user to choose an option", async () => {
    render(util);
    const radioButton = getByLabelText("Everything");
    await user.click(radioButton);
    expect(radioButton).toBeChecked();
  });
});