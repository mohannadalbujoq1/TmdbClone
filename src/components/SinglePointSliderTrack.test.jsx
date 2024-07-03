import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SinglePointSliderTrack from './SinglePointSliderTrack';

describe('SinglePointSliderTrack Component', () => {
  const util = (<SinglePointSliderTrack min={0} max={500} step={100} />);

  test('renders slider and interacts with handle', async () => {
    render(util);
    const user = userEvent.setup();
    const sliderHandle = screen.getByTestId('slider-handle');

    
    expect(sliderHandle).toHaveStyle(`left: 0%`);

 
    await user.pointer([
      { keys: '[MouseLeft>]', target: sliderHandle },
      { coords: { x: 100 }, target: sliderHandle }, 
      '[/MouseLeft]'
    ]);

    expect(sliderHandle).not.toHaveStyle(`left: 0%`);
  });
});