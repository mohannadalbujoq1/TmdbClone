import React from "react";

import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 0.625rem;
`;

const CheckboxInput = styled.input`
  margin-right: 0.625rem;
`;

const CheckboxGroup = ({ options }) => {
  return (
    <>
      {options.map((option, index) => (
        <Label key={index}>
          <CheckboxInput type="checkbox" />
          {option}
        </Label>
      ))}
    </>
  );
};

export default CheckboxGroup;
