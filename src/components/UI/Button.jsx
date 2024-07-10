import React from "react";

import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.625rem 1.25rem;
  text-align: center;
  margin-top: 1.25rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 80%;
  max-width: 18.75rem;
  display: block;
  margin: auto;
  font-size: 1.25rem;

  @media (max-width: 48rem) {
    padding-left: 43%;
    padding-right: 57%;
    background-color: #d3d3d3;
    color: darkgrey;
    width: 100%;
  }
`;

const Button = ({ onClick, text }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default Button;
