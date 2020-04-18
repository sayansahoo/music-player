import React from "react";
import Music from "./components/index";
import "antd/dist/antd.css";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <StyledContainer>
      <Music />
    </StyledContainer>
  );
}

export default App;
