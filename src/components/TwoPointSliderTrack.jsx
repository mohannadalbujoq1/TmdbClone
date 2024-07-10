import React, { useState } from "react";
import styled from "styled-components";

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
  height: ${({ isLarge, tickHeight }) =>
    isLarge ? tickHeight.large : tickHeight.small}px;
  width: 0.0625rem;
  background-color: black;
  margin-top: 0.3125rem;
`;

const TickNumber = styled.span`
  position: absolute;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  bottom: -1.25rem;
  font-size: 0.75rem;
`;

const SliderBaseLine = styled.div`
  position: absolute;
  background-color: grey;
  height: 0.25rem;
  top: 50%;
  width: calc(100% + 0.625rem);
  left: -0.3125rem;
  transform: translateY(-50%);
`;

const SliderSelectedRange = styled.div`
  position: absolute;
  background-color: blue;
  height: 0.25rem;
  top: 50%;
  left: ${({ start, max }) => `${(start / max) * 100}%`};
  right: ${({ end, max }) => `${100 - (end / max) * 100}%`};
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
  left: ${({ position, max }) => `${(position / max) * 100}%`};
  transform: translate(-50%, -50%);
`;

const TwoPointSliderTrack = ({
  min = 0,
  max = 500,
  step = 50,
  tickHeight = { small: 10, large: 20 },
  numberMargin = 100,
  ...rest
}) => {
  const [selectedRange, setSelectedRange] = useState({ start: min, end: min });

  const handleMouseDown = (e, bound) => {
    const startX = e.clientX;
    const trackWidth = e.target.parentElement.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const moveX = moveEvent.clientX - startX;
      const movePercent = (moveX / trackWidth) * 100;
      const moveValue = (movePercent / 100) * (max - min);
      let nearestTickValue = Math.round((min + moveValue) / step) * step;
      nearestTickValue = Math.max(min, Math.min(nearestTickValue, max));

      setSelectedRange((prevRange) => {
        let newStart = prevRange.start;
        let newEnd = prevRange.end;
        if (bound === "start") {
          newStart = Math.max(min, Math.min(nearestTickValue, prevRange.end));
        } else {
          newEnd = Math.max(prevRange.start, Math.min(nearestTickValue, max));
        }
        return { start: newStart, end: newEnd };
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const ticks = [];
  for (let i = min; i <= max; i += step) {
    ticks.push(
      <Tick
        key={i}
        isLarge={i % numberMargin === 0}
        tickHeight={tickHeight}
        title={i}
      >
        {i % numberMargin === 0 && <TickNumber>{i}</TickNumber>}
      </Tick>
    );
  }

  return (
    <SliderTrackContainer>
      <SliderTicks>{ticks}</SliderTicks>
      <SliderBaseLine />
      <SliderSelectedRange
        start={selectedRange.start}
        end={selectedRange.end}
        max={max}
      />
      <SliderHandle
  role="slider"
  aria-valuenow={selectedRange.start}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-label="Start Handle"
  position={selectedRange.start}
  max={max}
  onMouseDown={(e) => handleMouseDown(e, "start")}
/>

<SliderHandle
  role="slider"
  aria-valuenow={selectedRange.end}
  aria-valuemin={min}
  aria-valuemax={max}
  aria-label="End Handle"
  position={selectedRange.end}
  max={max}
  onMouseDown={(e) => handleMouseDown(e, "end")}
/>
    </SliderTrackContainer>
  );
};

export default TwoPointSliderTrack;
