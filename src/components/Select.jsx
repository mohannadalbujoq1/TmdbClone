import React, { useState } from "react";

import styled, { css } from "styled-components";
import { MdArrowDropDown } from "react-icons/md";

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;
const StyledSelect = styled.div`
  /* Existing styles */
  cursor: pointer;
  border-radius: 0.3125rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85em;
  &:hover {
    background-color: #c2c6ca;
  }
  &:focus {
    outline: none;
    border: 0.0625rem solid transparent;
    box-shadow: none;
  }
  /* Add ARIA attributes */
  role: "button"; /* This is not valid CSS/Styled-components syntax for adding ARIA roles. */
  tabIndex: "0"; /* Same issue as above. */
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 0.0625rem solid #e4e7eb;
  border-radius: 0.3125rem;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1000;
  max-height: 12.5rem;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 0.625rem;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background-color: yellow;
    `}
  &:hover {
    background-color: #c2c6ca;
  }
`;

const IconWrapper = styled.div`
  color: black;
  font-size: 1.35em;
  font-family: "Source Sans Pro", Arial, sans-serif;
`;

const CustomSelect = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <SelectWrapper>
      <StyledSelect selected={selectedOption} onClick={toggleDropdown} aria-haspopup="listbox" aria-expanded={isOpen}  role="button" tabIndex={0} >
        <span>
          {selectedOption ? selectedOption.label : "Select an option"}
        </span>
        <IconWrapper>
          <MdArrowDropDown />
        </IconWrapper>
      </StyledSelect>
      {isOpen && (
        <OptionsList>
          {options.map((option, index) => (
            <OptionItem
              key={index}
              selected={selectedOption && selectedOption.value === option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
};

export default CustomSelect;
