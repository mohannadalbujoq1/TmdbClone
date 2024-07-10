import React from "react";

import styled from "styled-components";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const DropdownContainer = styled.div`
  margin-bottom: 1.25rem;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  color: black;
  border: 0.0313rem solid #e3e3e3;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
  border-bottom-left-radius: ${(props) => (props.isOpen ? "0" : ".625rem")};
  border-bottom-right-radius: ${(props) => (props.isOpen ? "0" : ".625rem")};
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const Chevron = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem;
  border: 0.0313rem solid #ddd;
  background-color: #ffffff;
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  border-top: none;
`;

const Dropdown = ({ title, isOpen, toggleDropdown, children }) => {
  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <Title>{title}</Title>
        <Chevron>{isOpen ? <FaChevronDown /> : <FaChevronRight />}</Chevron>
      </DropdownButton>
      {isOpen && <DropdownContent>{children}</DropdownContent>}
    </DropdownContainer>
  );
};

export default Dropdown;
