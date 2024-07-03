import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  margin-bottom: .625rem;
  display: block;
`;

const StyledInput = styled.input`
  margin-right: .3125rem; /* Adjust spacing between radio button and label */
`;

const StyledSpan = styled.span`
  font-weight: normal;
  margin-left: .3125rem;
`;

const RadioButton = ({ id, name, value, checked, onChange, label }) => {
  return (
    <StyledLabel>
      <StyledInput
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <StyledSpan>{label}</StyledSpan>
    </StyledLabel>
  );
};

export default RadioButton;