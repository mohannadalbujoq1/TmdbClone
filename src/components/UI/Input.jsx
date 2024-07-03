import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  margin-bottom: .625rem;
  padding: .375rem .75rem;
  border-radius: .3125rem;
  border: ${props => props.type === 'date' && props.isFocused ? '.0625rem solid' : '.0625rem solid #ccc'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #fff;
  color: #495057;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  width: ${props => props.type === 'text' ? '100%' : '67%'};
`;

const Input = ({ type, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const effectivePlaceholder = type === 'date' ? '' : placeholder;

  return (
    <StyledInput
      type={type}
      placeholder={effectivePlaceholder}
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-testid="custom-input" // Added data-testid attribute
    />
  );
};

export default Input;