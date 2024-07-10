import React from "react";

import styled from "styled-components";

const StyledSubHeader = styled.h3`
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-size: 0.978rem;
  font-weight: 100;
  color: #000000be;
  font-family: "Source Sans Pro", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  height: 0.0625rem;
  margin-bottom: 1.25rem;
  margin-left: 0.125rem;
`;

const IconSpan = styled.span`
  margin-left: 0.375rem;
  background-image: ${({ iconUrl }) => `url(${iconUrl})`};
  opacity: 0.4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1em;
  width: 1em;
  min-height: 1em;
  height: 1em;
  background-position: center center;
  background-repeat: no-repeat;
`;

const SubHeader = ({ title, iconUrl }) => {
  return (
    <StyledSubHeader>
      {title}
      {iconUrl && <IconSpan iconUrl={iconUrl} />}
    </StyledSubHeader>
  );
};

export default SubHeader;
