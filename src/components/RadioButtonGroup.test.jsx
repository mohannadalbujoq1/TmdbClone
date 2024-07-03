import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioButtonGroup from './RadioButtonGroup';

describe('RadioButtonGroup Component', () => {
  test('selects the "Everything" radio button when clicked', async () => {
    render(<RadioButtonGroup />);
    const user = userEvent.setup();
    const radioButton = screen.getByLabelText('Everything');
    await user.click(radioButton);
    expect(radioButton).toBeChecked();
  });
});