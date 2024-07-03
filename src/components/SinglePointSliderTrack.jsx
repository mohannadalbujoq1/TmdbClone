import React, { useState } from 'react';
import styled from 'styled-components';

const SliderTrackContainer = styled.div`
  position: relative;
  width: 97%;
  height: 3.125rem;
`;

const SliderTicks = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Tick = styled.li`
  position: relative;
  height: ${({ isLarge, tickHeight }) => (isLarge ? tickHeight.large : tickHeight.small)}px;
  width: .0625rem;
  background-color: black;
  margin-top: .3125rem;
`;

const TickNumber = styled.span`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-0.25rem);
  bottom: -1.25rem;
  font-size: .75rem;
`;

const SliderBaseLine = styled.div`
  position: absolute;
  background-color: grey;
  height: .25rem;
  top: 50%;
  width: calc(100% + .625rem);
  left: -0.3125rem;
  transform: translateY(-50%);
`;

const SliderSelectedRange = styled.div`
  position: absolute;
  background-color: blue;
  height: .25rem;
  top: 50%;
  left: 0%;
  right: ${({ selectedValue, max }) => `${100 - (selectedValue / max) * 100}%`};
  transform: translateY(-50%);
`;

const SliderHandle = styled.div`
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  background-color: cyan;
  cursor: pointer;
  border-radius: 50%;
  top: 50%;
  left: ${({ selectedValue, max }) => `${(selectedValue / max) * 100}%`};
  transform: translate(-50%, -50%);
`;
const SinglePointSliderTrack = ({ min = 0, max = 500, step = 100, tickHeight = { small: 10, large: 20 }, numberMargin = 100 }) => {
  const [selectedValue, setSelectedValue] = useState(min);

  const ticks = [];
  for (let i = min; i <= max; i += step) {
    ticks.push(
     
      <Tick key={i} isLarge={i % numberMargin === 0} tickHeight={tickHeight} title={`${i}`} className="tick">
        {i % numberMargin === 0 && <TickNumber>{i}</TickNumber>}
      </Tick>
    );
  }
  const handleMouseDown = (event) => {
    const startX = event.clientX;
    const trackWidth = event.target.parentElement.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const moveX = moveEvent.clientX - startX;
      const movePercent = (moveX / trackWidth) * 100;
      const moveValue = (movePercent / 100) * (max - min);
      let nearestTickValue = Math.round((min + moveValue) / step) * step;
      nearestTickValue = Math.max(min, Math.min(nearestTickValue, max));

      setSelectedValue(nearestTickValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <SliderTrackContainer data-testid="slider">
    <SliderTicks>{ticks}</SliderTicks>
    <SliderBaseLine />
    <SliderSelectedRange selectedValue={selectedValue} max={max} />
  
    <SliderHandle selectedValue={selectedValue} max={max} onMouseDown={handleMouseDown} data-testid="slider-handle" />
  </SliderTrackContainer>
  );
};

export default SinglePointSliderTrack;
