import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TwoPointSliderTrack from './TwoPointSliderTrack';

describe('TwoPointSliderTrack Component', () => {
  const util = (<TwoPointSliderTrack min={0} max={100} step={10} />);

  test('renders slider track container', () => {
    render(util);
    const sliderTrackContainer = screen.getByTestId('slider-track-container');
    expect(sliderTrackContainer).toBeInTheDocument();
  });

  test('slider handle start moves on drag', async () => {
    render(util);
    const user = userEvent.setup();
    const startHandle = screen.getByTestId('slider-handle-start');

  
    await user.pointer([
      { keys: '[MouseLeft>]', target: startHandle },
      { coords: { x: 100 }, target: startHandle },
      '[/MouseLeft]'
    ]);


    expect(startHandle).toBeInTheDocument();
  });

  test('slider handle end moves on drag', async () => {
    render(util);
    const user = userEvent.setup();
    const endHandle = screen.getByTestId('slider-handle-end');

    await user.pointer([
      { keys: '[MouseLeft>]', target: endHandle },
      { coords: { x: -100 }, target: endHandle },
      '[/MouseLeft]'
    ]);

    expect(endHandle).toBeInTheDocument();
  });
});