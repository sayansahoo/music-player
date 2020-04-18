import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 0.5px solid #d3d3d3;
  z-index: 9;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  position: absolute;
`;

const StyledP = styled.p`
border-bottom: 0.1px solid #d3d3d3;
`;

const Menu = () => {
  return (
    <StyledContainer>
      <StyledP>Share</StyledP>
      <StyledP>Like</StyledP>
      <StyledP>Details</StyledP>
    </StyledContainer>
  );
};

export default Menu;
