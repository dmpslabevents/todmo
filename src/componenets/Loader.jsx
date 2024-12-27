import React from 'react';
import styled from 'styled-components';

const Loader = ({ ...props }) => {
  return <StyledLoader {...props} />
};

const StyledLoader = styled.div`
  border: 5px solid transparent;
  border-top: 5px solid yellow;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: loader 1s linear infinite;

  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
