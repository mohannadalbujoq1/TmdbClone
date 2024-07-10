import React from "react";

import styled from "styled-components";

const LoadingBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 0.25rem;
  background-color: #0680a8;
  z-index: 9999;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
  transition: opacity ${({ isLoaded }) => (isLoaded ? "0.5s ease-out" : "0s")};
  width: ${({ loadingProgress }) => loadingProgress}%;
  box-shadow: 0 0.125rem 0.25rem rgba(6, 128, 168, 0.6);
`;

const LoadingBar = ({
  isLoading,
  isLoaded,
  initialLoadComplete,
  loadingProgress,
}) => (
  <LoadingBarContainer
    isLoading={isLoading}
    isLoaded={isLoaded}
    initialLoadComplete={initialLoadComplete}
    loadingProgress={loadingProgress}
  />
);

export default LoadingBar;
